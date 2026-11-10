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
| `assets/icons/<set>/` | Tile icons, 256 px, transparent. `islamic` has 24, `fruits` has 24 |
| `assets/bg/` | Level backgrounds, rotated each level within a world |
| `assets/badges/` | World badges for the home map |
| `assets/ui/` | Star, trophy, stopwatch, padlock, coin, hint, shuffle, undo, gift, ribbons |
| `store/app-icon-1024.png` | App Store / Play Store icon |

Worlds are listed in `WORLDS` in `index.html`. Masjid and Fruit Garden are open, and each world keeps its own level. Look-alike icons (for example the three lanterns) are listed in `SIMILAR` so early levels use only one of each group. To open another world, add its icons to `assets/icons/<set>/`, list them in `ICONSETS`, and set `open:1` and its backgrounds on the world.
