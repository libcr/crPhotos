# Search Image Text

Install this folder through **Settings → Extensions → + Add Extension**.
Select photos in the grid, or open a photo, then run **Search Image Text**.
Enter JSON rules in the preset dialog and click **Run**:

```json
{
  "invoice": "yellow",
  "meeting": "blue"
}
```

The initial example follows the interface language: English uses `invoice` and
`meeting`, Simplified Chinese uses `发票` and `会议`, and the other supported locales
have translated examples. Color identifiers stay in English. Edit these keywords
to match the actual text in your photos. Version 1.0.1 adds these localized defaults;
update or reinstall an older installed copy to use them.

Rules must be a JSON object containing 1–128 nonempty text keys (at most 512
UTF-16 code units each). Values are lowercase English color identifiers:
`grey`, `blue`, `red`, `yellow`, `green`, `pink`, `purple`, `cyan`, `orange`.
JSON uses double quotes, colons between keys and values, and commas between rules.
Syntax is validated by the form; the extension validates the rule structure
before starting OCR or writing tags.

The extension recognizes selected photos sequentially and performs literal
substring matching, ignoring case, applying Unicode NFKC normalization and
collapsing whitespace (including line breaks). Keywords are not regular
expressions. The first matching rule in JavaScript `Object.entries` order wins;
for numeric-only keys, JavaScript orders integer keys numerically. Avoid duplicate
JSON keys, as JSON parsing retains only their last value.

Each photo has one color tag. A match assigns/replaces that tag; setting the
same color again keeps it. Unmatched photos retain their tags. Videos are skipped.
Partial OCR results are marked in the output but may still yield a match. Review
results if a wrong OCR reading could assign an unwanted tag.

The dialog shows a progress bar, processing counts and per-photo results.
Double-click an associated output line to highlight the photo preview. Only the
latest 100 output lines are retained. Individual failures are counted and the
remaining photos continue; missing OCR models/runtime stops the run. Cancel stops
new work. Tags already committed (or a tag transaction already running) may remain;
cancellation does not roll back earlier photos. Original image files are unchanged.

The `media.ocr` permission recognizes only invocation photos; `media.tags.write`
sets their tags. No network connection or `media.read` permission is needed.
Keep the prepared `ocr-runtime/` and `people-runtime/` folders beside crPhotos.
Recognition uses the shared PP-OCRv6 tiny CPU service and a decode bounded to
2048 pixels on its longest edge; very small text may be missed.
