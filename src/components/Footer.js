import React from 'react';
import {useLocation} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGithub} from '@fortawesome/free-brands-svg-icons';
import {faLinkedin} from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    const location = useLocation();

    // Set marginTop to 0 for the Welcome page and 20 for other pages
    const marginTop = location.pathname === '/' ? 0 : 15;

    return (
        <nav className="navbar navbar-expand-lg bg-secondary" style={{marginTop, maxHeight: 160}}>
            <div className="container-fluid d-flex justify-content-center">
                <ul className="navbar-nav d-flex align-items-center">
                    <li className="nav-item"
                        style={{display: 'flex', alignItems: 'center'}}>
                        <a href="mailto:kuzhilind@gmail.com"
                           target="_blank" rel="noopener noreferrer" style={{padding: 0, marginRight: 0}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                 className="bi bi-envelope footer-item" viewBox="0 0 20 20">
                                <path
                                    d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
                            </svg>
                        </a>
                        <a className="navbar-brand text-center footer-item"
                           href="mailto:kuzhilind@gmail.com"
                           target="_blank" rel="noopener noreferrer">Contact Me</a>
                    </li>
                    <li className="nav-item"
                        style={{display: 'flex', alignItems: 'center', marginLeft: 50, marginRight: 50}}>
                        <span className="github">
                         <a href="https://github.com/Dmitrii126776"
                            target="_blank" rel="noopener noreferrer">
                           <FontAwesomeIcon icon={faGithub} color="white" style={{padding: 0}}/>
                        </a>
                        <a className="navbar-brand text-center footer-item"
                           href="https://github.com/Dmitrii126776"
                           target="_blank" rel="noopener noreferrer" style={{padding: 0}}>My GitHub
                          </a>
                        </span>
                    </li>
                    <li className="nav-item"
                        style={{display: 'flex', alignItems: 'center'}}>
                        <span className="linkedin">
                             <a href="https://www.linkedin.com/in/dmitrii-kuzhilin"
                                target="_blank" rel="noopener noreferrer">
                              <FontAwesomeIcon icon={faLinkedin} color="white"/>
                             </a>
                        <a className="navbar-brand text-center footer-item"
                           href="https://www.linkedin.com/in/dmitrii-kuzhilin"
                           target="_blank" rel="noopener noreferrer" style={{padding: 0}}>LinkedIn</a>
                        </span>
                    </li>
                </ul>
            </div>
        </nav>
    );
};
export default Footer;
