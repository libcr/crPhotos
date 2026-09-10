# Upload to Imgur

A local crPhotos extension for selected photos/videos and the current viewer item.
It uses the [official Imgur Image Upload endpoint](https://apidocs.imgur.com/#c85c9dfc-7487-4de2-9ecd-66f727cf3139):
`POST https://api.imgur.com/3/image`, multipart file field `image`, and `type=file`.
The icon is a generic upload icon, not the Imgur logo.

## Setup

1. Open **Settings → Extensions → Add Extension** and select this directory.
2. Register your own application through [Imgur API registration](https://api.imgur.com/oauth2/addclient).
3. Click the extension’s gear icon and fill in your **Client ID**:

   ```json
   {"clientId": "YOUR_CLIENT_ID", "accessToken": ""}
   ```

4. Click **Save**. Select media and click **Upload to Imgur** after Share,
   or choose it from the photo/video context menu.

A Client ID uploads anonymously, without associating the upload with an account.
To upload to an account, provide an existing OAuth access token in `accessToken`;
when both fields are present, the token is used. The extension does not implement
OAuth login or token refresh, and never needs your Client Secret. Authentication
follows [Imgur's official API documentation](https://apidocs.imgur.com/).

`config.json` is ignored by Git and stored locally in plaintext. No credentials
are bundled. Missing credentials display a localized configuration error without
sending a request. Do not reuse credentials from public documentation examples.

## Behavior

- Uploads supported media sequentially, up to 128 selected files per run.
- Uses the original files, including embedded metadata; no conversion or resizing.
- Filters extensions according to the image/video MIME formats listed in the
  official endpoint documentation. Unsupported formats (for example HEIC) are
  skipped. Service limits are enforced by Imgur's response.
- Links per-file progress, upload URLs, deletion links, skipped files and errors
  to their media previews. Double-click an output line to select it and enlarge
  the corresponding preview. The final summary has no media association.
- Shows per-file progress; at 100%, shows that it is awaiting the server response.
- Checks HTTP status and Imgur's `success` result, then displays the media link
  and, when returned, an anonymous deletion link. Copy links from the output.
- Stops the batch on HTTP 401, 403 or 429. Other file failures are reported and
  processing continues. No automatic retries. Each upload times out after 5 minutes.
- Cancel stops pending work. Already accepted remote uploads remain; use their
  deletion links or your Imgur account to manage them. Deletion links grant deletion
  access, so retain them privately. If a response is lost after acceptance, a deletion
  link may not be available in the dialog.

Real uploads require your configured credentials and send your files to Imgur.
The example is not automatically installed and does not upload anything at startup.
