from plyer import notification

from weather_pulse.config import NOTIFICATION_APP_NAME, NOTIFICATION_TIMEOUT_SECONDS


def send_windows_notification(title: str, message: str):
    """Windows 11 bildirim merkezine native (yerel) bildirim gönderir."""
    try:
        notification.notify(
            title=title,
            message=message,
            app_name=NOTIFICATION_APP_NAME,
            timeout=NOTIFICATION_TIMEOUT_SECONDS,
        )
        print("[+] Windows 11 bildirimi başarıyla gönderildi.")
    except Exception as e:
        print(f"[-] Bildirim gönderilirken bir hata oluştu: {e}")
