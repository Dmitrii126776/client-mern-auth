import React, {useEffect, useState} from 'react';
import profile from "../images/profile.jpg";
import circle from "../images/profile_circle.png";


const Profile = () => {
    // const [city, setCity] = useState('New York')
    // const getWeather = async () => {
    //     const url = `https://api.openweathermap.org/data/2.5/weather?q=${cities[0]}&appid=d3fea56d3ebc5e92b8d6af4a5cc7a22e&units=imperial`
    //     const data = await fetch(url)
    //         .then((res) => res.json())
    //         .then((data) => data)
    //     console.log(data)
    // }

    const cities = ["New York", "Dallas", "San Francisco"]
    const [weatherData, setWeatherData] = useState([])
    // useEffect(() => {
    //     const getWeather = async () => {
    //         const weatherPromises = cities.map(city => {
    //             const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=03d545c26e25ff3b1d2a22524adb3f71&units=imperial`
    //             return fetch(url).then(res => res.json())
    //         })
    //         const data = await Promise.all(weatherPromises)
    //         setWeatherData(data)
    //         console.log(data)
    //     }
    //     getWeather()
    // }, [])

    useEffect(() => {
        const getWeather = async () => {
            const weatherPromises = cities.map((city, index) => {
                const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d3fea56d3ebc5e92b8d6af4a5cc7a22e&units=imperial`;
                return new Promise(resolve => {
                    setTimeout(() => {
                        fetch(url)
                            .then(res => res.json())
                            .then(data => resolve(data))
                    }, index * 5000);
                });
            });
            const data = await Promise.all(weatherPromises);
            setWeatherData(data);
        }
        getWeather();
    }, []);


    // const [weatherData, setWeatherData] = useState(null)
    // useEffect(() => {
    //     const getWeather = async () => {
    //         const url = `https://api.openweathermap.org/data/2.5/weather?q=${cities[0]}&appid=d3fea56d3ebc5e92b8d6af4a5cc7a22e&units=imperial`
    //         const data = await fetch(url).then((res) => res.json())
    //         setWeatherData(data)
    //         console.log(data)
    //         console.log(weatherData)
    //     }
    //     getWeather()
    // }, [])

    return (
        <div className="cards-container"
             style={{
                 display: 'flex',
                 flexDirection: 'row',
                 height: '100%',
                 marginLeft: 60,
                 marginRight: 60,
                 marginTop: 20,
                 gap: 30
             }}>
            <div className="card"
                 style={{
                     display: 'flex', flexDirection: 'column',
                     width: 904, height: 430,
                     boxShadow: '2px 4px 4px #888888',
                     position: 'relative', // Add position property to the card
                 }}>
                <img src={profile} className="card-img-top" alt="profile" style={{height: "215px"}}/>
                <img src={circle} className="card-img-top" alt="circle" style={{
                    height: "150px",
                    width: "150px",
                    position: 'absolute', // Add position property to the circle image
                    top: '45%', left: '75%', // Center the circle image in the card
                    transform: 'translate(-50%, -50%)', // Center the circle image in the card
                    zIndex: 1, // Set the z-index of the circle image to a higher value than the profile image
                    border: '4px solid white', // Add a white border to the circle image
                    borderRadius: '50%', // Make the circle image round
                }}/>
                <div className="card-body" style={{textAlign: "left", backgroundColor: "seashell"}}>
                    <h5 style={{fontSize: 25, fontWeight: 500}}>Dmitrii Kuzhilin</h5>
                    <h6>React Front-End Developer</h6>
                    <h6>New York, NY, United States</h6>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk
                        of the card's content.</p>
                </div>
            </div>
            <div className="cards-right-container"
                 style={{display: 'flex', flexDirection: 'column', height: '100%', gap: 30}}>
                <div className="card"
                     style={{
                         display: 'flex', flexDirection: 'column',
                         width: 350, height: 200,
                         boxShadow: '2px 4px 4px #888888',
                         // backgroundColor: "seashell",
                     }}>
                    <div className="weather-container" style={{display: "flex", flexDirection: "column"}}>

                        {weatherData.map((data, index) => (
                            <div className="card" key={index}>
                                <div className="weather-container"
                                     style={{display: "flex", flexDirection: "column",}}>
                                    <div className="weather-item" style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        margin: 10,
                                        alignItems: "center",
                                    }}>
                                        <h6>{data?.name}, {data?.sys?.country}</h6>
                                        {data && data.weather && data.weather[0] ?
                                            <img style={{height: 50}}
                                                 src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                                                 alt={data.weather[0].description}
                                            /> :
                                            <img src="https://openweathermap.org/img/wn/02d@2x.png"
                                                 alt="cloud"
                                            />
                                        }
                                        <h6>{data && data.weather && data.weather.length > 0 ? data.weather[0].main : "Main"}</h6>
                                        <h6>{(data?.main?.temp)?.toFixed()} &deg;F</h6>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/*<div className="weather-item"*/}
                        {/*     style={{*/}
                        {/*         display: "flex",*/}
                        {/*         justifyContent: "space-between",*/}
                        {/*         margin: 10,*/}
                        {/*         alignItems: "center"*/}
                        {/*     }}>*/}
                        {/*    <h6>{weatherData?.name}, {weatherData?.sys?.country}</h6>*/}
                        {/*    {weatherData && weatherData.weather && weatherData.weather[0] ?*/}
                        {/*        <img style={{height: 50}}*/}
                        {/*             src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}*/}
                        {/*             alt={weatherData.weather[0].description}*/}
                        {/*        /> :*/}
                        {/*        <img src="https://openweathermap.org/img/wn/02d@2x.png"*/}
                        {/*             alt="cloud"*/}
                        {/*        />*/}
                        {/*    }*/}
                        {/*    <h6>{weatherData && weatherData.weather && weatherData.weather.length > 0 ? weatherData.weather[0].main : "Main"}</h6>*/}
                        {/*    <h6>{(weatherData?.main?.temp)?.toFixed()} &deg;F</h6>*/}
                        {/*</div>*/}

                    </div>
                </div>
                <div className="card"
                     style={{
                         display: 'flex', flexDirection: 'column',
                         width: 350, height: 200,
                         boxShadow: '2px 4px 4px #888888',
                     }}>
                    <div className="card-body">
                        <p className="card-text">Some quick example text to build
                            of the card's content.</p>
                        <hr/>
                        <p className="card-text">Some quick example text to
                            of the card's content.</p>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
