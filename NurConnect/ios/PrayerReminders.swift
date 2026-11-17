// PrayerReminders.swift — Nur Connect
//
// Local notifications at each prayer time. The game (index.html) computes the prayer times for the city chosen in
// Settings and, inside this app, sends the next 7 days to the native layer through the message handler "nurPrayer":
//   { items: [{ id, at (ms since 1970), title, body }], lang, city }
// This class schedules one notification per prayer (replacing the previous schedule each time the game sends one:
// at launch, after Settings change, and whenever the app comes back to the front).
//
// Setup (one line): where the WKWebViewConfiguration is created, before the WKWebView is made:
//     PrayerReminders.install(on: configuration)
// No location permission is needed. The notification permission is asked the first time a schedule arrives.

import Foundation
import UserNotifications
import WebKit

final class PrayerReminders: NSObject, WKScriptMessageHandler {
    static let shared = PrayerReminders()
    static let handlerName = "nurPrayer"
    private let prefix = "nc-pray-"

    static func install(on configuration: WKWebViewConfiguration) {
        configuration.userContentController.add(shared, name: handlerName)
    }

    private struct Item {
        let id: String, date: Date, title: String, body: String
    }

    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        guard message.name == Self.handlerName,
              let body = message.body as? [String: Any],
              let raw = body["items"] as? [[String: Any]] else { return }
        let now = Date()
        let items: [Item] = raw.compactMap { d -> Item? in
            guard let id = d["id"] as? String, id.hasPrefix(prefix),
                  let at = (d["at"] as? NSNumber)?.doubleValue,
                  let title = d["title"] as? String,
                  let text = d["body"] as? String else { return nil }
            return Item(id: id, date: Date(timeIntervalSince1970: at / 1000), title: title, body: text)
        }
        .filter { $0.date > now }
        .sorted { $0.date < $1.date }
        schedule(Array(items.prefix(60)))   // iOS keeps at most 64 pending notifications per app
    }

    private func schedule(_ items: [Item]) {
        let center = UNUserNotificationCenter.current()
        center.requestAuthorization(options: [.alert, .sound]) { granted, _ in
            guard granted else { return }
            center.getPendingNotificationRequests { pending in
                let old = pending.map(\.identifier).filter { $0.hasPrefix(self.prefix) }
                center.removePendingNotificationRequests(withIdentifiers: old)
                for item in items {
                    let content = UNMutableNotificationContent()
                    content.title = item.title
                    content.body = item.body
                    content.sound = .default
                    let parts = Calendar.current.dateComponents([.year, .month, .day, .hour, .minute], from: item.date)
                    let trigger = UNCalendarNotificationTrigger(dateMatching: parts, repeats: false)
                    center.add(UNNotificationRequest(identifier: item.id, content: content, trigger: trigger))
                }
            }
        }
    }
}
