import requests
import json
import os
from datetime import datetime
from plyer import notification

# Windows dosya yollarına uygun path
LOG_FILE_PATH = os.path.join("..", "data", "weather_logs.json")

def fetch_weather_data(lat: float, lon: float) -> dict:
    """Open-Meteo API'sinden anlık hava durumu verisini çeker."""
    url = f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current_weather=true"
    
    try:
        response = requests.get(url, timeout=5)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"[-] API bağlantı hatası: {e}")
        return None

def save_to_json(data: dict):
    """Çekilen veriyi zaman damgasıyla birlikte JSON dosyasına ekler."""
    os.makedirs(os.path.dirname(LOG_FILE_PATH), exist_ok=True)
    
    log_entry = {
        "timestamp": datetime.now().isoformat(),
        "temperature_celsius": data['current_weather']['temperature'],
        "windspeed_kmh": data['current_weather']['windspeed']
    }

    if os.path.exists(LOG_FILE_PATH):
        with open(LOG_FILE_PATH, 'r', encoding='utf-8') as file:
            try:
                logs = json.load(file)
            except json.JSONDecodeError:
                logs = []
    else:
        logs = []

    logs.append(log_entry)

    with open(LOG_FILE_PATH, 'w', encoding='utf-8') as file:
        json.dump(logs, file, indent=4)
        print("[+] Veri başarıyla JSON dosyasına loglandı.")

def send_windows_notification(title: str, message: str):
    """Windows 11 bildirim merkezine native (yerel) bildirim gönderir."""
    try:
        notification.notify(
            title=title,
            message=message,
            app_name='Weather Pulse',
            timeout=10  # Bildirimin ekranda kalma süresi (saniye)
        )
        print("[+] Windows 11 bildirimi başarıyla gönderildi.")
    except Exception as e:
        print(f"[-] Bildirim gönderilirken bir hata oluştu: {e}")

def main():
    print("[*] Hava durumu servisi başlatılıyor...")
    
    # İzmir koordinatları
    IZMIR_LAT = 38.4127
    IZMIR_LON = 27.1384

    weather_data = fetch_weather_data(IZMIR_LAT, IZMIR_LON)

    if weather_data:
        temp = weather_data['current_weather']['temperature']
        wind = weather_data['current_weather']['windspeed']
        
        save_to_json(weather_data)
        
        notification_title = "İzmir Hava Durumu"
        notification_body = f"Sıcaklık: {temp}°C\nRüzgar: {wind} km/h"
        send_windows_notification(notification_title, notification_body)

if __name__ == "__main__":
    main()