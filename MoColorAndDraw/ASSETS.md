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

## 5. Drawing tools: 9 tools, two layers each

Canvas **300 × 540 px**, tool **standing straight up, tip at the top centre** (the tip should touch the top-centre point, about 10 px from the top edge). The same image is used as the finger cursor while drawing, so the tip position matters.

Each tool part that shows the chosen colour is tinted by the game. For each tool send **two files with the same size and position**:

- `tools/<name>.png`: the whole tool, with the colour part drawn in **plain light grey or white**, with soft shading.
- `tools/<name>-color.png`: **only** the colour part, solid white, everything else transparent.

| Name | Tool | The colour part |
|---|---|---|
| `fill` | Paint bucket | The paint in the bucket and a drip |
| `crayon` | Crayon | Tip and body (keep the paper wrapper stripes white) |
| `marker` | Highlighter (Stabilo) | Cap/body and chisel tip |
| `brush` | Round paint brush | The wet tip |
| `pen` | Bold marker pen | Body and pen tip |
| `oil` | Flat oil brush | The bristles |
| `glitter` | Glitter tube or bottle | The glitter inside |
| `stamp` | Rubber stamp | The ink pad / stamp face |
| `eraser` | Eraser | None: send just `eraser.png` |

## 6. Colour crayon (one template makes all 30 colours)

- `ui/swatch.png` + `ui/swatch-color.png`: **160 × 320**, crayon standing up, tip at the top. Same two-layer rule as the tools.
- `ui/swatch-rainbow.png`: optional, a rainbow crayon in full colour.
- `ui/picker.png`: 300 × 300, the "free colour" button (a rainbow wheel or palette with a + sign).

Only the **top 40%** of the crayon shows in the two-row colour bar, so make the tip and top look nice.

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
