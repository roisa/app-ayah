# Mo Color & Draw: art needed for the new UI

Send everything in one Google Drive folder (sub-folders below are fine) and share the link.
All files are **PNG with a transparent background** unless noted. Sizes are the minimum; bigger is fine.
Keep each file name as listed, so each one drops straight into the game.

## 1. Coloring pages (most important)

| What | Spec |
|---|---|
| `pages/<name>.png` | Black outlines on pure white, **1600 × 1200 px** (landscape) or 1200 × 1600 (portrait) |
| Name + fact | For each page: name in EN and ID, and an optional short "Did you know?" fact (EN and ID) |

Rules for line art, so tap-to-fill works:
- Every shape **fully closed**, with no gaps in the lines (gaps make the paint leak into the next area).
- Lines thick and even: about **8–14 px** at 1600 px wide.
- Pure black and white only: no grey shading, texture, gradients, or a colored background.
- Not too many tiny areas: little kids need big shapes to tap.

## 2. Home screen

| File | Size | Notes |
|---|---|---|
| `ui/bg-home.png` (or .jpg) | 2048 × 2048 | Background; the middle must still work when cropped to a phone (portrait) or a tablet (landscape) |
| `ui/logo.png` | 1200 × 500 | "Mo Color & Draw" title art |
| `ui/card-color.png` | 800 × 860 | Color button art. Optional: 2–3 frames for an animation |
| `ui/card-draw.png` | 800 × 860 | Draw button art. Optional: 2–3 frames for an animation |
| `ui/btn-myart.png` | 600 × 200 | My Art button |

## 3. Mo (the character)

| File | Size | Use |
|---|---|---|
| `mo/wave.png` | 600 × 900 | Home screen |
| `mo/bismillah.png` | 600 × 900 | Bismillah screen (hands raised / praying pose) |
| `mo/cheer.png` | 600 × 900 | Alhamdulillah celebration after saving |
| `mo/think.png` | 600 × 900 | Optional: "Did you know?" box |

## 4. Buttons and icons (256 × 256 each)

Home, back, undo, trash (clear), camera (save), my art / gallery, sound on, sound off, language EN, language ID, plus (color wheel), close (X), OK / check, download / share, edit (pencil), padlock (parent gate), arrow left, arrow right.

## 5. Tools (256 × 460 each, pointing up, tip at the top centre)

Paint bucket, crayon, highlighter, brush, bold pen, oil brush, glitter, stamp, eraser.

The **colored part of each tool** (crayon body, marker cap, paint in the bucket and so on) is tinted to the color the child picks. So send each tool as **two layers**:
- `tools/<name>.png`: the full tool, with the colorable part drawn in **plain white or light grey**.
- `tools/<name>-color.png`: only the colorable part, in white, at the same size and position. The game colors this layer.

The same tool images are used for the finger cursor while drawing.

## 6. Color crayons (one template)

`ui/swatch.png` + `ui/swatch-color.png`, 160 × 320: one crayon in the same two-layer style. The game makes all 30 colors from it.

## 7. Stamps (300 × 300 each)

Star, heart, moon & star, sun, cloud, flower, sparkle, masjid, lantern, butterfly, balloon, fish, plus any new ones (camel, Ka'bah, date palm, Qur'an stand, ketupat, rainbow...).
Either:
- **Colorable** (like now): one white shape with a dark outline, which the game tints, or
- **Full color**: the stamp keeps its own colors (say which you prefer).

## 8. Optional

- Size dots (small / medium / big), 128 × 128 each.
- Confetti pieces, sparkles.
- Panel / dock background texture.
- App icon 1024 × 1024 (no transparency, no rounded corners).
- Sounds (MP3 or M4A): button tap, fill, stamp, save cheer, plus voice lines in EN and ID ("Bismillah, let's color!", "Alhamdulillah! What a beautiful picture!", color names).
