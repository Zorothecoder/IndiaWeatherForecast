import React, { useState, useEffect } from 'react';
import { Icons } from '../data/Icons';
import ForeCast from '../components/ForeCast'

const Weather = () => {
    const [zipCode, setZipCode] = useState("737101")
    const [weatherData, setWeatherData] = useState(null);
    const [location, setLocation] = useState({ lat: 27.3417, lon: 88.7553 })
    const [temperatureUnit, setTemperatureUnit] = useState("C");

    const handleTemperatureUnitChange = (unit) => {
        setTemperatureUnit(unit);
    };

    const fetchGeoLocation = async () => {
        const url = `https://api.openweathermap.org/geo/1.0/zip?zip=${zipCode},in&appid=adadb12d324891adc35281114a29fdb8`
        try {
            let data = await fetch(url)
            let locationData = await data.json()
            const latitude = locationData.lat;
            const longitude = locationData.lon;
            setLocation({ lat: latitude, lon: longitude });
            fetchData(latitude, longitude);
        } catch (error) {
            console.error(error);
        }
    }

    const fetchData = async (latitude, longitude) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=adadb12d324891adc35281114a29fdb8`
        try {
            let data = await fetch(url);
            let weatherdata = await data.json();
            setWeatherData(weatherdata)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchGeoLocation()
    }, [zipCode]);

    const onCityChange = (event) => {
        setZipCode(event.target.value)
    }

    const getCurrentTime = () => {
        const now = new Date();
        const hours = now.getHours();
        return `${hours}`;
    }

    function getCurrentDay() {
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const now = new Date();
        const day = days[now.getDay()];
        return day;
    }

    return (
        <div>
            <div className="container mt-3 d-flex" style={{ border: '2px solid white', borderRadius: '10px' }}>
                <div className="location">
                    <select name="city" id="city" onChange={onCityChange}>
                        <option value="737101">Gangtok</option>
                        <option value="560002">Bangalore</option>
                        <option value="400001">Mumbai</option>
                        <option value="110001">Delhi</option>
                        <option value="700001">Kolkata</option>
                        <option value="600001">Chennai</option>
                        <option value="530016">Visakhapatnam</option>
                        <option value="395003">Surat</option>
                        <option value="411001">Pune</option>
                        <option value="380001">Ahmedabad</option>
                        <option value="500001">Hydrebad</option>
                        <option value="302003">Jaipur</option>
                        <option value="226001">Lucknow</option>
                        <option value="452001">Indore</option>
                        <option value="160017">Chandigarh</option>
                    </select>
                </div>
                <div className="d-flex">
                    <div className="weather-icon me-5">
                        {weatherData !== null && weatherData !== undefined ? ((() => {
                            const weatherType = weatherData.weather[0].main
                            if (getCurrentTime() >= 6 && getCurrentTime() < 18) {
                                const weatherIcon = Icons.find(iconSet => iconSet.title === "Day");
                                const icon = weatherIcon.weather.find(icon => icon.name === weatherType) || weatherIcon.weather.find(icon => icon.name === "Mist");
                                return icon ? (
                                    <img src={process.env.PUBLIC_URL + '/' + icon.url} alt={icon.name} />
                                ) : (
                                    <p>Icon not found</p>
                                );
                            } else {
                                const weatherIcon = Icons.find(iconSet => iconSet.title === "Night");
                                const icon = weatherIcon.weather.find(icon => icon.name === weatherType) || weatherIcon.weather.find(icon => icon.name === "Mist");
                                return icon ? (
                                    <img src={process.env.PUBLIC_URL + '/' + icon.url} alt={icon.name} />
                                ) : (
                                    <p>Icon not found</p>
                                );
                            }
                        })()
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>

                    <div className="temperature me-3 d-flex">
                        <p>{weatherData === null || weatherData === undefined? "Loading"
                                : temperatureUnit === "C"
                                    ? `${(weatherData.main.temp - 273.15).toFixed(2)}°`
                                    : `${(((weatherData.main.temp - 273.15) * 9) / 5 + 32).toFixed(2)}°`}
                        </p>
                    </div>
                    <div className="type-box">
                        <p className={`mb-2 ${temperatureUnit === "C" ? "active" : ""}`} onClick={() => handleTemperatureUnitChange("C")}>C</p>
                        <p className={`${temperatureUnit === "F" ? "active" : ""}`} onClick={() => handleTemperatureUnitChange("F")}>F</p>
                    </div>
                    <div className="weather-details">
                        <p>{weatherData === null || weatherData === undefined ? "Loading" : weatherData.weather[0].main}</p>
                        <p>Humidity: {weatherData === null || weatherData === undefined ? "Loading" : weatherData.main.humidity}%</p>
                        <p>Wind: {weatherData === null || weatherData === undefined ? "Loading" : weatherData.wind.speed} km/hr</p>
                    </div>
                </div>
                <div className="status">
                    <h3>Weather</h3>
                    <p className="text-center">{getCurrentDay()}{getCurrentTime()}</p>
                    <p className="text-capitalize">{weatherData === null || weatherData === undefined ? "Loading" : weatherData.weather[0].description}</p>
                </div>
            </div>
            <ForeCast lat={location.lat} lon={location.lon} currentTime={getCurrentTime()} />
        </div>
    );
};

export default Weather;
