#!/usr/bin/env bash
# Nur Connect voice, run in Google Cloud Shell (https://shell.cloud.google.com):
#   bash NurConnect/tools/voice/cloudshell.sh compare       -> samples of 11 voices, pushes a nc-voice-compare-… branch
#   bash NurConnect/tools/voice/cloudshell.sh lines Leda    -> all 38 game clips (19 EN + 19 ID) with that voice,
#                                                             pushes a nc-voice-clips-… branch
#   bash NurConnect/tools/voice/cloudshell.sh lines Leda barak  -> remake only those lines (comma-separated keys)
set -euo pipefail
MODE="${1:-compare}"
echo "▶ Project: $(gcloud config get-value project 2>/dev/null)"
gcloud services enable texttospeech.googleapis.com >/dev/null
command -v ffmpeg >/dev/null || { echo "▶ Installing ffmpeg (to trim and join the clips)…"; sudo apt-get install -y -qq ffmpeg >/dev/null; }
git fetch -q origin && git checkout -q "${BASE:-claude/gifted-planck-szcayq}" && git pull -q
LOGIN="$(gh api user -q .login 2>/dev/null || echo mogames)"; UID_="$(gh api user -q .id 2>/dev/null || echo 0)"
G=(-c user.name="$LOGIN" -c user.email="${UID_}+${LOGIN}@users.noreply.github.com")
case "$MODE" in
  compare)
    python3 NurConnect/tools/voice/compare.py
    BR="nc-voice-compare-$(date +%Y%m%d-%H%M)"; git checkout -q -b "$BR"
    git "${G[@]}" add NurConnect/voice/compare && git "${G[@]}" commit -q -m "Nur Connect voice: samples to choose a voice"
    ;;
  lines)
    V="${2:-Leda}"
    ONLY="${3:-}" python3 NurConnect/tools/voice/compare.py lines "$V"
    BR="nc-voice-clips-$(date +%Y%m%d-%H%M)"; git checkout -q -b "$BR"
    git "${G[@]}" add NurConnect/voice/en NurConnect/voice/id NurConnect/voice/voice.js && git "${G[@]}" commit -q -m "Nur Connect voice: game clips with $V"
    ;;
  *) echo "unknown mode: $MODE (use: compare, lines <Voice>)"; exit 1 ;;
esac
git push -q -u origin "$BR"
echo ""
echo "✅ Done — pushed branch: $BR"
echo "   Tell Claude: \"pushed $BR\""
