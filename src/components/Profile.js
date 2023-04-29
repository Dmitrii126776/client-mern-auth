import React from 'react';
import profile from "../images/profile.jpg";
import circle from "../images/profile_circle.png";

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
                         // backgroundColor: "light",
                         // fontSize: 18,
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
