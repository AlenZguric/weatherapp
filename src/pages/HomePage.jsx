import React, { useEffect, useRef, useState } from "react";
import CityListWeather from "../components/main/CityListWeather";
import Greeting from "../components/header/Greeting";
import TypeText from "../utils/TypeText";

import WeatherPicture from "../assets/images/background_img/light-mode-pict.jpg";
import "../assets/styles/pages/HomePage.css";
const HomePage = () => {
  const [showSecondText, setShowSecondText] = useState(false);
  const cityListWeatherRef = useRef(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSecondText(true);
    }, 2500);

    return () => clearTimeout(timeout);
  }, []);

  const scrollToCityListWeather = () => {
    cityListWeatherRef.current.scrollIntoView({ bahavior: "smooth" });
  };

  return (
    <section>
      <div className="homePage">
        <article>
          <div className="hero-group">
            <div className="left-side">
              <div className="title">
                <Greeting />
                <div className="type-text">
                  <TypeText
                    text={"Check the weather in your favorite cities!"}
                    delay={40}
                    initialDelay={1500}
                    element="h1"
                  />
                  <button onClick={scrollToCityListWeather}>
                    Scroll to City List Weather
                  </button>

                  {showSecondText && (
                    <TypeText
                      text={"Weather forecast"}
                      delay={40}
                      initialDelay={4000}
                      element="h2"
                    />
                  )}
                  <h3>
                    by:
                    <a
                      href="http://www.openweathermap.org/api"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      OpenWeatherMap
                    </a>
                    API's
                  </h3>
                </div>
              </div>
            </div>
            <div className="right-side">
              <img src={WeatherPicture} alt="weather_image" />
            </div>
          </div>
        </article>
        <article>
          <div className="city-weather" ref={cityListWeatherRef}>
            <CityListWeather />
          </div>
        </article>
      </div>
    </section>
  );
};

export default HomePage;
