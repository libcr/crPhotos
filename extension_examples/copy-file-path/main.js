// Clipboard and completion feedback are committed by the host after success.
function run(context, api) {
  const ids = context.items.map(item => item.id);
  api.clipboard.copyFilePaths(ids);
  const count = ids.length;
  const messages = {
    "en-US": n => `${n} ${n === 1 ? "file" : "files"} copied`,
    "zh-CN": n => `已复制 ${n} 个文件路径`,
    "zh-HK": n => `已複製 ${n} 個檔案路徑`,
    "zh-TW": n => `已複製 ${n} 個檔案路徑`,
    "ar": n => n === 1 ? "تم نسخ مسار ملف واحد" : n === 2 ? "تم نسخ مساري ملفين"
        : `تم نسخ مسارات ${n} من الملفات`,
    "fr": n => `${n} ${n === 1 ? "fichier copié" : "fichiers copiés"}`,
    "fr-CA": n => `${n} ${n === 1 ? "fichier copié" : "fichiers copiés"}`,
    "ru": n => {
      const one = n % 10 === 1 && n % 100 !== 11;
      const few = n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14);
      return `${one ? "Скопирован" : "Скопировано"} ${n} ${one ? "путь к файлу" : few ? "пути к файлам" : "путей к файлам"}`;
    },
    "es": n => `${n} ${n === 1 ? "archivo copiado" : "archivos copiados"}`,
    "es-419": n => `${n} ${n === 1 ? "archivo copiado" : "archivos copiados"}`,
    "pt-BR": n => `${n} ${n === 1 ? "arquivo copiado" : "arquivos copiados"}`,
    "pt-PT": n => `${n} ${n === 1 ? "ficheiro copiado" : "ficheiros copiados"}`
  };
  api.ui.toast({message: (messages[context.locale] || messages["en-US"])(count)});
}
