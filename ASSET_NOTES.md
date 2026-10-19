# Images

All 211 showcase images are edited to remove company names, logos, company domains and company references in interface records. Business records use neutral customer/supplier identifiers. Professional layouts, photos and functional text are preserved. The complete user batch approval is recorded in `design/debranding/approved.json`. No images remain deferred. The final six completion records are in `design/debranding/final-six.json`; exact prompts remain in the prompts directory.

The manifest provides edited intrinsic dimensions, responsive widths, neutral alternative text and captions, and an anonymization flag. Full-size edited files use lossless WebP. Previews use 640-pixel widths without enlargement, WebP quality 100 and method 6. Both variants have new filenames to prevent stale browser-cached branded copies. Old branded showcase files are removed from the public directory.

Relevant actual Anques imagery was analyzed before each edit as a presentation reference, without copying its artwork. Per-image reference URLs, visual review notes, text-audit results and SHA-256 hashes appear in `design/showcase-assets-report.json`. Exact prompts are retained in `design/debranding/prompts/`. Text recognition supplements visual review and cannot itself verify every logo or character.

The Cubusify logo, supplied founder portrait and local Inter fonts remain. The Inter OFL license is included. Website resources are local; no third-party image or font requests are needed at runtime. Founder portrait previews use high-quality WebP and its supplied original remains.

The optional `scripts/prepare-showcases.py` requires every published asset to have review/audit records and every omitted asset to have an explicit deferral record. The old branded-donor import is unsupported to prevent accidental restoration. Pillow is needed for authoring only, never website builds.

The final completion importer, `scripts/complete-showcases.py`, preserves the other 205 reviewed images, verifies OCR and pixel-equivalent lossless encoding, and records the remaining six reviews. The production check requires all 211 images and all 422 full-size/preview files.
