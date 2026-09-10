// Requires your own Imgur application Client ID or an existing OAuth access token.
async function run(context, api) {
  const messages = {
    "en-US": ["Set clientId or accessToken in this extension's config.json, then restart crPhotos.", "Uploading", "Uploaded", "Skipped unsupported format", "Upload failed", "Finished", "No supported files to upload.", "Upload limit: 128 files per run.", "Deletion link", "Waiting for server response", "Invalid API response"],
    "zh-CN": ["请在本扩展的 config.json 中设置 clientId 或 accessToken，然后重启 crPhotos。", "正在上传", "上传成功", "已跳过不支持的格式", "上传失败", "已完成", "没有支持上传的文件。", "每次最多上传 128 个文件。", "删除链接", "正在等待服务器响应", "API 响应无效"],
    "zh-HK": ["請在此擴充功能的 config.json 中設定 clientId 或 accessToken，然後重新啟動 crPhotos。", "正在上傳", "上傳成功", "已略過不支援的格式", "上傳失敗", "已完成", "沒有支援上傳的檔案。", "每次最多上傳 128 個檔案。", "刪除連結", "正在等候伺服器回應", "API 回應無效"],
    "zh-TW": ["請在此擴充功能的 config.json 中設定 clientId 或 accessToken，然後重新啟動 crPhotos。", "正在上傳", "上傳成功", "已略過不支援的格式", "上傳失敗", "已完成", "沒有支援上傳的檔案。", "每次最多上傳 128 個檔案。", "刪除連結", "正在等待伺服器回應", "API 回應無效"],
    "ar": ["اضبط clientId أو accessToken في ملف config.json الخاص بالإضافة، ثم أعد تشغيل crPhotos.", "جارٍ الرفع", "تم الرفع", "تم تخطي التنسيق غير المدعوم", "فشل الرفع", "اكتمل", "لا توجد ملفات مدعومة للرفع.", "الحد الأقصى هو 128 ملفًا في كل تشغيل.", "رابط الحذف", "في انتظار استجابة الخادم", "استجابة API غير صالحة"],
    "fr": ["Définissez clientId ou accessToken dans le fichier config.json de cette extension, puis redémarrez crPhotos.", "Envoi en cours", "Envoi réussi", "Format non pris en charge ignoré", "Échec de l’envoi", "Terminé", "Aucun fichier compatible à envoyer.", "Limite : 128 fichiers par exécution.", "Lien de suppression", "En attente de la réponse du serveur", "Réponse API non valide"],
    "fr-CA": ["Définissez clientId ou accessToken dans le fichier config.json de cette extension, puis redémarrez crPhotos.", "Téléversement en cours", "Téléversement réussi", "Format non pris en charge ignoré", "Échec du téléversement", "Terminé", "Aucun fichier compatible à téléverser.", "Limite : 128 fichiers par exécution.", "Lien de suppression", "En attente de la réponse du serveur", "Réponse API non valide"],
    "ru": ["Укажите clientId или accessToken в файле config.json расширения и перезапустите crPhotos.", "Загрузка", "Загружено", "Неподдерживаемый формат пропущен", "Ошибка загрузки", "Завершено", "Нет поддерживаемых файлов для загрузки.", "Не более 128 файлов за один запуск.", "Ссылка для удаления", "Ожидание ответа сервера", "Некорректный ответ API"],
    "es": ["Configura clientId o accessToken en el archivo config.json de esta extensión y reinicia crPhotos.", "Subiendo", "Subido", "Formato no compatible omitido", "Error al subir", "Finalizado", "No hay archivos compatibles para subir.", "Límite: 128 archivos por ejecución.", "Enlace de eliminación", "Esperando la respuesta del servidor", "Respuesta de API no válida"],
    "es-419": ["Configura clientId o accessToken en el archivo config.json de esta extensión y reinicia crPhotos.", "Subiendo", "Subido", "Formato no compatible omitido", "Error al subir", "Finalizado", "No hay archivos compatibles para subir.", "Límite: 128 archivos por ejecución.", "Enlace de eliminación", "Esperando la respuesta del servidor", "Respuesta de API no válida"],
    "pt-BR": ["Defina clientId ou accessToken no arquivo config.json desta extensão e reinicie o crPhotos.", "Enviando", "Enviado", "Formato não compatível ignorado", "Falha no envio", "Concluído", "Nenhum arquivo compatível para enviar.", "Limite: 128 arquivos por execução.", "Link de exclusão", "Aguardando a resposta do servidor", "Resposta inválida da API"],
    "pt-PT": ["Defina clientId ou accessToken no ficheiro config.json desta extensão e reinicie o crPhotos.", "A enviar", "Enviado", "Formato não suportado ignorado", "Falha no envio", "Concluído", "Não existem ficheiros suportados para enviar.", "Limite: 128 ficheiros por execução.", "Ligação de eliminação", "A aguardar a resposta do servidor", "Resposta inválida da API"]
  };
  const [configure, uploading, uploaded, skipped, failed, finished, empty, limit, deletion, waiting, invalidResponse] =
      messages[context.locale] || messages["en-US"];
  const config = context.config || {};
  const clientId = typeof config.clientId === "string" ? config.clientId.trim() : "";
  const token = typeof config.accessToken === "string" ? config.accessToken.trim() : "";
  if (!clientId && !token) throw new Error(configure);
  const authorization = token ? `Bearer ${token}` : `Client-ID ${clientId}`;
  // Formats listed by the official Imgur Image Upload endpoint. No conversion.
  const types = {
    jpg: "image/jpeg", jpeg: "image/jpeg", gif: "image/gif", png: "image/png",
    apng: "image/apng", tif: "image/tiff", tiff: "image/tiff", mp4: "video/mp4",
    webm: "video/webm", mkv: "video/x-matroska", mov: "video/quicktime",
    flv: "video/x-flv", avi: "video/x-msvideo", wmv: "video/x-ms-wmv", mpeg: "video/mpeg", mpg: "video/mpeg"
  };
  const lines = [];
  function display(text = "", itemId) {
    const output = text ? [...lines, {text, itemId}] : [...lines];
    // Three bytes per UTF-16 unit is a safe UTF-8 upper bound. Keep whole
    // entries and their associations without requiring browser TextEncoder.
    let bytes = output.reduce((total, line) => total + line.text.length * 3 + 1, 0);
    while (bytes > 60000 && output.length) {
      bytes -= output.shift().text.length * 3 + 1;
    }
    api.dialog.setOutputLines(output);
  }
  if (context.items.length > 128) throw new Error(limit);
  const items = context.items.filter(item => {
    const extension = item.name.split(".").pop().toLowerCase();
    if (Object.hasOwn(types, extension)) return true;
    lines.push({text: `${skipped}: ${item.name}`, itemId: item.id});
    return false;
  });
  if (!items.length) { lines.push({text: empty}); display(); return; }
  let succeeded = 0;
  for (let index = 0; index < items.length; index++) {
    const item = items[index];
    const prefix = `${index + 1}/${items.length} · ${item.name}`;
    display(`${uploading}: ${prefix}`, item.id);
    try {
      const response = await api.network.upload({
        url: "https://api.imgur.com/3/image",
        method: "POST",
        bodyType: "multipart",
        mediaId: item.id,
        fieldName: "image",
        contentType: types[item.name.split(".").pop().toLowerCase()],
        fields: {type: "file"},
        headers: {Authorization: authorization},
        timeoutMs: 300000,
        onProgress({loaded, total}) {
          const percent = total ? Math.min(100, Math.floor(loaded / total * 100)) : null;
          display(`${percent === 100 ? waiting : uploading}: ${prefix}` +
              (percent === null ? "" : ` — ${percent}%`), item.id);
        }
      });
      let payload;
      try { payload = await response.json(); }
      catch {
        lines.push({text: `${failed}: ${item.name} — HTTP ${response.status}: ${response.statusText}`, itemId: item.id});
        display();
        if ([401, 403, 429].includes(response.status)) return;
        continue;
      }
      if (!response.ok || payload.success !== true || typeof payload.data?.link !== "string") {
        const detail = typeof payload.data?.error === "string" ? payload.data.error
            : (payload.data?.error?.message || response.statusText || invalidResponse);
        lines.push({text: `${failed}: ${item.name} — HTTP ${response.status}: ${String(detail).slice(0, 400)}`, itemId: item.id});
        display();
        // Authentication and rate-limit failures will also affect later files.
        if ([401, 403, 429].includes(response.status)) return;
        continue;
      }
      succeeded++;
      lines.push({text: `${uploaded}: ${item.name}\n${payload.data.link}`, itemId: item.id});
      if (typeof payload.data.deletehash === "string" && /^[A-Za-z0-9]+$/.test(payload.data.deletehash))
        lines.push({text: `${deletion}: https://imgur.com/delete/${payload.data.deletehash}`, itemId: item.id});
      display();
    } catch (error) {
      if (error.name === "AbortError") throw error;
      lines.push({text: `${failed}: ${item.name} — ${String(error.message).slice(0, 400)}`, itemId: item.id});
      display();
    }
  }
  lines.push({text: `${finished}: ${succeeded}/${items.length}`});
  display();
}
