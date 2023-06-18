import React, {useEffect, useState} from 'react';
import profile from "../images/new-profile.jpg";
import circle from "../images/smile.png";
import CountDownTime from "./CountDownTime";


const Profile = () => {

    const cities = ["New York", "Dallas", "San Francisco"]
    const [weatherData, setWeatherData] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getWeather = async () => {
            const weatherPromises = cities.map((city, index) => {
                const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d3fea56d3ebc5e92b8d6af4a5cc7a22e&units=imperial`;
                return new Promise(resolve => {
                    setTimeout(() => {
                        fetch(url)
                            .then(res => res.json())
                            .then(data => resolve(data))
                    }, index * 2000);
                });
            });
            const data = await Promise.all(weatherPromises);
            setWeatherData(data);
            setLoading(false);
        }
        getWeather();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <div className="cards-container"
             style={{
                 display: 'flex',
                 flexDirection: 'row',
                 height: '100%',
                 marginLeft: 60,
                 marginRight: 60,
                 marginTop: 20,
                 gap: 30,
             }}>
            <div className="card"
                 style={{
                     display: 'flex', flexDirection: 'column',
                     width: 904, height: 430,
                     boxShadow: '2px 4px 4px #888888',
                     position: 'relative', // Add position property to the card
                 }}>
                <img src={profile} className="card-img-top" alt="profile" style={{height: "215px"}}/>
                <div style={{position: 'absolute', top: '3%', left: '3%', color: "white"}}>
                    <CountDownTime/>
                </div>
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
                    <h5 style={{fontSize: 25, fontWeight: 500}}>Dima Kuzhilin</h5>
                    {/*<h6>React Front-end Developer</h6>*/}
                    <h6>New York, NY, United States</h6>
                    <p className="card-text">React Front-end Developer with 5+ years of experience in Agile development,
                        skilled in JavaScript, TypeScript, React, Redux, and Node.js
                        I am inspired by the idea of creating beautiful,
                        functional interfaces that people will interact with and enjoy using.
                        I like to create a Back-end side using ExpressJS and MongoDB as well.
                    </p>
                </div>
            </div>
            <div className="cards-right-container"
                 style={{display: 'flex', flexDirection: 'column', height: '100%', gap: 30}}>
                <div className="card"
                     style={{
                         position: 'relative',
                         display: 'flex',
                         flexDirection: 'column',
                         width: 350, height: 200,
                         boxShadow: '2px 4px 4px #888888',
                         // backgroundColor: "seashell",
                     }}>

                    {loading ? (
                        // <div style={{
                        //     display: 'flex',
                        //     alignItems: 'center',
                        //     justifyContent: 'center',
                        //     height: '100%',
                        //     fontSize: 20,
                        //     color: "yellowgreen"
                        // }}>
                        //     Please, waiting...
                        // </div>
                        <div className="spinner-border text-secondary" role="status" style={{
                            position: 'absolute',
                            top: 0,
                            bottom: 0,
                            left: 0,
                            right: 0,
                            margin: 'auto',
                            width: 64,
                            height: 64,
                        }}>
                            <span className="visually-hidden">Loading...</span>
                        </div>

                    ) : (

                        <div className="weather-container" style={{display: "flex", flexDirection: "column",}}>

                            {weatherData.map((data, index) => (
                                <div className="card" key={index}>
                                    <div className="weather-container"
                                         style={{
                                             display: "flex",
                                             flexDirection: "column",
                                             backgroundColor: "seashell"
                                         }}>
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
                        </div>
                    )}
                </div>
                <div className="card"
                     style={{
                         display: 'flex', flexDirection: 'column',
                         width: 350, height: 200,
                         boxShadow: '2px 4px 4px #888888',
                     }}>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1841337560213!2d-73.9881228881803!3d40.75797467126745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1682905229753!5m2!1sen!2sus"
                        style={{border: 0, width: "100%", height: "200px"}} allowFullScreen="" loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade" title="Map of New York City">
                    </iframe>
                </div>
            </div>
        </div>
    );
};

export default Profile;
