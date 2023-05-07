import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from "reactstrap";
import {Avatar} from "antd";

const Layout = (props) => {
    const {email, firstname, logout, children} = props;
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const navigate = useNavigate();
    const handleLogout = () => {
       // logout();
        navigate("/profile");
    };

    const toggle = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const location = useLocation();
    const [activeLink, setActiveLink] = useState('');

    useEffect(() => {
        setActiveLink(location.pathname);
    }, [location]);
    // hidden={!email}
    return (
        <div >
            <nav
                className="navbar fixed-top navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <button
                        style={{marginLeft: '30px'}}
                        className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0"
                            style={{marginRight: "50px", marginLeft: "30px"}}>
                            <li className="nav-item">
                                <a
                                    className={`nav-link ${activeLink === "/" ? "active" : ""}`}
                                    href="/"
                                >
                                    Welcome
                                </a>
                            </li>
                            {/*<li className="nav-item">*/}
                            {/*    <a*/}
                            {/*        className={`nav-link ${activeLink === "/home" ? "active" : ""}`}*/}
                            {/*        href="/home"*/}
                            {/*    >*/}
                            {/*        Home*/}
                            {/*    </a>*/}
                            {/*</li>*/}
                            <li className="nav-item">
                                <a
                                    className={`nav-link ${activeLink === "/projects" ? "active" : ""}`}
                                    href="/projects"
                                >
                                    Projects
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className={`nav-link ${activeLink === "/animals" ? "active" : ""}`}
                                    href="/animals"
                                >
                                    Animals
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className={`nav-link ${activeLink === "/tasks" ? "active" : ""}`}
                                    href="/tasks"
                                >
                                    TodoList
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className={`nav-link ${activeLink === "/kanban" ? "active" : ""}`}
                                    href="/kanban"
                                >
                                    Kanban
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className={`nav-link ${activeLink === "/profile" ? "active" : ""}`}
                                    href="/profile"
                                >
                                    Profile
                                </a>
                            </li>
                        </ul>
                    </div>
                    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                        <DropdownToggle tag="a" className="dropdown-toggle mr-4">
                            <Avatar style={{backgroundColor: "lightblue"}}
                                    className="mr-2" size={32} src={require('../images/smile.png')}/>
                            {firstname}
                            <span className="caret"></span>
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem>{firstname}</DropdownItem>
                            <DropdownItem>{email}</DropdownItem>
                            <DropdownItem onClick={handleLogout}>My Profile</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </nav>
            <div style={{ paddingTop: '60px' }}>
                {children}
            </div>
        </div>
    );
};

export default Layout;

