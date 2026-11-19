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

## 3. Bottom buttons cut off (pause, undo, shuffle, hint, settings)
The web view must not add its own safe-area insets: the game already pads itself with `env(safe-area-inset-*)`
(its viewport has `viewport-fit=cover`). Where the WKWebView is created:
```swift
webView.scrollView.contentInsetAdjustmentBehavior = .never   // the page handles the notch and home bar itself
webView.scrollView.isScrollEnabled = false                     // the game is one screen; no rubber-band scrolling
webView.scrollView.bounces = false
```
and pin the web view to the screen edges (superview), not to the safe area.

## 4. macOS / visionOS
For 1.0, remove them: target → General → Supported Destinations → select "Mac (Designed for iPad)" / "Mac Catalyst" /
"Apple Vision" → minus. If you keep the Mac: Signing & Capabilities → App Sandbox → tick "Outgoing Connections (Client)".
