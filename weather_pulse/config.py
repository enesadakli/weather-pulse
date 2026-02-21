from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
LOG_FILE_PATH = BASE_DIR / "data" / "weather_logs.json"

DEFAULT_LATITUDE = 38.4127
DEFAULT_LONGITUDE = 27.1384
DEFAULT_LOCATION_NAME = "İzmir"

NOTIFICATION_APP_NAME = "Weather Pulse"
NOTIFICATION_TIMEOUT_SECONDS = 10
