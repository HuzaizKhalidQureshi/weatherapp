import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");

  const API_KEY = "4b0faadef526a75733aa6b4f367c1508";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios
        .get(url)
        .then((response) => {
          setData(response.data);
          setError("");
          setBackgroundImage(getBackgroundImage(response.data.weather[0].id));
        })
        .catch((error) => {
          console.log(error);
          setError("Invalid city name.");
        });
      setLocation("");
      setData("");
    }
  };

  const getBackgroundImage = (weatherId) => {
    // if (weatherId >= 200 && weatherId < 300) {
    //   // thunderstorm
    //   return "https://source.unsplash.com/1600x900/?thunderstorm";
    // } else if (weatherId >= 300 && weatherId < 400) {
    //   // drizzle
    //   return "https://source.unsplash.com/1600x900/?drizzle";
    // }
    if (weatherId >= 500 && weatherId < 600) {
      // rain
      return "https://static.india.com/wp-content/uploads/2021/08/Rain-alert-in-maharashtra-Weather-forecast-in-maharashtra-Heavy-rains-in-next-2-to-4-days-in-the-state-Rainfall-is-likely-to-be-heavy-in-Marathwada-Konkan-and-Central-Maharashtra.jpg  ";
    }
    // } else if (weatherId >= 600 && weatherId < 700) {
    //   // snow
    //   return "https://source.unsplash.com/1600x900/?snow";
    // } else if (weatherId >= 700 && weatherId < 800) {
    //   // atmosphere
    //   return "https://source.unsplash.com/1600x900/?fog,mist,smoke,haze";
    // }
    else if (weatherId === 800) {
      // clear
      return "https://blog.joffeemergencyservices.com/hubfs/maxresdefault.jpg";
    } else if (weatherId > 800) {
      // clouds
      return "https://t4.ftcdn.net/jpg/05/19/21/73/360_F_519217384_tFwN8gAbpr4BKegQPiDcGpFp1m9MYzdf.jpg";
    } else if (weatherId === 711 || weatherId === 721) {
      // smoke or haze
      return "https://th.bing.com/th/id/R.ae09e52be513a66f97010b5d135df775?rik=KdQE2ke8nwD4gQ&riu=http%3a%2f%2fg4.img-dpreview.com%2f167F6D02F48647F3A28DB50CC41916CD.jpg&ehk=P%2b23jO95i%2bfGJGBqQlQ%2fa%2fqegASIZ1JfmBEWYRlw0Y8%3d&risl=&pid=ImgRaw&r=0";
    } else {
      return "https://www.pixelstalk.net/wp-content/uploads/2016/07/Weather-Photo.jpg";
    }
  };

  useEffect(() => {
    setBackgroundImage(getBackgroundImage(data.weather?.[0].id));
  }, [data]);

  return (
    <div
      className="app"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        zIndex: -3,
      }}
    >
      <div className="search">
        <input
          value={location}
          onChange={(event) => {
            setLocation(event.target.value);
          }}
          onKeyDown={searchLocation}
          placeholder="Enter Your Location..."
          type="text"
          style={{
            zIndex: 1,
          }}
        />
      </div>

      <div className="container">
        {error && <div className="error">{error}</div>}
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
        {data.name != undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()}°C</p>
              ) : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? (
                <p className="bold">{data.main.temp.toFixed()}%</p>
              ) : null}
              <p>Himidity</p>
            </div>
            <div className="wind">
              {data.wind ? (
                <p className="bold">{data.wind.speed.toFixed()}MPH</p>
              ) : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
