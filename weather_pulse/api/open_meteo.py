import requests


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
