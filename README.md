# WeatherNow - Modern Weather Web App

**WeatherNow** is a clean, dynamic, and user-friendly weather app built with **Flask** on the backend and **JavaScript + OpenWeatherMap API** on the frontend. It allows users to view the **current weather** and **5-day forecast** for any city in the world — all with dynamic visual changes based on weather conditions.

## Features

- **Search weather by city name**
- **Current weather display** (temperature, conditions, humidity, wind)
- **5-day forecast**
- **Responsive design for all screen sizes**
- **Dynamic styling** based on weather (e.g., rainy or sunny background)
- **Clean, readable, and extendable codebase**

## Technologies Used

- **Python 3**
- **Flask**
- **HTML5 / CSS3 / JavaScript**
- **OpenWeatherMap API**
- **Bootstrap** (if used)
- **Git & GitHub**

## Installation

```bash
git clone https://github.com/your-username/weather-app.git
cd weather-app
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Create a `.env` file and add your OpenWeatherMap API key:

```
API_KEY=your_personal_api_key
```

Then run the app:

```bash
flask run
```

## Screenshots (To Be Added)

- [ ] Screenshot of sunny day UI  
- [ ] Screenshot of rainy night UI

## Roadmap

- [ ] Add location auto-detection with Geolocation
- [ ] Show UV index and air quality
- [ ] Multilingual support (e.g., English, Persian, etc.)
- [ ] Save and view recent searches

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.
