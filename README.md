# crPhotos

A desktop photo and video browser for your local folders, built on Chromium 150. Explore your collection in a masonry timeline, view photos and videos in one application, organize media with favorites, color tags and local face grouping, and select text directly in photos.

## Your collection, at a glance

Browse portrait photos, landscape shots, screenshots, and videos together in an aspect-ratio-aware grid. Adjust **Grid Size** from two to six columns to choose between larger previews and a denser overview.

Photo thumbnails show file size in the upper-right corner. Video thumbnails show duration and a play symbol in the same position. File-size units advance at multiples of 1024; unavailable video durations appear as `--:--`. MP4/MOV duration is read during scanning, so an existing library may need a rescan to populate it.

![Hangzhou photos and videos in the crPhotos five-column Timeline, with file sizes and video duration](Screenshot%20From%202026-09-09%2000-40-32.png)

The date beside **Timeline** follows the visible collection. When visible media have GPS coordinates that resolve to a city, the heading shows the date and city of the first matching item in visual order. If the first visible item has no location, later visible items are checked. If none matches, only the first visible item's date is shown.

The timeline uses available capture dates, with MP4/MOV container creation time as a video fallback, then file creation time when no embedded date is available. Container dates can reflect an export rather than the original recording.

## Build a library from your folders

Open **Settings → Library** to add folders. Each folder appears immediately, with photo and video counts updated during scanning. Choose whether to include photos, videos, or both, and right-click a folder to remove it from the library configuration.

Folder choices persist between sessions. Folder monitoring picks up newly added media, and a scan-completion toast reports progress. On first use, the setup page offers default media folders; review the list and choose **Done** to start browsing.

Use the top search field and **Filter media** to narrow the view by media type, library folder, **Starred**, or **Tagged**, or open **Trash**. Media-type, folder and Starred choices keep the filter menu open.

## Search by metadata and location

Search file names and readable embedded metadata, including camera or phone model, lens, capture date, ISO, exposure, aperture, and focal length. Known dimensions, GPS coordinates, and approximate city, province/state, and country names are searchable too. This searches metadata, not text inside screenshots or photos.

| Input | Matches |
| --- | --- |
| `han` | Word prefixes such as Hangzhou, rather than the middle of Shanghai or Shang |
| `hangzhou` or `杭州` | Media whose GPS resolves to Hangzhou, or whose other searchable fields match |
| `Pixel8` | Device names such as Google Pixel 8, including Pixel 8 Pro |
| `Pixel` | Pixel models across generations |
| `Pixel8 hangzhou` | Items matching both the device and location terms |
| `2026-09-10` | Matching capture or catalog dates |

Matching ignores case. English terms match word prefixes, while Chinese and numeric terms use substring matching. Spaces within a field can be skipped, so `Pixel8` matches `Pixel 8`. Separate query terms must all match, but can match different fields. A catalog date may come from a file timestamp when an embedded capture date is unavailable.

Place search includes English and all bundled translations, independently of the interface language. City matching requires embedded GPS and uses the approximate offline lookup described below; missing GPS does not prevent searches by other metadata.

The local search index is built in background batches. On first use, results fill in as indexing completes; subsequent sessions reuse the saved index. File size or modification-time changes and index-format upgrades trigger reindexing. Typing does not read original media files or send online requests. Trash metadata is read during its background load.

## Enjoy photos and videos in one viewer

Open an item without leaving the application. Zoom and pan through photos, or play videos with seeking, volume adjustment, one-click mute, and fullscreen controls. The volume slider position and the volume used before muting are saved between sessions.

For videos, use the **mouse wheel** over the picture to zoom around the pointer, from the fit-to-window size up to **4×**. Drag with the left mouse button to pan when enlarged; double-click to return to fit-to-window. Panning is constrained to the picture edges, and switching videos resets zoom. Playback controls keep their normal size.

While playing, the bottom controls begin fading out after approximately 2.5 seconds without interaction outside the controls area. They remain visible while paused or while the pointer is in the bottom controls area. Moving into that area reveals them again.

