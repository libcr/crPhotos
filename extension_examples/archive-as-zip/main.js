const messages = {
  "en": [
    "Choose where to save the ZIP archive.",
    "Compressing",
    "Archive saved",
    "Cancelled",
    "Could not create the archive"
  ],
  "zh-CN": [
    "请选择 ZIP 压缩包的保存位置。",
    "正在压缩",
    "压缩包已保存",
    "已取消",
    "无法创建压缩包"
  ],
  "zh-HK": [
    "請選擇 ZIP 壓縮檔的儲存位置。",
    "正在壓縮",
    "壓縮檔已儲存",
    "已取消",
    "無法建立壓縮檔"
  ],
  "zh-TW": [
    "請選擇 ZIP 壓縮檔的儲存位置。",
    "正在壓縮",
    "壓縮檔已儲存",
    "已取消",
    "無法建立壓縮檔"
  ],
  "ar": [
    "اختر مكان حفظ أرشيف ZIP.",
    "جارٍ الضغط",
    "تم حفظ الأرشيف",
    "تم الإلغاء",
    "تعذر إنشاء الأرشيف"
  ],
  "fr": [
    "Choisissez où enregistrer l’archive ZIP.",
    "Compression en cours",
    "Archive enregistrée",
    "Annulé",
    "Impossible de créer l’archive"
  ],
  "fr-CA": [
    "Choisissez où enregistrer l’archive ZIP.",
    "Compression en cours",
    "Archive enregistrée",
    "Annulé",
    "Impossible de créer l’archive"
  ],
  "ru": [
    "Выберите место сохранения ZIP-архива.",
    "Сжатие",
    "Архив сохранён",
    "Отменено",
    "Не удалось создать архив"
  ],
  "es": [
    "Elige dónde guardar el archivo ZIP.",
    "Comprimiendo",
    "Archivo guardado",
    "Cancelado",
    "No se pudo crear el archivo"
  ],
  "es-419": [
    "Elige dónde guardar el archivo ZIP.",
    "Comprimiendo",
    "Archivo guardado",
    "Cancelado",
    "No se pudo crear el archivo"
  ],
  "pt-BR": [
    "Escolha onde salvar o arquivo ZIP.",
    "Compactando",
    "Arquivo salvo",
    "Cancelado",
    "Não foi possível criar o arquivo"
  ],
  "pt-PT": [
    "Escolha onde guardar o ficheiro ZIP.",
    "A comprimir",
    "Ficheiro guardado",
    "Cancelado",
    "Não foi possível criar o ficheiro"
  ]
};

async function run(context, api) {
  const [choose, compressing, saved, cancelled, failed] =
      messages[context.locale] || messages.en;
  api.ui.setOutput(choose);
  let lastPercent = -1;
  try {
    const result = await api.archive.saveZip({
      itemIds: context.items.map(item => item.id),
      suggestedName: "Photos.zip",
      onProgress({loaded, total}) {
        const percent = total ? Math.min(100, Math.floor(loaded * 100 / total)) : 0;
        if (percent === lastPercent) return;
        lastPercent = percent;
        api.ui.setOutput(`${compressing}: ${percent}%`);
      }
    });
    if (result.cancelled) {
      api.ui.setOutput(cancelled);
      return;
    }
    api.ui.setOutput(`${saved} (${result.files}): ${result.path}`);
    for (const item of context.items) {
      api.ui.appendLine({text: item.name, itemId: item.id});
    }
  } catch (error) {
    throw new Error(`${failed}: ${error.message}`);
  }
}
