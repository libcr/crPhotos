# crPhotos

A desktop photo and video browser for your local folders, built on Chromium 150. Explore your collection in a masonry timeline, view photos and videos in one application, and keep favorites close at hand.

## Your collection, at a glance

Browse portrait photos, landscape shots, screenshots, and videos together in an aspect-ratio-aware grid. Adjust **Grid Size** from two to six columns to choose between larger previews and a denser overview.

Photo thumbnails show file size in the upper-right corner. Video thumbnails show duration and a play symbol in the same position. File-size units advance at multiples of 1024; unavailable video durations appear as `--:--`. MP4/MOV duration is read during scanning, so an existing library may need a rescan to populate it.

![Hangzhou photos and videos in the crPhotos five-column Timeline, with file sizes and video duration](Screenshot%20From%202026-09-09%2000-40-32.png)

The date beside **Timeline** follows the visible collection. When visible media have GPS coordinates that resolve to a city, the heading shows the date and city of the first matching item in visual order. If the first visible item has no location, later visible items are checked. If none matches, only the first visible item's date is shown.

The timeline uses available capture dates, with MP4/MOV container creation time as a video fallback, then file creation time when no embedded date is available. Container dates can reflect an export rather than the original recording.

## Build a library from your folders

Open **Settings → Library** to add folders. Each folder appears immediately, with photo and video counts updated during scanning. Choose whether to include photos, videos, or both, and right-click a folder to remove it from the library configuration.

Folder choices persist between sessions. Folder monitoring picks up newly added media, and a scan-completion toast reports progress. On first use, the setup page offers default media folders; review the list and choose **Done** to start browsing.

Use filename search and **Filter media** to narrow the view by media type, library folder, or **Starred**. Filter menus stay open while you make multiple choices.

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
| Ctrl + A in selection mode | Select all displayed items |
| Delete in the viewer | Delete the current item without confirmation, then show the next item |
| Ctrl + Q in the main window | Quit |

Viewer deletion moves ordinary library files to crPhotos-managed Trash. **Viewing an item in Trash and pressing Delete permanently deletes it without confirmation.** If the deleted item was last, the viewer opens the previous item; if none remain, it returns to the grid. A failed deletion does not advance the viewer, and holding Delete does not repeatedly delete items.

A directional bounce indicates the beginning or end of the collection. Switching items preserves fullscreen, returning to the grid keeps browsing context, and videos return to the beginning when playback finishes.

![Spring flowers in the crPhotos five-column Timeline, with the date and Taizhou city heading](Screenshot%20From%202026-09-09%2000-41-04.png)

## Select, organize, and inspect

Click the selection circle on a thumbnail to enter selection mode. Select individual items or hold the left mouse button and drag across thumbnails. The heading shows the selected count and combined file size, while a floating toolbar provides batch actions.

Mark favorites with **Starred**, copy selected files to the clipboard, or review thumbnail previews before moving a selection to Trash. The **Trash** grid offers **Restore** and **Delete permanently** with confirmation. This batch flow is separate from the viewer's immediate Delete shortcut. Expired trash entries are cleaned up after a 30-day retention period while crPhotos is running. This is application-managed storage, not the Windows Recycle Bin.

Open **Details** to inspect dimensions, file size, path, and available camera or video information. Supported embedded metadata includes capture time, camera/phone model, lens model, ISO, exposure time, aperture, and focal length. Android/Pixel manufacturer and model tags are supported in MP4 metadata. Missing capture fields are hidden. A copy button copies the displayed metadata and confirms with **Copied**.

### Offline GPS and city names

Details can show WGS84 latitude/longitude and the approximate city, province/state, and country. Supported sources include EXIF GPS, supported HEIC Exif metadata, and QuickTime ISO 6709 decimal-coordinate tags in MP4/MOV files.

City lookup uses bundled **GeoNames** data and requires no online geocoding or runtime database download. It selects the nearest retained city point within 100 km; this is an approximation, not an administrative-boundary or landmark lookup. Coordinates remain available even when no city matches.

Place names follow the interface language where translations are available, with fallback names otherwise. The GeoNames data is embedded in the application resource pack. Data attribution: [GeoNames](https://www.geonames.org/), licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

## Share with nearby devices

Configure nearby sharing in Settings to discover devices on the local network or connect manually by address. Send selected files, review pairing and transfer approval prompts, choose a receive directory, and monitor or cancel transfers. Trusted devices can be remembered, with an optional setting to automatically accept their transfers.

The **Trusted devices** window lists remembered devices and transfer statistics. It is modal to the main window; close it to resume browsing. The red delete icon forgets a device's trusted status.

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

This README describes the current source implementation; available features depend on the version and runtime dependencies of the package you use.
