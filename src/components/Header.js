import React from 'react';
import retro from '../images/retrosupply.jpg';
import Typed from 'react-typed';

const Header = () => {
    return (
        <div>
            <div className="header-wrapper" style={{backgroundImage: `url(${retro})`}}>
                <div className="main-info">
                    {/*<h2>My name is Dmitrii</h2>*/}
                    <h2>I am React Frontend Developer</h2>
                    <h2>Creating this App I use Backend tools as well</h2>
                    <Typed
                        className="typed-text"
                        strings={["React Javascript", "Mongo ExpressJS", "Bootstrap Material-UI"]}
                        typeSpeed={40}
                        backSpeed={60}
                        loop
                    />
                    <a href="/animals" className="btn btn-secondary btn-lg"
                       tabIndex="-1" role="button" style={{marginTop: 20}}
                       >Contact me</a>
                    <a href="/animals" className="btn btn-light btn-lg "
                       tabIndex="-1" role="button" style={{marginTop: 20}}
                    >Contact me</a>
                </div>
            </div>
        </div>
    );
};
export default Header;



