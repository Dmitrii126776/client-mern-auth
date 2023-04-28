import React from 'react';
import profile from "../images/profile.jpg";

const Profile = () => {
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

                 }}>
                <img src={profile} className="card-img-top" alt="..." style={{height: "215px"}}/>
                <div className="card-body" style={{textAlign:"left"}}>
                    <h6>Dmitrii Kuzhilin</h6>
                    <h6>React Front-End Developer</h6>
                    <h6>New York, New York, United States</h6>
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

                     }}>
                    <div className="card-body">
                        <p className="card-text">Some quick example text to build on the
                            of the card's content.</p>
                        <hr/>
                        <p className="card-text">Some quick example text to build on t
                            of the card's content.</p>

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
