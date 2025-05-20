document.getElementById("getWeatherBtn").addEventListener("click", () => {
  var body = document.getElementById("weather-body");
  var icon = document.getElementById("weather-icon");
  var content = document.getElementById("content");
  var rres = document.getElementById("result");

   // taking city from index.html
  const city = document.getElementById("cityInput").value.trim();
  if (!city) {
    alert("please enter your city");
    return;
  }


  // error handling
  fetch(`/weather?city=${encodeURIComponent(city)}`)
    .then((res) => {
      if (!res.ok) {
        return res.json().then(errData => {
          throw new Error(errData.error || "error in getting data");
        });
      }
      return res.json();
    })
      
    .then((data) => {
      if (data.error) {
        document.getElementById(
          "result"
        ).innerHTML = `<p style="color:red">${data.error}</p>`;
        return;
      }

      

      // current weather conditions
      const cur = data.current;
      let html = `
          <div class="weather-box">
        <h2>${city}</h2>
        <p id="degree">${cur.temp} c°</p>
        <p id="inFo1"> ${cur.weather}</p>
        <p id="inFo2">Wind Speed: ${cur.wind}m/s</p>
      </div>`;

      // 5-day forecast
      html += `<div class="weather-box-week">`;
      data.forecast.forEach((day) => {
        html += `
            <div class="weather-card">
                <div id="card-content">${day.date}</div>
                <div id="card-content-degree">${day.temp} C°</div>
                <div id="card-content">${day.weather} ${day.wind}m/s</div>
              </div>`;
      });
      html += `</div>`;

      document.getElementById("result").innerHTML = html;


      // removing body, background and icon styles for adding new styles
      body.classList.remove("sunny-bg", "cloudy-bg", "drizzle-bg", "rainy-bg", "thunderstorm-bg");
      icon.classList.remove("show");
      content.classList.remove("myshow");
      rres.classList.remove("transform-show");



      const mweather = data.bgweather;

      // adding backgroung and icon for each weather conditions
      setTimeout(() => {
        switch (mweather) {
          case "Clouds":
            body.classList.add("cloudy-bg");
            icon.style.backgroundImage = "url('/static/images/cloudy.png')";
            break;
          case "Clear":
            body.classList.add("sunny-bg");
            icon.style.backgroundImage = "url('/static/images/clear.png')";
            break;
          case "Rain":
            body.classList.add("rainy-bg");
            icon.style.backgroundImage = "url('/static/images/rainy.png')";
            break;
          case "Drizzle":
            body.classList.add("drizzle-bg");
            icon.style.backgroundImage = "url('/static/images/drizzle.png')";
            break;
          case "Thunderstorm":
            body.classList.add("thunderstorm-bg");
            icon.style.backgroundImage = "url('/static/images/thunderstorm.png')";
            break;
          case "Snow":
            body.classList.add("snow-bg");
            icon.style.backgroundImage = "url('/static/images/snow.png')";
            break;
          default:
            {};

        }

        // for adding some animations
        setTimeout(() => {
          icon.classList.add("show");
          content.classList.add("myshow");
          rres.classList.add("transform-show");

        },200);
      },100);



    })

    // error for city not found
    .catch((err) => {
      console.error(err);
      document.getElementById(
        "result"
      ).innerHTML = `<p class="error">City not found</p>`;
      body.classList.remove("sunny-bg", "cloudy-bg", "drizzle-bg", "rainy-bg", "thunderstorm-bg");
      icon.classList.remove("show");
      content.classList.remove("myshow");
      rres.classList.remove("transform-show");
      content.classList.add("myshow");
      rres.classList.add("transform-show");
    });
});
