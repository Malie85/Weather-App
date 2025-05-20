from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import requests
import os
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app)
load_dotenv()

# you can import your API key in .env file in main directory of project
API_KEY = os.getenv("kkey", "YOUR_API_KEY_HERE")

# this print is for make sure your API key is correctly imported
print("OpenWeatherMap API_KEY:",API_KEY)
BASE_URL = "https://api.openweathermap.org/data/2.5"

# adding index.html for main route (for localhost is "localhost:5000")
@app.route("/")
def index():
    return render_template("index.html")

# adding a route for getting data
@app.route("/weather")
def get_weather():
    city = request.args.get("city")
    if not city:
        return jsonify({"error": "No city provided"}), 400

    # calling up the current weather conditions
    weather_url = f"{BASE_URL}/weather"
    params = {"q": city, "appid": API_KEY, "units": "metric"}
    res_current = requests.get(weather_url, params=params)
    data_current = res_current.json()

    # if city is not found
    if res_current.status_code != 200:
       return jsonify({
           "error": 
           data_current.get("message", "error in fetching data")
       }), res_current.status_code
    

    # calling the 5-day forecast
    forecast_url = f"{BASE_URL}/forecast"
    res_forecast = requests.get(forecast_url, params=params)
    data_forecast = res_forecast.json()

    # extract only one data per day (for 5-day)
    forecast_list = []
    seen_dates = set()
    for entry in data_forecast.get("list", []):
        date_txt = entry["dt_txt"].split(" ")[0]
        if date_txt not in seen_dates and len(forecast_list) < 5:
            seen_dates.add(date_txt)
            forecast_list.append({
                "date": date_txt,
                "temp": entry["main"]["temp"],
                "wind": entry["wind"]["speed"],
                "weather": entry["weather"][0]["main"]
            })

    result = {
        "current": {
            "temp": data_current["main"]["temp"],
            "wind": data_current["wind"]["speed"],
            "weather": data_current["weather"][0]["main"]
        },
        "forecast": forecast_list,

        "bgweather": data_current["weather"][0]["main"]
    }
    return jsonify(result)



if __name__ == "__main__":
    app.run(debug=True)