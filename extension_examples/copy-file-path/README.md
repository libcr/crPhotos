# Copy File Path

Install through **Settings → Extensions → Add Extension** by selecting this
folder. Requires a crPhotos build with `ui: "none"`, `clipboard.write` and `api.ui.toast` support.

- Selection mode: copies the full paths of selected files, one path per line.
- Viewer mode: copies the full path of the current photo or video.
- Runs without a processing dialog, preview or configuration.
- After copying, shows an arrowed confirmation bubble for three seconds without
  taking focus, e.g. `1 file copied` or `2 files copied`. Supports all 11 locales.
- Requests `clipboard.write`; it cannot read clipboard contents or file bytes.
- Supports up to 4096 files and 1,048,576 UTF-16 code units of combined text.
- The host writes the clipboard only after successful script completion.
  Errors, cancellation and the 30-second timeout leave the clipboard unchanged.

A new headless invocation cancels the previous headless action in that window.
Closing the window, disabling or deleting the running extension also cancels it.

When upgrading an installed copy, update its `main.js` and `manifest.json`, then
toggle the extension off and on (or restart crPhotos) to reload the script.
