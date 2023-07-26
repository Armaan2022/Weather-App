import React, { useState } from "react"
import './WeatherApp.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import error from './Images/error.jpg'


function WeatherApp() {
    const [data, setData] = useState([])
    const [location, setLocation] = useState('')
    const [isShowing, setIsShowing] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    
    const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${location}&appid=0de2d1ae5aace14fb3a4eec21e21ab81`

    
    const getWeather = () => {
    
        fetch(url)
        .then((res) => res.json())
        .then((result) => {
            if (result.cod === '404'){
                setErrorMessage({ message:  "not found", location: location});
                setData("");
                setLocation("");
            } else {
                setData(result)
            }
        });
        setIsShowing(true); 
        setLocation('');
    };

    const checkEnter = (event) => {
        if (event.key === 'Enter'){
            getWeather();
        } 
    }

    return (
        <>
        <div className="app">
            <div className={`container${isShowing ? " is-showing" : ""}`}>
                <div className="search">
                    <input placeholder="Enter Location" className="search-bar" value={location} onChange={(e) => setLocation(e.target.value)} onKeyDown={(e) => {checkEnter(e)}}/>
                    <button className="search-button" onClick={getWeather}><FontAwesomeIcon icon={faMagnifyingGlass} title="search-icon"/></button>
                </div>

                {data.name !== undefined ? (
                    <div className="weather">
                        <div className="top-details">
                            <div className="left-side">
                                <div className="location">
                                    {data.sys ? <h2>{data.name}, {data.sys.country}</h2> : null}
                                </div>
                                <div className="temp">
                                    {data.main ? <h2>{data.main.temp.toFixed()}°C</h2> : null}
                                </div>
                            </div>
                            <div className="right-side">
                                <div className="icon">
                                    {data.weather ? <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} title="image"/> : null}
                                </div>
                                
                                <div className="description">
                                    {data.weather ? <p>{data.weather[0].description}</p> : null}
                                </div>
                            </div>
                            
                        </div>
                        
                        <div className="weather-details">
                            <div className="humidity">
                                {data.main ? <p>{data.main.humidity}%</p> : null}
                                <p className="text">Humidity</p>
                            </div>
                            <div className="feels-like">
                                {data.main ? <p>{data.main.feels_like.toFixed()}°C</p> : null}
                                <p className="text">Feels like</p>
                            </div>
                            <div className="wind">
                                {data.wind ? <p>{data.wind.speed.toFixed()} km/h</p> : null}
                                <p className="text">Wind Speed</p>
                            </div>
                        </div>
                    </div>
                ) : ( errorMessage.message === 'not found' && (
                    <div className="errorMessage">
                        <img src={error} alt="Error logo"/>
                        <p>OOPS!</p>
                        <p><a>'{errorMessage.location}'</a> {errorMessage.message}!</p>
                        <p>Enter a valid location.</p>
                    </div>
                ))
            }
                
            </div>
        /</div>
        </>
    )
}

export default WeatherApp;