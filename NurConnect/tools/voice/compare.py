#!/usr/bin/env python3
"""Nur Connect: make short voice samples with Google Cloud Text-to-Speech so the owner can pick a voice.

Each candidate voice says the same cheers in English and Indonesian. Output:
  NurConnect/voice/compare/<Voice>-en.mp3, <Voice>-id.mp3 and compare.json (read by NurConnect/voice/compare.html)

Auth: run in Google Cloud Shell (uses the signed-in gcloud account), or set GOOGLE_TTS_API_KEY.
Usage: python3 NurConnect/tools/voice/compare.py                -> samples of every candidate voice
       python3 NurConnect/tools/voice/compare.py lines Leda     -> every game clip (lines.json) with one voice, into
                                                                   NurConnect/voice/<en|id>/<key>.mp3. Existing files are
                                                                   kept (e.g. real recordings) unless FORCE=1.
"""
import base64, json, os, subprocess, time, urllib.request, urllib.error

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))  # NurConnect/
OUT = os.path.join(ROOT, "voice", "compare")
KEY = os.environ.get("GOOGLE_TTS_API_KEY", "").strip()

# Chirp 3 HD voices (same family as Baby Mo's Algenib). Google's own one-word description in brackets.
VOICES = [
    ("Algenib", "male", "Baby Mo's voice (gravelly)"),
    ("Puck", "male", "upbeat"),
    ("Fenrir", "male", "excitable"),
    ("Achird", "male", "friendly"),
    ("Sadachbia", "male", "lively"),
    ("Leda", "female", "youthful"),
    ("Laomedeia", "female", "upbeat"),
    ("Autonoe", "female", "bright"),
    ("Zephyr", "female", "bright"),
    ("Aoede", "female", "breezy"),
    ("Sulafat", "female", "warm"),
]
LINES = {
    "en": ["Bismillah! Let's go!", "Masha Allah! Great!", "Subhanallah! Amazing!", "Alhamdulillah! Well done!",
           "It is time to pray Dhuhr."],
    "id": ["Bismillah! Ayo mulai!", "Masya Allah! Hebat!", "Subhanallah! Keren!", "Alhamdulillah! Berhasil!",
           "Waktunya sholat Dzuhur."],
}
LANG = {"en": "en-US", "id": "id-ID", "ar": "ar-XA"}

def gcloud(*a):
    try: return subprocess.run(["gcloud", *a], capture_output=True, text=True, timeout=60).stdout.strip()
    except Exception: return ""

TOKEN = "" if KEY else gcloud("auth", "print-access-token")
PROJECT = os.environ.get("GOOGLE_CLOUD_PROJECT", "") or os.environ.get("DEVSHELL_PROJECT_ID", "") or (gcloud("config", "get-value", "project") if TOKEN else "")

def synth(text, lang, voice):
    url = "https://texttospeech.googleapis.com/v1/text:synthesize"
    headers = {"Content-Type": "application/json"}
    if KEY: url += "?key=" + KEY
    elif TOKEN:
        headers["Authorization"] = "Bearer " + TOKEN
        if PROJECT: headers["x-goog-user-project"] = PROJECT
    else: raise SystemExit("No Google sign-in: run this in Google Cloud Shell, or set GOOGLE_TTS_API_KEY.")
    body = {"input": {"text": text}, "voice": {"languageCode": LANG[lang], "name": f"{LANG[lang]}-Chirp3-HD-{voice}"},
            "audioConfig": {"audioEncoding": "MP3", "sampleRateHertz": 24000}}
    req = urllib.request.Request(url, data=json.dumps(body).encode(), headers=headers)
    for attempt in range(5):
        try:
            return base64.b64decode(json.load(urllib.request.urlopen(req, timeout=40))["audioContent"])
        except urllib.error.HTTPError as e:
            msg = e.read().decode(errors="replace")[:300]
            if e.code in (403, 429, 500, 503) and attempt < 4:
                print(f"   …retrying ({e.code})", flush=True); time.sleep(15 if e.code == 403 else 2 ** attempt); continue
            raise SystemExit(f"HTTP {e.code}: {msg}")

def main():
    os.makedirs(OUT, exist_ok=True)
    out = []
    for name, gender, desc in VOICES:
        row = {"voice": name, "gender": gender, "desc": desc, "files": {}}
        for lang in ("en", "id"):
            try:
                audio = b"".join(synth(t, lang, name) for t in LINES[lang])
            except SystemExit as e:
                print("skip", name, lang, str(e)[:120]); continue
            f = f"{name}-{lang}.mp3"
            open(os.path.join(OUT, f), "wb").write(audio)
            row["files"][lang] = f
            print("sample", name, lang, flush=True)
        if row["files"]: out.append(row)
    json.dump({"lines": LINES, "voices": out}, open(os.path.join(OUT, "compare.json"), "w"), ensure_ascii=False, indent=1)
    print(f"done: {len(out)} voices in {OUT}")

def lines(voice):
    global HUMAN
    try:
        import re
        HUMAN = json.loads(re.search(r"window\.NC_VOICE=(\{.*\});", open(os.path.join(ROOT, "voice", "voice.js"), encoding="utf-8").read(), re.S).group(1)).get("human", {})
    except Exception:
        HUMAN = {}
    data = json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "lines.json"), encoding="utf-8"))
    global ONLY
    ONLY = set(x for x in os.environ.get("ONLY", "").split(",") if x)
    made = kept = 0
    for lang, i in (("en", 0), ("id", 1)):
        d = os.path.join(ROOT, "voice", lang); os.makedirs(d, exist_ok=True)
        for key, texts in data.items():
            f = os.path.join(d, key + ".mp3")
            redo = os.environ.get("FORCE") == "1" or key in ONLY
            if os.path.exists(f) and (not redo or (lang + "/" + key + ".mp3") in HUMAN):
                kept += 1; continue
            if ONLY and key not in ONLY:
                kept += 1; continue
            parts = texts[i] if isinstance(texts[i], list) else [texts[i]]
            # "ar:<arabic>|<latin>" parts are spoken by the same voice in Arabic, so the Arabic words sound right
            audio = b"".join(synth(x[3:].split("|")[0], "ar", voice) if x.startswith("ar:") else synth(x, lang, voice) for x in parts)
            open(f, "wb").write(audio); made += 1
            print("clip", lang, key, "-", texts[i], flush=True)
    vj = os.path.join(ROOT, "voice", "voice.js"); human = {}
    if os.path.exists(vj):
        import re
        m = re.search(r"window\.NC_VOICE=(\{.*\});", open(vj, encoding="utf-8").read(), re.S)
        if m: human = json.loads(m.group(1)).get("human", {})
    open(vj, "w", encoding="utf-8").write("/* which voice the game clips use; \"human\" lists the clips replaced by a real recording "
        "(file: take number). Updated by tools/voice/import-recordings.sh */\nwindow.NC_VOICE=" + json.dumps({"voice": voice, "human": human}) + ";\n")
    print(f"done: {made} clips made with {voice}, {kept} existing kept")

if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1 and sys.argv[1] == "lines":
        lines(sys.argv[2] if len(sys.argv) > 2 else "Leda")
    else:
        main()
