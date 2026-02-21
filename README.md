# Weather Pulse: Automated City Data Tracker

A lightweight, automated Python pipeline designed to fetch, parse, and log real-time meteorological data using public APIs. This project demonstrates API handling, data persistence (JSON logging), and native OS integration.

##  Key Features
* **Automated Data Retrieval:** Integrates with the Open-Meteo API to extract real-time JSON payloads.
* **Data Persistence:** Implements robust file handling to structure and append historical data logs with ISO 8601 timestamps.
* **OS-Level Integration:** Utilizes the `plyer` library to trigger native Windows desktop notifications.
* **Fault Tolerance:** Includes `try-except` blocks for HTTP request timeouts and JSON decoding errors.

## 🛠️ Tech Stack
* **Language:** Python 3.x
* **Libraries:** `requests`, `plyer`, `json`, `os`, `datetime`
* **Target OS:** Tested and optimized for Windows environments.

## Installation & Usage

1. Clone the repository:
   ```bash
   git clone [https://github.com/enesadakli/weather-pulse.git](https://github.com/enesadakli/weather-pulse.git)