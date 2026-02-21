import json
from datetime import datetime

from weather_pulse.config import LOG_FILE_PATH


def save_to_json(data: dict):
    """Çekilen veriyi zaman damgasıyla birlikte JSON dosyasına ekler."""
    LOG_FILE_PATH.parent.mkdir(parents=True, exist_ok=True)

    log_entry = {
        "timestamp": datetime.now().isoformat(),
        "temperature_celsius": data['current_weather']['temperature'],
        "windspeed_kmh": data['current_weather']['windspeed']
    }

    if LOG_FILE_PATH.exists():
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