| Shortcut | Action |
| --- | --- |
| Left / Up in the viewer | Previous item |
| Right / Down in the viewer | Next item |
| F in the viewer | Toggle fullscreen |
| Esc / Q in fullscreen | Return to window mode |
| Space in the video player | Play or pause |
| Space / Shift + Space in the grid | Scroll forward / backward by a page |
| Ctrl + L | Focus the search field |
| Ctrl + A in selection mode | Select all displayed items |
| Alt + 1–9 in the viewer or selection mode | Assign or toggle a color tag |
| Alt + 0 in the viewer or selection mode | Clear tags |
| Ctrl + A with image text focused in Text Selection Mode | Select all recognized text in the current photo |
| Ctrl + C with image text selected | Copy selected text |
| Delete in the viewer | Delete the current item without confirmation, then show the next item |
| Ctrl + Q in the main window | Quit |

Viewer deletion moves ordinary library files to crPhotos-managed Trash. **Viewing an item in Trash and pressing Delete permanently deletes it without confirmation.** If the deleted item was last, the viewer opens the previous item; if none remain, it returns to the grid. A failed deletion does not advance the viewer, and holding Delete does not repeatedly delete items.

A directional bounce indicates the beginning or end of the collection. Switching items preserves fullscreen, returning to the grid keeps browsing context, and videos return to the beginning when playback finishes.

![Spring flowers in the crPhotos five-column Timeline, with the date and Taizhou city heading](Screenshot%20From%202026-09-09%2000-41-04.png)

## Select, organize, and inspect

Click the selection circle on a thumbnail to enter selection mode. Select individual items or hold the left mouse button and drag across thumbnails. The heading shows the selected count and combined file size, while a floating toolbar provides batch actions.

Mark favorites with **Starred**, copy selected files to the clipboard, or review thumbnail previews before moving a selection to Trash. The **Trash** grid offers **Restore** and **Delete permanently** with confirmation. This batch flow is separate from the viewer's immediate Delete shortcut. Expired trash entries are cleaned up after a 30-day retention period while crPhotos is running. This is application-managed storage, not the Windows Recycle Bin.

Open **Details** to inspect dimensions, file size, path, and available camera or video information. Supported embedded metadata includes capture time, camera/phone model, lens model, ISO, exposure time, aperture, and focal length. Android/Pixel manufacturer and model tags are supported in MP4 metadata. Missing capture fields are hidden. A copy button copies the displayed metadata and confirms with **Copied**.

When identified people are available, media details shows their avatars in the upper-right area. Click an avatar to filter the library to that person’s photos and videos.

### Offline GPS and city names

Details can show WGS84 latitude/longitude and the approximate city, province/state, and country. Supported sources include EXIF GPS, supported HEIC Exif metadata, and QuickTime ISO 6709 decimal-coordinate tags in MP4/MOV files.

City lookup uses bundled **GeoNames** data and requires no online geocoding or runtime database download. It selects the nearest retained city point within 100 km; this is an approximation, not an administrative-boundary or landmark lookup. Coordinates remain available even when no city matches.

