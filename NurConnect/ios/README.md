# Nur Connect iOS: release checklist items

## 1. App icon
Download `NurConnect/store/app-icon-1024.png` (1024 × 1024 PNG, no transparency):
https://roisa.github.io/app-ayah/NurConnect/store/app-icon-1024.png
In Xcode: `Assets` → `AppIcon` → drag the file into the 1024 × 1024 slot ("Any Appearance").

## 2. Prayer-time notifications (native feature for Guideline 4.2)
1. Drag `PrayerReminders.swift` (this folder) into the Xcode project (tick "Copy items if needed" and the app target).
2. Where the `WKWebViewConfiguration` is created, before the `WKWebView`, add:
   `PrayerReminders.install(on: configuration)`
3. Make sure the app loads the latest game (its `index.html` sends the schedule to the handler `nurPrayer`).
4. Run on an iPhone, allow notifications. Settings → change the city → the schedule follows.
Test quickly: in Settings pick a city whose next prayer is a few minutes away, then lock the phone.

## 3. macOS / visionOS
For 1.0, remove them: target → General → Supported Destinations → select "Mac (Designed for iPad)" / "Mac Catalyst" /
"Apple Vision" → minus. If you keep the Mac: Signing & Capabilities → App Sandbox → tick "Outgoing Connections (Client)".
