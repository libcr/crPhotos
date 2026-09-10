// Each click receives a fresh context and opens the host's processing dialog.
function run(context, api) {
  const labels = {
    "en-US": ["Items", "Total size", "Photos", "Videos"],
    "zh-CN": ["项目", "总大小", "照片", "视频"],
    "zh-HK": ["項目", "總大小", "相片", "影片"],
    "zh-TW": ["項目", "總大小", "相片", "影片"],
    "ar": ["العناصر", "الحجم الإجمالي", "الصور", "الفيديوهات"],
    "fr": ["Éléments", "Taille totale", "Photos", "Vidéos"],
    "fr-CA": ["Éléments", "Taille totale", "Photos", "Vidéos"],
    "ru": ["Объекты", "Общий размер", "Фото", "Видео"],
    "es": ["Elementos", "Tamaño total", "Fotos", "Vídeos"],
    "es-419": ["Elementos", "Tamaño total", "Fotos", "Videos"],
    "pt-BR": ["Itens", "Tamanho total", "Fotos", "Vídeos"],
    "pt-PT": ["Itens", "Tamanho total", "Fotografias", "Vídeos"]
  };
  const [items, size, photos, videos] = labels[context.locale] || labels["en-US"];
  const total = context.items.reduce((sum, item) => sum + item.size, 0);
  const photoCount = context.items.filter(item => item.type === "photo").length;
  api.ui.output(`${items}: ${context.items.length}`);
  api.ui.output(`${photos}: ${photoCount} · ${videos}: ${context.items.length - photoCount}`);
  api.ui.output(`${size}: ${(total / 1024 / 1024).toFixed(2)} MiB`);
  api.ui.output("");
  // Bounded output: keep the dialog responsive even for a large selection.
  for (const item of context.items.slice(0, 100)) {
    api.ui.output(`${item.name} — ${item.width} × ${item.height}`);
  }
}
