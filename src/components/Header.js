import React, {useEffect, useRef} from 'react';
import retro from '../images/retrosupply.jpg';

const resumePDF = require('../document/Dmitrii_Kuzhilin_developer_2023.docx');
const Header = () => {
    const textRef = useRef(null);

    function typeWriter(element, text, delay = 120) {
        let i = 0;

        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, delay);
            }
        }

        type();
    }

    useEffect(() => {
        const text = "React JS Redux TS MongoDB";
        typeWriter(textRef.current, text);
    }, []);

    const downloadResume = () => {
        const link = document.createElement('a');
        link.href = resumePDF;
        link.download = 'Dmitrii_Kuzhilin_developer_2023.docx';
        link.target = '_blank'; // open link in new tab
        link.click();
    };

    return (
        <div>
            <div className="header-wrapper" style={{backgroundImage: `url(${retro})`}}>
                <div className="main-info">
                    <h2>I am React Front-end Developer</h2>
                    <button className="btn btn-secondary btn-lg"
                            type="button" style={{marginTop: 20}}
                            onClick={downloadResume}
                    >Get my CV
                    </button>
                    <h2 ref={textRef} className="typed-text">
                    </h2>
                    {/*<Typed*/}
                    {/*    className="typed-text"*/}
                    {/*    strings={["React JavaScript", "MongoDB ExpressJS", "Bootstrap Node.js", "Material-UI Redux", "TypeScript Next.js"]}*/}
                    {/*    typeSpeed={40}*/}
                    {/*    backSpeed={60}*/}
                    {/*    loop*/}
                    {/*/>*/}
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



