from weather_pulse.api.open_meteo import fetch_weather_data
from weather_pulse.config import DEFAULT_LATITUDE, DEFAULT_LOCATION_NAME, DEFAULT_LONGITUDE
from weather_pulse.notify.desktop import send_windows_notification
from weather_pulse.storage.json_log import save_to_json


def main():
    print("[*] Hava durumu servisi başlatılıyor...")

    weather_data = fetch_weather_data(DEFAULT_LATITUDE, DEFAULT_LONGITUDE)

    if weather_data:
        temp = weather_data['current_weather']['temperature']
        wind = weather_data['current_weather']['windspeed']

        save_to_json(weather_data)

        notification_title = f"{DEFAULT_LOCATION_NAME} Hava Durumu"
        notification_body = f"Sıcaklık: {temp}°C\nRüzgar: {wind} km/h"
        send_windows_notification(notification_title, notification_body)


if __name__ == "__main__":
    main()
