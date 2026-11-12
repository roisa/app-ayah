# Nur Connect

Islamic pair-matching puzzle for Muslim families, by Baby Mo.

- Drag a tile to its pair along a path with no more than two turns
- Starts each level with **Bismillah**, praises with **MashaAllah / SubhanAllah / Barakallahu fik / Allahu Akbar**, finishes with **Alhamdulillah**
- Glossy 3D look: themed backgrounds that change each level, a world map, ribbons, trophy and star rating, and tools for hint, shuffle and undo
- Pauses the game at every prayer time (Kemenag RI method, Fajr 20°, Isha 18°) until the player has prayed
- English and Bahasa Indonesia

Play: https://roisa.github.io/app-ayah/

## Fonts and sound

- Fonts are self-hosted from Google Fonts (SIL Open Font License) in `fonts/`, so the game also works offline and inside an app:
  **Lilita One** for titles and numbers, **Baloo 2** for buttons and text, **Baloo Bhaijaan 2** for the Arabic cheers, **Amiri** for Bismillah and the call to prayer.
- Sound effects are synthesised in the browser (no audio files): tile pop, chimes that climb with each combo, shuffle whoosh, hint sparkle, win fanfare, countdown ticks and the prayer bell.
- Voice cheers ("MasyaAllah, great!", "SubhanAllah, amazing!", "Barakallahu fik, awesome!", "Allahu Akbar, unstoppable!", "Alhamdulillah! Well done!") use the device's text-to-speech in English or Indonesian. To use real recordings instead, add files under `voice/<lang>/` and list them in `VOICE_FILES` in `index.html`.
- Sound effects and voice cheers each have their own on/off switch in Settings.

## Art and worlds

All images are in `assets/` as WebP:

| Folder | What |
|---|---|
| `assets/icons/<set>/` | Tile icons, 256 px, transparent: islamic, fruits, veggies, food, pets, animals, sea, balls, camping, space, ancient, treasure |
| `assets/bg/` | 18 backgrounds; each world lists the ones that match it and a level picks one at random |
| `assets/badges/` | World badges for the home map |
| `assets/ui/` | Star, trophy, stopwatch, padlock, hint, shuffle, undo, gift, ribbons |
| `store/app-icon-1024.png` | App Store / Play Store icon |

Worlds are listed in `WORLDS` in `index.html`: 12 categories, each keeping its own level. Look-alike icons are listed in `SIMILAR` so early levels use only one of each group.

## v2 gameplay

- **v1 (simple gameplay) is kept at `/v1/`** (https://roisa.github.io/app-ayah/v1/), with its own saved progress.
- 20 levels per world on a map; 1-3 stars per level; clearing level 10 unlocks the next world; level 20 completes the world.
- Board shapes (diamond, heart, frame, cross, hourglass, dome, split), a hard level every 5th and a boss every 10th.
- Special tiles: ice (match a neighbour to melt), stone (match twice), gold (+5 stars), bomb (match before 0 or lose 15 s).
- Gravity levels (9, 14, 18, 20) and goal levels (6, 11, 16: collect the shown tiles).
- Combo meter (+10 s when full), "Last pairs!" with faster music.
- Daily gift (7-day streak), Daily Puzzle (+30 stars and a sticker pack), prayer streak rewards (3/7/14/30 days).
- Sticker book: 50-star packs of 3 stickers made from the tile art; completing a world's page gives +100 stars.
