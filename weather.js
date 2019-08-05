//weather api darkskyapi  https://darksky.net/dev
//skycons https://darkskyapp.github.io/skycons/

window.addEventListener("load", () => {
  var placeName;
  let long;
  let lat;
  let timedate;
  var location;
  let locationSection = document.querySelector(".weather-location");
  let weatherDescription = document.querySelector(".weather-description");
  let temperatureDegree = document.querySelector(".temp");
  let datetime = document.querySelector(".date-time");
  let temperatureSection = document.querySelector(".row2");
  const temperatureSpan = document.querySelector(".row2 span");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = "https://cors-anywhere.herokuapp.com/";

      const api = `${proxy}https://api.darksky.net/forecast/Your Api Key/${lat},${long}`;

      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);

          const { temperature, summary, icon, time } = data.currently;
          //Set DOM

          temperatureDegree.textContent = temperature;
          weatherDescription.textContent = summary;
          locationSection.textContent = data.timezone;
          //time
          timedate = timeConverter(time);
          //console.log(timedate);
          datetime.textContent = timedate;

          //C or F
          let celsius = (temperature - 32) * (5 / 9);
          //setting the icon
          setIcons(icon, document.querySelector(".weatherType"));
          //setting to C or F
          temperatureSection.addEventListener("click", () => {
            if (temperatureSpan.textContent === "°F") {
              temperatureSpan.textContent = "°C";
              temperatureDegree.textContent = Math.floor(celsius);
            } else {
              temperatureSpan.textContent = "°F";
              temperatureDegree.textContent = temperature;
            }
          });
        });
    });
  }

  function setIcons(icon, iconId) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconId, Skycons[currentIcon]);
  }

  function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes() < 10 ? "0" + a.getMinutes() : a.getMinutes();
    var sec = a.getSeconds() < 10 ? "0" + a.getSeconds() : a.getSeconds();
    var time =
      date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
    return time;
  }
});
