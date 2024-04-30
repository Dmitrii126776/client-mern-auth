import React, {useEffect, useRef, useState} from 'react';
import {Avatar} from 'antd';
import {Galleria} from 'primereact/galleria';
import axios from 'axios';

const Home = (props) => {
    const {firstname} = props;
    const [images, setImages] = useState(null);
    const responsiveOptions = [
        {
            breakpoint: '991px',
            numVisible: 4
        },
        {
            breakpoint: '767px',
            numVisible: 3
        },
        {
            breakpoint: '575px',
            numVisible: 3
        }
    ];

    useEffect(() => {
        axios
            .get(`https://server-mern-project.vercel.app/animals`,
                {
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
            .then((res) => {
                console.log(res.data);
                const animals = res.data
                // const animals = result.reverse()
                const photos = animals.map(animal => ({src: animal.mainPhoto, alt: animal.name}));

                setImages(photos);
                console.log(photos)
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const itemTemplate = (item) => {
        return <img src={item.src} alt={item.alt} style={{width: '100%'}}/>
    };

    const thumbnailTemplate = (item) => {
        return <img src={item.src} alt={item.alt} style={{maxWidth: '50px', maxHeight: '50px'}}/>
    };

    const caption = (item) => {
        return (
            <React.Fragment>
                <div className="text-xl mb-2 font-bold">{item.name}</div>
                <p className="text-white">{item.alt.toUpperCase()}</p>
            </React.Fragment>
        );
    }

    return (
        <div style={{display: 'flex', flexWrap: 'wrap', margin: 10}}>

            <div className="card" style={{marginLeft: 5, maxWidth: '600px'}}>
                <Galleria value={images} responsiveOptions={responsiveOptions} numVisible={5}
                          item={itemTemplate} thumbnail={thumbnailTemplate} caption={caption}
                          style={{maxWidth: '600px'}} circular={true}/>
            </div>
            <div style={{flex: 1}}>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <div style={{marginLeft: '30px'}} className="d-flex align-items-center mb-3">
                        <div className="d-flex align-items-center mb-3">
                            <Avatar style={{backgroundColor: 'lightblue'}} className="mr-3" size={64}
                                    src={require('../images/sea-lion.jpg')}/>
                            <h1 style={{display: 'block'}}>{firstname}</h1>
                        </div>
                    </div>
                    <div style={{marginLeft: 20, marginRight: 20}}>
                        <h4 style={{textAlign: "left"}}>Reef Summary</h4>
                        <p style={{textAlign: "left"}}><b>The busiest periods are March to August, Christmas, New Year
                            and Chinese New</b></p>
                        <p style={{textAlign: "left"}}><b>Depth:</b> 5 - >40m</p>
                        <p style={{textAlign: "left"}}><b>Visibility:</b> 10 - 30m</p>
                        <p style={{textAlign: "left"}}><b>Currents:</b> Can be strong</p>
                        <p style={{textAlign: "left"}}><b>Water temperature:</b> 26 - 30°C</p>
                        <p style={{textAlign: "left"}}><b>Experience level:</b> Intermediate - advanced</p>
                        <p style={{textAlign: "left"}}><b>Number of dive sites:</b> 12</p>
                        <p style={{textAlign: "left"}}><b>Recommended length of stay:</b> 5 - 14 days</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Home;
