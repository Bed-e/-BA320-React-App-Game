import Canvas from "./Components/Canvas";
import ToggleFullscreenButton from "./Components/ToggleFullscreenButton";
import "./App.css";
import TopTitle from "./Components/TopTitle";
import Timer from "./Components/Timer";
import { useState, useEffect } from "react";
import Description from "./Components/Description";

function App() {
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [location, setLocation] = useState(null); // Initialize as null
  const [weather, setWeather] = useState("clouds");
  const [nightMode, setNightMode] = useState(false);
  const [city, setCity] = useState("nowhere");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          };
          setLocation(coords);
          console.log("Coordinates: ", coords); // Log coordinates
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    const currentHour = new Date().getHours();
    setNightMode(currentHour > 20 || currentHour < 8);
  }, []);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setTime((prevTime) => prevTime + 0.01);
      }, 10);
      return () => clearInterval(interval);
    } else return;
  }, [isPlaying]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const loc = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          };
          setLocation(loc);
          fetchWeather(loc); // Fetch weather data after setting the location
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  const fetchWeather = async (loc) => {
    console.log("hello");
    const lat = loc.lat;
    const lon = loc.lon;
    const apiKey = "e9eb609675cb8f6049e4a7eafd99097c"; // Replace with your actual API key
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    //console.log(url);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const data = await response.json();
      //console.log(data);
      setCity(data.name);
      const weatherid = data.weather[0].id;
      let weatherType = "";
      //console.log(weatherid);

      if (weatherid >= 200 && weatherid < 250) {
        //ids for thunderstorm
        weatherType = "storm";
      } else if (weatherid >= 300 && weatherid < 330) {
        //ids for Drizzle
        weatherType = "drizzle";
      } else if (weatherid >= 500 && weatherid < 540) {
        //ids for rain
        weatherType = "rain";
      } else if (weatherid >= 600 && weatherid < 630) {
        //ids for snow
        weatherType = "snow";
      } else if (weatherid >= 700 && weatherid < 790) {
        //ids for Atmosphere
        weatherType = "fog";
      } else if (weatherid == 800) {
        //id for clear
        weatherType = "clear";
      } else if (weatherid > 800 && weatherid < 810) {
        weatherType = "clouds";
      }
      //console.log(weatherType);

      setWeather(weatherType); // Set the weather data in state
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <div className={` body ${weather} ${nightMode ? "night-mode" : ""}`}>
      <TopTitle />
      <Timer time={time} isPlaying={isPlaying} />
      <Canvas
        weather={weather}
        setTime={setTime}
        setIsPlaying={setIsPlaying}
        isPlaying={isPlaying}
      />
      <ToggleFullscreenButton />
      <Description weather={weather} city={city} />
    </div>
  );
}

export default App;