Place names follow the interface language where translations are available, with fallback names otherwise. The GeoNames data is embedded in the application resource pack. Data attribution: [GeoNames](https://www.geonames.org/), licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

## Color tags

Use **Alt+1–9** while viewing a photo/video or selecting multiple items in the grid:

| Shortcut | Color |
| --- | --- |
| Alt + 1 | Grey |
| Alt + 2 | Blue |
| Alt + 3 | Red |
| Alt + 4 | Yellow |
| Alt + 5 | Green |
| Alt + 6 | Pink |
| Alt + 7 | Purple |
| Alt + 8 | Cyan |
| Alt + 9 | Orange |

Each media item has one color tag. Press its current color shortcut to remove the tag, or another color to replace it. For a selection, the shortcut removes that color only when every selected item already has it; otherwise it assigns the color to all selected items. **Alt+0** clears the current item’s tag or all selected items’ tags. If none has a tag, it makes no change and shows no confirmation.

Changes are saved locally without modifying original files. Batch changes are saved together in one database transaction. A top-center confirmation disappears after two seconds: green for adding/replacing tags and orange for removing/clearing them. In add/remove messages, the color name appears in a matching rounded color badge with contrasting text. Trash items cannot be tagged.

**Filter media → Tagged**, below **Starred**, lists only colors with at least one tagged item. Each submenu entry shows a numbered color ring, localized color name and library-wide count. Tag filters combine with search, media type, folder, Starred and person filters. Click the same color again to clear its filter or choose another color to switch.

The filtered grid heading displays the numbered color ring, color name and a Back button. Back clears only the tag filter; opening media and returning keeps the filter. Removing the last library item with the active color clears that filter automatically.

## Group photos and videos by person

Open **People** from the titlebar menu, after **Trusted devices**, and choose **Scan media**. Face grouping is opt-in and runs locally using **YuNet**, **EdgeFace S** and **ONNX Runtime**. Images are not uploaded for recognition.

The People dialog displays face groups in a grid. Click the name beneath an avatar to edit it; leaving the field saves the name. Drag one person onto another to merge them. Double-click an avatar or use **Review faces** to inspect its group. In that view, **Separate person** corrects a wrong assignment, and **Use this face** chooses and saves the group’s representative avatar.

Move **Grouping strictness** toward **Loose** to combine more similar faces or toward **Strict** to require closer matches. Changes apply automatically after a short delay. The 36–100 scale defaults to 36; it is a similarity threshold, not a confidence percentage. Review automatic results: different poses, lighting, small faces and occlusion can cause missed or incorrect matches.

Scanning shows progress and a periodically updated image preview. After the initial successful scan, new or modified media are scanned incrementally in the background by the same scanning service. **Clear people data** requires confirmation and removes the face index and names without deleting media; it pauses automatic scanning until another successful manual scan.

Videos use up to 30 sampled frames, with five sampling positions for short clips, distributed through the clip rather than only at its beginning. Brief appearances between samples may be missed. Photos and videos belonging to a person can be shown together, and saved names are searchable in the main search field.

When People data exists, an icon beside **Filter media** opens a popup of named people. Click an avatar to filter the grid. A **Clear person filter** overlay at the top of the preview area removes that filter.

Keep `people-runtime/` beside the executable. Releases containing it can run face grouping on the CPU without installing Python or CUDA. Packages without the runtime still support normal browsing. The release’s `people/README.md` provides technical setup and limitations.

## Select and copy text in photos

Enable **Text Selection** in the viewer’s right-click menu. A **Text Selection Mode** banner appears at the top center. Photo recognition starts in the background after a short navigation delay, using **PP-OCRv6 tiny** locally. Ordinary browsing does not run OCR.

Once recognition finishes, hovering recognized text shows an I-beam cursor. Drag to select characters or multiple lines; double-click to select a line. Press **Ctrl+C** or choose **Copy** from the right-click menu. With image text focused, **Ctrl+A** selects all recognized text in that photo. Copying confirms with **Copied**.

Selection follows photo zoom and pan. Hold **Alt** while dragging to pan from a text region. **Esc** clears text selection first. The mode remains enabled when switching photos or videos, but videos are not recognized. Uncheck the menu item or return to the grid to end the mode.

Recognition can miss or misread text, and character selection boundaries are approximate. OCR results are not added to metadata search. Extensions can request photo OCR and use the results for batch tagging; the Search Image Text example demonstrates this workflow. Keep `ocr-runtime/` together with `people-runtime/`, which supplies the shared ONNX Runtime even if you do not use People grouping. See `ocr/README.md` in the release for setup and limitations.

## Share with nearby devices

Configure nearby sharing in Settings to discover devices on the local network or connect manually by address. Send selected files, review pairing and transfer approval prompts, choose a receive directory, and monitor or cancel transfers. Trusted devices can be remembered, with an optional setting to automatically accept their transfers.

The **Trusted devices** window lists remembered devices and transfer statistics. It is modal to the main window; close it to resume browsing. The red delete icon forgets a device's trusted status.

## Extend crPhotos

Local JavaScript extensions add actions to the selection toolbar after **Share** and to the photo/video right-click menu. Each extension can support selection mode, viewer mode, or both. Selection extensions are not shown in the Trash toolbar.

Open **Settings → Extensions** and click **+ Add Extension**, then choose an unpacked extension folder containing `manifest.json` and `main.js`. The application validates and copies the package into its local extension directory. Extensions are not installed automatically.

Each list item shows its icon, name, version, description, enable toggle, and configuration gear. Drag the left handle to reorder extensions; the saved order also applies to the selection toolbar, overflow menu, and viewer menu. Right-click an item and choose **Delete this extension** to remove the installed package and its configuration. The gear opens a JSON configuration editor; **Save** becomes available after an edit.

Extensions can use a native processing dialog with media previews, progress, and text output. An optional input form accepts text, JSON, or file/folder selections before Run; these values are supplied as `context.inputs`. Double-click an output line associated with a file to select that line and enlarge its preview. **Cancel** stops pending work; the button changes to **Done** when processing finishes. Extensions can also run without a dialog and show a short completion toast.

The source tree provides these example packages under `crPhotos/extensions/examples/`:

| Extension | Purpose |
| --- | --- |
| Copy File Path | Copies selected file paths without opening a dialog and shows a completion toast, such as “2 files copied”, for about three seconds |
| Archive as zip | Lets you choose a ZIP destination in the preset input form before Run, then compresses selected originals with progress and cancellation |
| Search Image Text | Reads JSON keyword-to-color rules, recognizes text in selected photos locally, and assigns the first matching color tag |
| Upload to Imgur | Uploads supported original files through HTTPS, with progress and returned links; requires your own API configuration |
| Media Summary | Demonstrates metadata processing and dialog output |

Archive as zip creates a new archive or replaces the chosen destination after successful compression; it does not append to an existing ZIP. Duplicate file names receive numeric suffixes. It needs no network access or account.

The Imgur example accepts a Client ID or an existing OAuth access token. It does not provide an OAuth login or token-refresh flow. Credentials are stored locally in plaintext `config.json`. Uploads include original embedded metadata; cancelling cannot remove uploads already accepted by the service.

For extension developers, the host uses V8 with a crPhotos-specific API. It supports declared permissions for selected-file access, photo OCR, color-tag changes, HTTPS requests, POST/PUT uploads with progress, clipboard file paths, and saving ZIP archives. This is not a Chrome extension or Node.js environment: HTML/DOM, arbitrary shell commands, and arbitrary filesystem writes are not exposed. SVG icons and localized names, descriptions, and output are supported. See `crPhotos/extensions/README.md` in the source tree for the API and package format.

Default installation directories are `~/.config/crPhotos/extensions/` on Linux and `%LOCALAPPDATA%\crPhotos\extensions\` on Windows. An alternative directory can be selected with `--extensions-dir=/absolute/path/to/extensions`.

### JavaScript extension API

This reference describes the current host API. Use a build containing these APIs; older release packages may not support them. The full package specification and limits are documented in `crPhotos/extensions/README.md` in the source tree.

Define an entry point in `main.js`:

```js
async function run(context, api) {
  api.ui.output(`Items: ${context.items.length}`);
}
```

The manifest declares `apiVersion: 1`, supported `modes` (`selection`, `viewer`), and `ui` (`dialog`, the default, or `none`). Scripts run in V8 on a worker. Await asynchronous host operations before returning.

| Context field | Meaning |
| --- | --- |
| `context.mode` | `selection` or `viewer` |
| `context.locale` | Current application UI locale |
| `context.config` | Local extension configuration object |
| `context.inputs` | Values collected by the preset input form |
| `context.items` | Invocation snapshot of the selected media, or one item in viewer mode |

Each item exposes `id`, `name`, `type` (`photo` or `video`), `size` (bytes), `width`, `height`, `duration` (seconds), `favorite`, and `tag` (English color name or `null`). Dimensions and duration may be zero when unknown. IDs are invocation-local strings: pass them back unchanged. Editing this snapshot does not change the library, and it does not refresh after a tag write.

| API | Permission / behavior |
| --- | --- |
| `api.ui.output(text)` / `setOutput(text)` | Append a line / replace dialog output |
| `api.ui.appendLine({text, itemId})` | Append a line associated with a media preview; `itemId` is optional |
| `api.ui.setOutputLines(lines)` | Replace output with an array of `{text, itemId?}` records |
| `api.ui.setProgress(completed, total)` | Set task progress; integer values, `total > 0`, `0 <= completed <= total` |
| `api.ui.toast({message})` | Queue a completion toast lasting about three seconds; the last message wins and is shown only on success |
| `api.media.readFile(itemId)` | `media.read`; synchronously returns original bytes as an `ArrayBuffer` |
| `api.inputs.readFile(handle)` | Reads a file explicitly chosen in a `file` input; no `media.read` permission needed |
| `await api.media.recognizeText(itemId)` | `media.ocr`; recognizes a photo and returns `{text, lines: [{text, confidence}], limited}` |
| `await api.media.setTag(itemIds, color)` | `media.tags.write`; assigns/replaces a tag, returns whether anything changed |
| `await api.media.clearTags(itemIds)` | `media.tags.write`; removes tags, returns whether anything changed |
| `await fetch(url, options)` / `api.network.fetch(url, options)` | Requires the destination in manifest `networkOrigins`; restricted HTTPS requests |
| `await api.network.upload(options)` | `media.upload` plus `networkOrigins`; streams an invocation file using POST or PUT |
| `api.clipboard.copyFilePaths(itemIds)` | `clipboard.write`; queues file paths for copying after successful completion |
| `await api.archive.saveZip(options)` | `archive.write`, dialog mode; saves invocation files to a chosen ZIP destination |

`api.dialog` is an alias for `api.ui`. File reads share limits of 32 MiB per call and 64 MiB per invocation. Media APIs accept invocation IDs, not arbitrary paths. There is no DOM, Node.js, shell access, or general filesystem write API.

### Runtime input form

Declare up to eight inputs in the manifest. Nonempty inputs require dialog mode. Supported types are `text`, `multiline`, `file`, `saveFile`, and `folder`. `required` defaults to `true`; `format: "json"` validates text syntax but still supplies a string for the extension to parse.

Example manifest for an OCR tagging extension:

```json
{
  "id": "search-image-text",
  "name": "Search Image Text",
  "version": "1.0.1",
  "apiVersion": 1,
  "modes": ["selection", "viewer"],
  "ui": "dialog",
  "permissions": ["media.ocr", "media.tags.write"],
  "inputs": [
    {
      "id": "rules",
      "type": "multiline",
      "label": "Text matching rules (JSON)",
      "labels": {"zh-CN": "文本匹配规则（JSON）"},
      "format": "json",
      "default": "{\n  \"invoice\": \"yellow\",\n  \"meeting\": \"blue\"\n}",
      "defaults": {
        "zh-CN": "{\n  \"发票\": \"yellow\",\n  \"会议\": \"blue\"\n}"
      }
    }
  ]
}
```

`label` and `default` are English fallbacks. `labels` and `defaults` select an exact UI locale when present. Localized defaults apply to `text`, `multiline`, and suggested `saveFile` names. The shipped Search Image Text example includes all supported translations; color values remain English API identifiers in every language.

The form enables Run when required values are valid. Inputs are not saved as configuration. Path inputs open native choosers and return opaque, invocation-scoped handles in `context.inputs`, not raw paths. An unselected optional path is `null`. Only `file` handles can be read by `api.inputs.readFile`; `folder` handles currently have no directory read/write operations.

### Photo OCR and color tags

Supported colors are `grey`, `blue`, `red`, `yellow`, `green`, `pink`, `purple`, `cyan`, and `orange`. Each media item has one tag. `setTag` replaces it and does not toggle it off when the same color is assigned again. Tag writes accept 1–4096 unique IDs per call, update the library and visible filters, and do not modify original files. Tag writes are unavailable in Trash.

This minimal example tags photos containing “invoice”:

```js
async function run(context, api) {
  const photos = context.items.filter(item => item.type === "photo");
  if (!photos.length) return;
  api.ui.setProgress(0, photos.length);
  for (let index = 0; index < photos.length; ++index) {
    const item = photos[index];
    const result = await api.media.recognizeText(item.id);
    if (result.text.toLowerCase().includes("invoice")) {
      await api.media.setTag([item.id], "yellow");
      api.ui.appendLine({text: `Tagged: ${item.name}`, itemId: item.id});
    }
    api.ui.setProgress(index + 1, photos.length);
  }
}
```

OCR runs locally using the installed OCR models and shared ONNX Runtime. It needs neither `media.read` nor network permission. Videos are unsupported; await each request before starting another. Empty results mean no text was recognized; `limited` indicates partial output. Missing runtime/models reject with `OcrRuntimeError`; other recognition failures use `OcrError`. OCR does not add text to metadata search or turn on viewer Text Selection Mode.

The complete **Search Image Text** example parses the input rules, normalizes Unicode, case and whitespace, then uses literal substring matching. The first matching rule determines the tag; unmatched photos retain existing tags and videos are skipped. It also handles progress, per-photo failures and localized output. English users see `invoice` / `meeting` in the initial JSON, while Simplified Chinese users see `发票` / `会议`.

### HTTPS and uploads

Declare exact origins such as `"networkOrigins": ["https://api.imgur.com"]`; do not include paths or trailing slashes. `fetch` supports GET, HEAD, POST, PUT, PATCH, DELETE and OPTIONS. Options include `method`, string-valued `headers`, `body` (string, ArrayBuffer or typed array), `signal`, and `timeoutMs`. GET/HEAD cannot have a body.

Responses expose `ok`, `status`, `statusText`, `url`, `headers` and single-use asynchronous `text()`, `json()` and `arrayBuffer()` methods. HTTP error statuses resolve normally, so check `response.ok`; transport and policy failures reject. Responses are buffered, with a 16 MiB limit. This subset has no cookies, response streams, FormData or Blob; explicit Authorization headers are supported. `AbortController` can cancel individual requests.

For direct original-file uploads, call `api.network.upload` with `url`, `mediaId`, `method` (`POST` or `PUT`), and `bodyType` (`raw` or `multipart`). Optional fields include `headers`, `contentType` for raw uploads, `fieldName` and string-valued `fields` for multipart uploads, `signal`, `timeoutMs`, and `onProgress({loaded, total})`. Progress counts request-body bytes, not confirmed server-side storage. Direct uploads do not require `media.read`.

### ZIP destination and cancellation

Archive extensions declare `archive.write` and a save input such as:

```json
{
  "id": "destination",
  "type": "saveFile",
  "label": "ZIP archive",
  "extension": "zip",
  "default": "Photos.zip"
}
```

The user chooses a destination and confirms replacement before Run. The script then calls:

```js
const result = await api.archive.saveZip({
  itemIds: context.items.map(item => item.id),
  destination: context.inputs.destination,
  onProgress({loaded, total}) {
    api.ui.setOutput(`Compressing: ${loaded} / ${total} bytes`);
  }
});
api.ui.setOutput(`Saved: ${result.path}`);
```

The result is `{path, files}`. `destination` is required and must be a ZIP `saveFile` handle from this invocation. The former ZIP-specific in-run Save dialog and `suggestedName` compatibility branch have been removed. One archive call is allowed per invocation, with 1–4096 unique item IDs. No `media.read` permission is needed.

Cancel stops pending work but does not roll back completed tag changes or uploads already accepted by a server. ZIP output is committed only after successful compression; cancellation before replacement preserves an existing destination. Cancelling after replacement does not delete the completed ZIP. Completion toasts and queued clipboard writes are discarded on failure or cancellation. Use dialog mode for batch OCR; headless extensions have a 30-second total timeout.

## Appearance and desktop integration

Choose system, light, or dark appearance. The interface supports English plus Simplified Chinese, Traditional Chinese (Hong Kong and Taiwan), Arabic, French (France and Canada), Russian, Spanish (Spain and Latin America), and Portuguese (Brazil and Portugal).

On Linux, select **Install on device** from the application menu to create a launcher and icon for the current user. The launcher points to the current executable; keep the extracted application directory in a stable location, or repeat the action after moving it. Installation reports success or failure in a notification bubble.

## Media support and performance

crPhotos uses Chromium's native C++ Views toolkit and compositor. Video playback connects Chromium's media pipeline to video layers without a Blink page or HTML video element. Hardware video decoding depends on the build, codec profile, GPU, and driver; supported Linux configurations can use VA-API. JPEG/PNG and HEIC decoding are separate from this video hardware path.

A virtualized grid limits active thumbnail views to the relevant browsing region. Background scanning, a persistent SQLite catalog, and thumbnail caching reduce repeated work. Video thumbnails handle rotation, mirroring, and HDR-to-SDR tone mapping. Suitable GPU-backed frames can use GPU thumbnail tone mapping, with fallback paths when unavailable.

### HEIC / HEIF still images

The static single-image path supports container rotation, mirroring, cropping, color-profile conversion, and supported HDR-to-SDR tone mapping. Suitable embedded thumbnails are preferred for SDR images; HDR thumbnails are generated from the primary image and its color metadata. A cached preview can appear before full-resolution decoding completes, preserving the viewer's zoom and pan when replaced.

- **Linux:** requires system `libheif.so.1` version 1.19.8 or newer and an HEVC decoder backend.
- **Windows x64:** requires a compatible `heif.dll` and its decoder dependencies alongside the application. A package may omit this optional runtime.

Missing HEIC dependencies leave other supported formats available. The decoder bounds input to 128 MiB, 64 million pixels, and 16384 pixels per dimension. Multi-image collection browsing and animated HEIC sequences are not supported. Video codec availability depends on the decoders included in the build and available on the device.

## Run a Linux release

Extract the complete ZIP into a stable directory and run `./crPhotos` from that directory. Keep the executable together with its resource PAKs, `icudtl.dat`, `snapshot_blob.bin`, graphics libraries, and `crphotos_resources/` directory. The V8 snapshot must come from the same build as the application; it is required when running JavaScript extensions.

For releases with People and OCR, also keep the complete `people-runtime/` and `ocr-runtime/` folders, including models, the OCR dictionary, runtime library, checksums and license files. The application does not download missing models automatically.

The checked Linux x64 v1.5.0 package contains both runtimes. Its bundled ELF files require GLIBC symbols up to **2.27** and GLIBCXX symbols up to **3.4.22**. These are binary dependency requirements, not a guarantee that every distribution meeting them is supported; desktop libraries and drivers must also be compatible.

The Linux archive is not a fully self-contained distribution. It uses system libraries for the desktop, fonts, graphics, audio, and networking, including GLib/GIO, NSS/NSPR, ATK, Pango/Cairo, X11/XCB, xkbcommon, GBM, D-Bus, and ALSA. HEIC additionally needs the runtime described above. Supported codecs and GPU acceleration depend on the installed environment.

Example extension folders must be obtained separately if they are not included in the release archive. Install each unpacked package through **Settings → Extensions**. The executable alone does not install example extensions or configure upload credentials.

Package contents vary by release. CRC and bundled model SHA256 checks verify file integrity; they do not replace testing on the target desktop environment.

This README describes the current source implementation; available features depend on the version and runtime dependencies of the package you use.
