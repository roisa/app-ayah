#!/usr/bin/env python3
"""Make rekam-data.js (the clip list for NurConnect/voice/rekam.html) from lines.json + the 'when' column of voice/README.md.
Run after changing lines.json:  python3 NurConnect/tools/voice/build-rekam-data.py"""
import json, os, re
HERE = os.path.dirname(os.path.abspath(__file__)); NC = os.path.dirname(os.path.dirname(HERE))
L = json.load(open(os.path.join(HERE, "lines.json"), encoding="utf-8"))
when = {}
for l in open(os.path.join(NC, "voice", "README.md"), encoding="utf-8"):
    m = re.match(r"\| (\S+)\.mp3 \| ([^|]+) \|", l)
    if m: when[m.group(1)] = m.group(2).strip()
def grp(k):
    if k.startswith("pray") or k == "taqabbal": return "Doa & salat"
    if k in ("masya1", "masya2", "subhan", "barak", "akbar", "win"): return "Sorakan"
    if k in ("bism", "bismillah", "shuffle"): return "Mulai"
    return "Waktu & ulangi"
def show(t):
    if isinstance(t, str): return t
    return " ".join(x[3:].split("|")[1] if x.startswith("ar:") else x for x in t)
items = [{"id": lang + "-" + k, "s": lang, "g": grp(k), "t": show(t[i]), "h": when.get(k, ""), "l": lang, "k": "line",
          "f": lang + "/" + k + ".mp3", "key": lang + "|" + k} for lang, i in (("en", 0), ("id", 1)) for k, t in L.items()]
secs = [{"s": "en", "id": "Bahasa Inggris", "en": "English", "ic": "🇬🇧"}, {"s": "id", "id": "Bahasa Indonesia", "en": "Indonesian", "ic": "🇮🇩"}]
open(os.path.join(HERE, "rekam-data.js"), "w", encoding="utf-8").write(
    "/* Clip list for NurConnect/voice/rekam.html, made from lines.json by tools/voice/build-rekam-data.py; do not edit. */\n"
    "window.REKAM_SECTIONS=" + json.dumps(secs, ensure_ascii=False) + ";\nwindow.REKAM=" + json.dumps(items, ensure_ascii=False, indent=0) + ";\n")
print(len(items), "clips")
