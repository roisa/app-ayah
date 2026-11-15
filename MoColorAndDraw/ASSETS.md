# Mo Color & Draw: art needed for the new UI

Put everything in **one Google Drive folder**, using the sub-folders and file names below, and share the link. Claude can read the folder directly and swap the art in.

## General rules (for every file)

| Rule | Why |
|---|---|
| **PNG with a transparent background** (except backgrounds and coloring pages) | Buttons and tools sit on top of other things |
| **No words inside the images** (except the logo) | The game switches between English and Indonesian, so it writes all labels itself |
| Sizes below are the **minimum**; up to 2× bigger is fine | Phones and tablets have sharp screens |
| Keep the **same style** for everything: same outline thickness, same lighting, same corner roundness | It looks like one app, not a collage |
| Leave **a little empty space** (about 4%) around each object; don't let it touch the edge | Shadows and bounces don't get cut off |
| Square icons: centre the object | They are shown at many sizes |

If your AI image generator can't make transparent backgrounds: generate on a **plain, flat bright-green (#00FF00) background** with no shadow on the background, and Claude will cut it out. Avoid green inside the object itself. White backgrounds are hard to cut cleanly.

**Fonts:** the game now uses *Lilita One* (titles) and *Baloo 2* (text). To change them, send the font name (free Google Fonts are best).

