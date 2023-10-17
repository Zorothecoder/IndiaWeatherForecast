import React, { useEffect, useState } from 'react'
import { Icons } from '../data/Icons';

const Forecast = ({ lat, lon }) => {
    const [foreCastData, setForeCastData] = useState([]);
    const [selectedDay, setSelectedDay] = useState(null);

    const fetchForeCast = async (latitude, longitude) => {
        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=adadb12d324891adc35281114a29fdb8`
        try {
            let data = await fetch(url);
            let forecastdata = await data.json();
            setForeCastData(forecastdata.list)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (lat && lon) {
            fetchForeCast(lat, lon);
        }
    }, [lat, lon]);

    const formatDate = (dt_txt) => {
        const date = new Date(dt_txt);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = (hours % 12) || 12;
        return ` ${formattedHours}:${minutes} ${ampm}`;
    };

    const uniqueDays = Array.from(
        new Set(foreCastData.map((element) => new Date(element.dt_txt).getDay()))
    );
    const allDaysOfWeek = [0, 1, 2, 3, 4, 5, 6];
    const missingDays = allDaysOfWeek.filter((day) => !uniqueDays.includes(day));
    uniqueDays.push(...missingDays);
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const getTemperatureAt12PM = (dayIndex) => {
        const forecastFor12PM = foreCastData.find((element) => {
            const date = new Date(element.dt_txt);
            return date.getDay() === dayIndex && date.getHours() === 12;
        });
        return forecastFor12PM ? (forecastFor12PM.main.temp - 273.15).toFixed(2) : '...';
    }

    const uniqueMainValues = new Set()
    foreCastData.forEach((element) => {
        const mainData = element.weather[0].main
        if (!uniqueMainValues.has(mainData)) {
            uniqueMainValues.add(mainData)
        }
    })

    const containerStyle = {
        border: '2px solid white',
        borderRadius: '10px',
        marginTop: '40px',
        paddingBottom: '35px'
      };

    return (
        <div className="container" style={containerStyle}>
            <h3 className="forecast-title ">Forecast</h3>
            <div className="wrapper text-center">
                {foreCastData && foreCastData.length > 0 ? (
                    foreCastData
                        .filter((element) => selectedDay === null || new Date(element.dt_txt).getDay() === selectedDay)
                        .map((element, index) => {
                            let weatherType;
                            if (selectedDay === null) {
                                weatherType = element.weather[0].main
                            } else {
                                weatherType = element.weather[0].main
                            }
                            const weatherIcon = new Date(element.dt_txt).getHours() >= 6 && new Date(element.dt_txt).getHours() < 18 ? "Day" : "Night";
                            return (
                                <div className="weather-cards text-center" key={element.dt}>
                                    <span>
                                        <p className='cards-temperature'>{element.weather[0].main}</p>
                                        <p className='cards-temperature'>{(element.main.temp - 273.15).toFixed(0)}° C</p>
                                    
                                    </span>
                                    <p>{formatDate(element.dt_txt)}</p>
                                    {(() => {
                                        const iconSet = Icons.find((iconSet) => iconSet.title === weatherIcon);
                                        const icon = iconSet.weather.find((icon) => icon.name === weatherType) || iconSet.weather.find((icon) => icon.name === "Mist");
                                        return icon ? (
                                            <img src={process.env.PUBLIC_URL + '/' + icon.url} alt={icon.name} />
                                        ) : (
                                            <p>Icon not found</p>
                                        );
                                    })()}
                                </div>
                            );
                        })
                ) : (<p>Loading forecast data...</p>)}
            </div>

            <div className="days text-center mt-4">
                {uniqueDays.map((dayIndex, index) => (
                    <button key={index} onClick={() => setSelectedDay(dayIndex)} className="">
                        <div className="btn-items">
                            <p>{daysOfWeek[dayIndex]}</p>
                        </div>
                        {foreCastData && foreCastData.length > 0 ? (
                            (() => {
                                const weatherTypeAt12PM = foreCastData.filter((element) => {
                                    const date = new Date(element.dt_txt);
                                    return date.getDay() === dayIndex && date.getHours() === 12;
                                });
                                if (weatherTypeAt12PM.length > 0) {
                                    const iconSet = Icons.find((iconSet) => iconSet.title === "Day");
                                    const icon = iconSet.weather.find((icon) => icon.name === weatherTypeAt12PM[0].weather[0].main) || iconSet.weather.find((icon) => icon.name === "Mist");
                                    return (
                                        <img src={process.env.PUBLIC_URL + '/' + icon.url} alt={icon.name} />
                                    );
                                }
                                else{
                                    const weatherIcon = new Date(foreCastData.dt_txt).getHours() >= 6 && new Date(foreCastData.dt_txt).getHours() < 18 ? "Day" : "Night";
                                    const iconSet = Icons.find((iconSet) => iconSet.title === weatherIcon);
                                    const icon = iconSet.weather.find((icon) => icon.name === "Clear");
                                    return (
                                        <img src={process.env.PUBLIC_URL + '/' + icon.url} alt={icon.name} />
                                    );
                                }
                            })()
                        ) : (
                            <p>Loading forecast data...</p>
                        )}
                        <span className=""><p className=''>Noon: {getTemperatureAt12PM(dayIndex)}°</p></span>
                    </button>
                ))}
                        
            </div>
        </div>
    )
}
export default Forecast;