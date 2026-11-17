#!/usr/bin/env bash
# Put real-voice recordings from NurConnect/voice/rekam.html ("Download ZIP") into the game.
#   bash NurConnect/tools/voice/import-recordings.sh ~/Downloads/nurconnect-rekaman-20261117-1030.zip
#   DRY_RUN=1 bash NurConnect/tools/voice/import-recordings.sh <zip>     # only list what would change
# Each take NurConnect/voice/<en|id>/<key>.wav becomes the game's NurConnect/voice/<en|id>/<key>.mp3 (replacing the
# AI clip), and NurConnect/voice/voice.js marks it as a real recording (take 1, 2, …). Needs ffmpeg and python3.
set -euo pipefail
NC="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
ZIP="${1:-}"
[ -n "$ZIP" ] && [ -f "$ZIP" ] || { echo "usage: bash NurConnect/tools/voice/import-recordings.sh <nurconnect-rekaman-….zip>" >&2; exit 2; }
command -v ffmpeg >/dev/null || { echo "ffmpeg is needed (Cloud Shell: sudo apt-get install -y ffmpeg)" >&2; exit 2; }
ZIP="$(cd "$(dirname "$ZIP")" && pwd)/$(basename "$ZIP")"
TMP="$(mktemp -d)"; trap 'rm -rf "$TMP"' EXIT
python3 -I -m zipfile -e "$ZIP" "$TMP"
KEYS="$(python3 -I -c 'import json,sys;print(" ".join(json.load(open(sys.argv[1]))))' "$NC/tools/voice/lines.json")"
DONE=(); N=0
while IFS= read -r -d '' F; do
  REL="${F#"$TMP"/}"; LANG_="$(basename "$(dirname "$REL")")"; NAME="$(basename "$REL")"; KEY="${NAME%.*}"
  case "$(dirname "$REL")" in NurConnect/voice/en|NurConnect/voice/id) ;; *) echo "skip $REL"; continue ;; esac
  [[ " $KEYS " == *" $KEY "* ]] || { echo "skip $REL (not a game line)"; continue; }
  OUT="$NC/voice/$LANG_/$KEY.mp3"
  if [ -n "${DRY_RUN:-}" ]; then echo "would make voice/$LANG_/$KEY.mp3"; else
    ffmpeg -nostdin -v error -y -i "$F" -ac 1 -ar 24000 -codec:a libmp3lame -b:a 64k "$OUT"; echo "made voice/$LANG_/$KEY.mp3"; fi
  DONE+=("$LANG_/$KEY.mp3"); N=$((N+1))
done < <(find "$TMP/NurConnect" -type f \( -name '*.wav' -o -name '*.m4a' -o -name '*.webm' -o -name '*.ogg' -o -name '*.mp3' \) -print0 2>/dev/null | sort -z)
[ "$N" -gt 0 ] || { echo "no recordings found in $ZIP"; exit 1; }
[ -n "${DRY_RUN:-}" ] || python3 -I - "$NC/voice/voice.js" "${DONE[@]}" <<'PY'
import json, re, sys
p = sys.argv[1]; s = open(p, encoding="utf-8").read()
v = json.loads(re.search(r"window\.NC_VOICE=(\{.*\});", s, re.S).group(1)); h = v.setdefault("human", {})
for f in sys.argv[2:]: h[f] = h.get(f, 0) + 1
open(p, "w", encoding="utf-8").write(re.sub(r"window\.NC_VOICE=\{.*\};", "window.NC_VOICE=" + json.dumps(v, ensure_ascii=False) + ";", s, flags=re.S))
print("voice.js:", len(h), "real recordings")
PY
echo "✅ $N recording(s) ${DRY_RUN:+(dry run) }in place. Commit NurConnect/voice and publish."
