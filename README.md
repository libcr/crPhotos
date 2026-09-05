# crPhotos

A desktop photo and video browser for your local folders, built on Chromium. Explore your collection in a flowing masonry timeline, open photos and videos in one viewer, and keep your favorites close at hand.

## Your collection, at a glance

Browse portrait photos, landscape shots, screenshots, and videos together in an aspect-ratio-aware grid. Adjust **Grid Size** from two to six columns to choose between larger previews and a denser overview. The year and month beside **Timeline** follow the first visible item as you scroll.

![Landscape photos and videos in the crPhotos five-column Timeline](Screenshot%20From%202026-09-06%2007-35-38.png)

The timeline uses available capture dates, with MP4/MOV container creation time as a video fallback, then file creation time when no embedded date is available. Container dates can reflect an export rather than the original recording.

## Build a library from your folders

Open **Settings → Library** to add folders. Each folder appears immediately, with photo and video counts updated during scanning. Choose whether to include photos, videos, or both, and right-click a folder to remove it from the library configuration.

Your folder choices persist between sessions. Folder monitoring picks up newly added media, while a scan-completion toast keeps the timeline heading clear. On first use, the setup page offers default media folders; review the list and choose **Done** to start browsing.

Use filename search and **Filter media** to narrow the view by media type, library folder, or **Starred**. Filter menus stay open while you make multiple choices.

## Enjoy photos and videos in one viewer

Open an item to explore it without leaving the application. Zoom and pan through photos, or play videos with seeking, volume adjustment, one-click mute, and fullscreen controls. Video controls hide when not needed and reappear when you move into the bottom controls area.

- **Left / Up:** previous item.
- **Right / Down:** next item.
- **F:** toggle fullscreen; switching between items preserves fullscreen.
- **Esc / Q in fullscreen:** return to window mode.

A gentle directional bounce indicates the beginning or end of the collection. Returning to the grid keeps your browsing context, and videos return to the beginning when playback finishes.

![Photos and videos together in the crPhotos Timeline](Screenshot%20From%202026-09-06%2007-26-45.png)

## Select, organize, and inspect

Click the selection circle on a thumbnail to enter selection mode. Select individual items or hold the left mouse button and drag across thumbnails. The heading shows the selected count and combined file size, while a floating toolbar provides batch actions.

Mark favorites with **Starred**, copy selected files to the clipboard, or review thumbnail previews before moving items to Trash. The **Trash** view offers selection, **Restore**, and **Delete permanently** with an additional confirmation. The application cleans up its expired trash entries after a 30-day retention period when running.

Open **Details** to inspect dimensions, file size, path, and available camera or video information. Supported embedded metadata includes capture time, camera/phone model, lens model, ISO, exposure time, aperture, and focal length. Missing capture fields are hidden. A copy button copies the displayed metadata and confirms with **Copied**.

Light and dark appearances are available, with English and translations for Simplified Chinese, Traditional Chinese (Hong Kong and Taiwan), Arabic, French (France and Canada), Russian, Spanish (Spain and Latin America), and Portuguese (Brazil and Portugal).

## Technology that supports the experience

### Native Chromium UI and media

crPhotos uses Chromium 150's C++ Views toolkit and compositor rather than an HTML gallery. Video playback connects Chromium's media pipeline to compositor video layers without a Blink page or an HTML video element. Supported Linux configurations can use VA-API hardware video decoding; availability depends on the codec, GPU, and driver. JPEG and PNG decoding is software-based, not advertised as GPU decoding.

### Responsive browsing

A virtualized grid limits active thumbnail views to the relevant browsing region. Background scanning, a persistent SQLite catalog, and thumbnail caching reduce repeated work. Compositor-based transitions and preserved viewport anchors help keep navigation continuous as the layout changes. Newly generated video thumbnails apply rotation and mirroring to match playback orientation.

### Focused HEIC support

Linux supports common single, static SDR HEIC/HEIF images through a system-installed **libheif 1.19.8 or later** with an HEVC decoder backend. Use a maintained package with security updates. Suitable embedded thumbnails are preferred; cached previews can appear before full-resolution decoding completes. Rotation and color-profile handling are included, with bounded decoding to limit resource use.

Missing HEIC dependencies do not prevent crPhotos from starting; HEIC viewing reports that the decoder is unavailable. This support does not cover HEIC animation, multi-image browsing, or HDR tone mapping, and the current HEIC loader is Linux-only. Other video format support depends on the codecs included in the build and available decoders.
