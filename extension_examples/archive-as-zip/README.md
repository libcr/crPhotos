# Archive as zip

Install this directory through Settings → Extensions → Add Extension.
Select photos/videos and run Archive as zip, or run it from the viewer menu.
The preset dialog first shows a **ZIP save location** field. Click **Browse…**,
choose a `.zip` destination in the native Save dialog, then click **Run**.
The script does not start until the required path has been selected. Existing ZIP files are replaced
only after successful compression; this extension does not append to archives.

The preset dialog shows previews and byte progress. Cancel stops the task and
removes its temporary file. Cancelling the Save dialog returns to the input form without starting work.
Run stays disabled until the required input is valid. The input area is disabled
while compression runs. The selected destination is passed through an
invocation-local handle, so no second Save dialog appears.
On success, the output lists the destination, file count and selected files
(within the host output limit); double-click a
file line to highlight its preview. Done closes the dialog.

Files are stored at the ZIP root. Duplicate names receive numeric suffixes.
No network or credentials are needed. The archive.write permission only exposes
selected media and a destination explicitly selected in the native dialog.

Version 1.1.0 uses the input-form API. Previously installed copies are not
automatically updated when the example in the source tree changes; update the
installed package or reinstall this directory to use the new form.
