import React from 'react';
import retro from '../images/retrosupply.jpg';
import Typed from 'react-typed';
const resumePDF = require('../document/Dmitrii_Kuzhilin_resume.pdf');
const Header = () => {
    const downloadResume = () => {
        const link = document.createElement('a');
        link.href = resumePDF;
        link.download = 'Dmitrii_Kuzhilin_resume.pdf';
        link.target = '_blank'; // open link in new tab
        link.click();
    };

    return (
        <div>
            <div className="header-wrapper" style={{backgroundImage: `url(${retro})`}}>
                <div className="main-info">
                    {/*<h2>My name is Dmitrii</h2>*/}
                    <h2>I am React Front-end Developer</h2>
                    <button className="btn btn-secondary btn-lg"
                            type="button" style={{marginTop: 20}}
                            onClick={downloadResume}
                    >Get my CV</button>
                    <Typed
                        className="typed-text"
                        strings={["React Javascript", "Mongo ExpressJS", "Bootstrap Node.js", "Material-UI Redux"]}
                        typeSpeed={40}
                        backSpeed={60}
                        loop
                    />
                    <a href="/projects" className="btn btn-secondary btn-lg "
                       tabIndex="-1" role="button" style={{marginTop: 20}}
                    >My projects</a>
                    <h2>At this App I use Back-end tools as well</h2>
                </div>
            </div>
        </div>
    );
};
export default Header;