**Colours:** send your main palette as hex codes (for example #FFA51F orange) for the backgrounds, panels and button rims. Panels, button rims and shadows are drawn by the game in those colours, so they stay sharp at any size.

---

## 1. Coloring pages (highest priority)

`pages/<name>.png`, **1600 × 1200 px** (landscape) or 1200 × 1600 (portrait).

- Black outlines on **pure white**. No grey, shading, texture, gradients or background colour.
- **Every shape fully closed**, with no gaps; zoom in and check the joins. Any gap lets the paint bucket leak into the next area.
- Lines thick and even: **8–14 px** at 1600 px wide.
- Big, simple areas: kids aged 3+ tap with a whole finger. Avoid lots of tiny areas.
- For each page, send in a small text file or list:
  - the name in EN and ID (for example *Camel / Unta*)
  - optionally a short "Did you know?" fact in EN and ID, with the surah and ayah if it quotes the Qur'an.
- Ideas: masjids (Masjid al-Haram, Nabawi, Al-Aqsa, Istiqlal), animals in the Qur'an (camel, bee, ant, elephant, the big fish, cow, spider, hoopoe, the dog of the cave), Ramadan and Eid, wudu and salah steps, fruits from the Qur'an, Mo and friends.

### Categories

Pages are grouped into categories. Put each page in a sub-folder named after its category, for example `pages/pets/cat.png`. A page can be in more than one category; say so in your list.

| id | Category (EN / ID) |
|---|---|
| `surprise` | Surprise Me! / Kejutan! (always first, picks a random page; no pages needed) |
| `masjid` | Masjid |
| `quran` | Animals in the Qur'an / Hewan dalam Al-Qur'an |
| `ramadan` | Ramadan & Eid / Ramadan & Lebaran |
| `pets` | Pets / Hewan Peliharaan |
| `dino` | Dinosaurs / Dinosaurus |
| `sea` | Sea Animals / Hewan Laut |
| `farm` | Farm Animals / Hewan Ternak |
| `bugs` | Bugs & Butterflies / Serangga & Kupu-kupu |
| `birds` | Birds / Burung |
| `flowers` | Flowers & Garden / Bunga & Taman |
| `food` | Fruits & Food / Buah & Makanan |
| `vehicles` | Cars & Vehicles / Mobil & Kendaraan |
| `space` | Space / Luar Angkasa |
| `hijaiyah` | Hijaiyah Letters / Huruf Hijaiyah |
| `numbers` | Numbers & Shapes / Angka & Bentuk |
| `patterns` | Islamic Patterns / Pola Islami |
| `jobs` | Jobs & Helpers / Profesi |
| `mo` | Mo & Friends / Mo & Teman |

Category card art: `cats/<id>.png`, **400 × 330 px**, full colour, filling the whole card (no text). For Surprise Me: `cats/surprise.png`, 1200 × 360 (a wide banner). Add, rename, reorder or remove categories freely; just send the new list.

## 2. Home screen

| File | Size | Notes |
|---|---|---|
| `home/bg.png` (or .jpg) | 2732 × 2732 | Background. It is cropped to fit phones (tall) and tablets (wide), so keep the important bits in the middle 1290 × 1290. No characters near the edges |
| `home/logo.png` | 1600 × 600 | "Mo Color & Draw" title art. The only file with words |
| `home/card-color.png` | 900 × 970 | Art for the **Color** button, without the label. Show a coloring page being coloured |
| `home/card-draw.png` | 900 × 970 | Art for the **Draw** button, without the label. Show a blank page with a drawing |
| `home/card-color-anim-1.png`, `-2.png`, `-3.png` | 900 × 970 | Optional: 2–3 animation frames for the Color card (for example, the colour filling in step by step) |
| `home/card-draw-anim-1.png`, `-2.png`, `-3.png` | 900 × 970 | Optional: 2–3 frames for the Draw card (for example, the crayon drawing step by step) |

The game writes the labels "Color / Mewarnai" and "Draw / Menggambar" itself, and adds the bounce and pop animation.

## 3. Mo (the character), 900 × 1350 each, full body

| File | Where it shows |
|---|---|
| `mo/wave.png` | Home screen |
| `mo/bismillah.png` | Before every drawing: hands raised in du'a, or a happy "let's start" pose |
| `mo/cheer.png` | After saving ("Alhamdulillah!"): jumping or arms up |
| `mo/think.png` | Optional: next to the "Did you know?" fact |
| `mo/sad.png` | Optional: My Art when it is empty ("No pictures yet") |

## 4. Round buttons, 300 × 300 each (icon on its button)

Send each as the **finished button** (button shape + icon). The game adds the press animation.

| File | Icon |
|---|---|
| `btn/home.png` | House |
| `btn/back.png` | Arrow pointing left |
| `btn/undo.png` | Curved arrow back |
| `btn/clear.png` | Trash can (clears the picture; the game adds the "hold to clear" ring) |
| `btn/save.png` | Camera (save picture). Make it the **biggest and most eye-catching** button |
| `btn/music-on.png`, `btn/music-off.png` | Music note, and the same note crossed out |
| `btn/sound-on.png`, `btn/sound-off.png` | Speaker, and the same speaker crossed out |
| `btn/lang-en.png`, `btn/lang-id.png` | English and Indonesian (a flag or "EN" / "ID"; letters are fine here) |
| `btn/gallery.png` | Picture frame (My Art) |
| `btn/edit.png` | Pencil (keep drawing) |
| `btn/share.png` | Download arrow (save to photos) |
| `btn/delete.png` | Trash can (delete a picture; can match `clear`) |
| `btn/close.png` | X |
| `btn/ok.png` | Check mark |
| `btn/lock.png` | Padlock (parent gate) |
| `btn/play.png` | Optional: big play button |

Also send a wide button, `btn/pill.png` (900 × 260), for "My Art" and "Bismillah, let's draw!". The game writes the words on it, so leave the middle plain.

## 5. Drawing tools (9 tools)

**Status: done** (Nov 2026). The owner's 9 tool images are in `tools/` (`<name>.webp` + `<name>-color.webp`, the tint layer cut from the light-grey part). To replace a tool, send a new image made with the same rules and Claude reprocesses it.

The tool bar under the board. Each image is also the **finger cursor** while drawing: the game tilts it and puts its tip exactly under the finger.

### The 9 tools, in order

| # | File name | Tool | What it does | Colour part (tinted, option A) |
|---|---|---|---|---|
| 1 | `fill` | Paint bucket | Fills a whole area in one tap | Paint inside the bucket + a drip |
| 2 | `crayon` | Crayon | Rough, waxy line | Tip + body (keep the wrapper stripes white) |
| 3 | `marker` | Highlighter (Stabilo) | Wide see-through line | Body + chisel tip |
| 4 | `brush` | Round paint brush | Soft line | The wet tip of the bristles |
| 5 | `pen` | Bold marker pen | Thick solid line (default tool in Draw) | Body + round felt tip |
| 6 | `oil` | Flat oil brush | Thick paint with streaks | The flat bristles |
| 7 | `glitter` | Glitter tube / shaker | Sparkly line | The glitter inside |
| 8 | `stamp` | Rubber stamp | Places stamps (Draw mode only) | The stamp face / ink pad |
| 9 | `eraser` | Eraser | Erases | None (always pink/white) |

Each tool should have a **clearly different shape**, so a 3-year-old can tell them apart by outline alone. The brush and the oil brush in particular: round, pointy tip vs. wide, flat bristles.

### Size and position (same for all 9)

- **Canvas: 300 × 540 px** (portrait, 5 : 9), PNG, transparent background.
- The tool **stands straight up, tip pointing up**, centred left-right.
- The **very tip touches the top centre**, about 10 px below the top edge. The game uses this point as the drawing point under the finger.
- The tool fills the height (about 500 px tall); the width can be narrower, kept centred.
- On screen it is shown **small**: 40–64 px wide, 58–84 px tall, and about 50 × 94 px as the cursor. Use a **thick dark outline, big simple shapes, and no tiny details or text**.
- **No glow, ring or background behind the tool.** The game draws the yellow "selected" ring and the bounce itself.

### Colour: pick option A or B

**A. Tinted (recommended).** The tool shows the colour the child picked (red crayon, blue crayon…), so kids see which colour they are holding. The game does this now. Send **two files per tool**, same size and position:
- `tools/<name>.png`: the whole tool, with the colour part drawn in **light grey (#d9d9d9) with soft shading**.
- `tools/<name>-color.png`: **only** the colour part, solid white, everything else transparent.

**B. Fixed colours** (like your mockup: red crayon, yellow highlighter, blue brush…). One file per tool, `tools/<name>.png`. Simpler to make, but the tools no longer show the chosen colour.

### Optional extras

- `tools/<name>-on.png`: a "selected" version (for example a bit brighter, or with the cap off). Without it, the game uses the normal image plus its yellow ring.
- If your style needs the cursor at an angle different from the tool bar, send `tools/<name>-cursor.png` (200 × 200, tip in the **top-left corner**).

### Style tips for AI image generators

- Generate all 9 in **one session with the same style words**, for example: *"cute 3D cartoon kids app icon, soft shading, thick dark-brown outline, standing upright, tip pointing up, centred, plain flat bright green (#00FF00) background, no text"*.
- If the tool can't be on a transparent background, use **flat bright green** (no shadow on the background) and Claude will cut it out. Avoid green in the tool itself, except for the colour part, which is grey anyway in option A.
- Send big (1024 px tall is fine). Claude scales and positions them.

## 6. Colours

The colour dots and the palette button are drawn by the game (round glossy dots), so no art is needed. Optional: `ui/palette.png` (300 × 300), a palette icon for the "any colour" button.

## 7. Sizes

`ui/size.png`: 200 × 200, one round blob or dot. The game tints it and shows it in 3 sizes. Optional.

## 8. Stamps, 400 × 400 each (Draw mode only)

Now: star, heart, moon & star, sun, cloud, flower, sparkle, masjid, lantern, butterfly, balloon, fish.

New ideas: camel, Ka'bah, date palm, dates, Qur'an on a stand, prayer mat, ketupat, rainbow, Mo's face, cat, bird, tree, house, car.

Choose one style:
- **A. Colourable** (like now): the shape in solid white with a dark outline. The game paints it in the colour the child picked.
- **B. Full colour**: the stamp keeps its own colours, like stickers. The colour bar does nothing for stamps.

## 9. Celebrations and extras (optional)

| File | Size | Use |
|---|---|---|
| `fx/confetti-1.png` … `-6.png` | 64 × 64 | Confetti pieces after saving (stars, moons, dots) |
| `fx/sparkle.png` | 128 × 128 | Sparkle used in animations |
| `ui/frame.png` | 2000 × 1500 | Optional frame or border around the drawing paper |
| `ui/empty-art.png` | 800 × 600 | Picture for an empty My Art |
| `app/icon.png` | 1024 × 1024 | App icon: square, **no transparency, no rounded corners** (phones round it) |

## 10. Sounds (optional; the game makes its own sounds now)

MP3 or M4A, short, no silence at the start:
- `sfx/`: tap, paint bucket, crayon, highlighter, brush, pen, oil brush, glitter, stamp, eraser, colour pick, undo, clear, save cheer.
- `music/loop.mp3`: background music that loops smoothly, 1–2 minutes, instruments or nasheed-style vocals only.
- `voice/en/` and `voice/id/`: "Bismillah, let's color!", "Bismillah, let's draw!", "Alhamdulillah! What a beautiful picture!", and all 30 colour names.

---

## Priority order

1. Coloring pages (and their names and facts)
2. Tools and the crayon swatch
3. Round buttons
4. Home screen (background, logo, two cards)
5. Mo poses
6. Stamps
7. Everything optional
