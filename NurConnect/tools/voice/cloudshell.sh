#!/usr/bin/env bash
# Nur Connect voice, run in Google Cloud Shell (https://shell.cloud.google.com):
#   bash NurConnect/tools/voice/cloudshell.sh compare   -> samples of 11 voices, pushes a nc-voice-compare-… branch
set -euo pipefail
MODE="${1:-compare}"
echo "▶ Project: $(gcloud config get-value project 2>/dev/null)"
gcloud services enable texttospeech.googleapis.com >/dev/null
git fetch -q origin && git checkout -q "${BASE:-claude/gifted-planck-szcayq}" && git pull -q
LOGIN="$(gh api user -q .login 2>/dev/null || echo mogames)"; UID_="$(gh api user -q .id 2>/dev/null || echo 0)"
G=(-c user.name="$LOGIN" -c user.email="${UID_}+${LOGIN}@users.noreply.github.com")
case "$MODE" in
  compare)
    python3 NurConnect/tools/voice/compare.py
    BR="nc-voice-compare-$(date +%Y%m%d-%H%M)"; git checkout -q -b "$BR"
    git "${G[@]}" add NurConnect/voice/compare && git "${G[@]}" commit -q -m "Nur Connect voice: samples to choose a voice"
    ;;
  *) echo "unknown mode: $MODE (use: compare)"; exit 1 ;;
esac
git push -q -u origin "$BR"
echo ""
echo "✅ Done — pushed branch: $BR"
echo "   Tell Claude: \"pushed $BR\""
