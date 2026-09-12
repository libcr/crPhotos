const messages = {
  "en": [
    "Compressing",
    "Archive saved",
    "Could not create the archive"
  ],
  "zh-CN": [
    "正在压缩",
    "压缩包已保存",
    "无法创建压缩包"
  ],
  "zh-HK": [
    "正在壓縮",
    "壓縮檔已儲存",
    "無法建立壓縮檔"
  ],
  "zh-TW": [
    "正在壓縮",
    "壓縮檔已儲存",
    "無法建立壓縮檔"
  ],
  "ar": [
    "جارٍ الضغط",
    "تم حفظ الأرشيف",
    "تعذر إنشاء الأرشيف"
  ],
  "fr": [
    "Compression en cours",
    "Archive enregistrée",
    "Impossible de créer l’archive"
  ],
  "fr-CA": [
    "Compression en cours",
    "Archive enregistrée",
    "Impossible de créer l’archive"
  ],
  "ru": [
    "Сжатие",
    "Архив сохранён",
    "Не удалось создать архив"
  ],
  "es": [
    "Comprimiendo",
    "Archivo guardado",
    "No se pudo crear el archivo"
  ],
  "es-419": [
    "Comprimiendo",
    "Archivo guardado",
    "No se pudo crear el archivo"
  ],
  "pt-BR": [
    "Compactando",
    "Arquivo salvo",
    "Não foi possível criar o arquivo"
  ],
  "pt-PT": [
    "A comprimir",
    "Ficheiro guardado",
    "Não foi possível criar o ficheiro"
  ]
};

async function run(context, api) {
  const [compressing, saved, failed] =
      messages[context.locale] || messages.en;
  api.ui.setOutput(compressing);
  let lastPercent = -1;
  try {
    const result = await api.archive.saveZip({
      itemIds: context.items.map(item => item.id),
      destination: context.inputs.destination,
      onProgress({loaded, total}) {
        const percent = total ? Math.min(100, Math.floor(loaded * 100 / total)) : 0;
        if (percent === lastPercent) return;
        lastPercent = percent;
        api.ui.setOutput(`${compressing}: ${percent}%`);
      }
    });
    api.ui.setOutput(`${saved} (${result.files}): ${result.path}`);
    for (const item of context.items) {
      api.ui.appendLine({text: item.name, itemId: item.id});
    }
  } catch (error) {
    throw new Error(`${failed}: ${error.message}`);
  }
}
