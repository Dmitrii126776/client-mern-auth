import React, {useContext, useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from "reactstrap";
import {Avatar} from "antd";
import AuthContext from "../providers/AuthContext";

const Layout = (props) => {
    const {user, setUser} = useContext(AuthContext);
    const {firstname, logout, children} = props;
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        setUser({})
        navigate("/login");
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
        <div>
            <nav
                className="navbar fixed-top navbar-expand-lg navbar-color"
                data-testid="navbar"
            >
                <div className="container-fluid">
                    <button
                        style={{marginLeft: '30px'}}
                        className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation"
                        data-testid="navbar-toggler"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0"
                            style={{marginRight: "50px", marginLeft: "30px"}}
                            data-testid="navbar-nav"
                        >
                            <li className="nav-item">
                                <a
                                    className={`nav-link ${activeLink === "/" ? "active" : ""}`}
                                    href="/"
                                    data-testid="nav-link-welcome"
                                >
                                    Welcome
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className={`nav-link ${activeLink === "/home" ? "active" : ""}`}
                                    href="/home"
                                >
                                    Home
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className={`nav-link ${activeLink === "/projects" ? "active" : ""}`}
                                    href="/projects"
                                    data-testid="nav-link-projects"
                                >
                                    Projects
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className={`nav-link ${activeLink === "/animals" ? "active" : ""}`}
                                    href="/animals"
                                    data-testid="nav-link-animals"
                                >
                                    Animals
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className={`nav-link ${activeLink === "/tasks" ? "active" : ""}`}
                                    href="/tasks"
                                    data-testid="nav-link-todolist"
                                >
                                    TodoList
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className={`nav-link ${activeLink === "/kanban" ? "active" : ""}`}
                                    href="/kanban"
                                    data-testid="nav-link-kanban"
                                >
                                    Kanban
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className={`nav-link ${activeLink === "/profile" ? "active" : ""}`}
                                    href="/profile"
                                    data-testid="nav-link-profile"
                                >
                                    Profile
                                </a>
                            </li>
                        </ul>
                    </div>
                    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                        <DropdownToggle tag="a" className="dropdown-toggle mr-4" data-testid="dropdown-toggle">
                            <Avatar style={{backgroundColor: "lightblue"}}
                                    className="mr-2" size={32} src={require('../images/smile.png')}/>
                            {firstname}
                            <span className="caret"></span>
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem>{user?.firstname}</DropdownItem>
                            <DropdownItem>{user?.email}</DropdownItem>
                            {/*<DropdownItem>{user?.id}</DropdownItem>*/}
                            <DropdownItem>
                                <a href="https://dima-kuzhilin-portfolio.netlify.app/" target="_blank"
                                   rel="noopener noreferrer"
                                   className="nav-link" data-testid="portfolio-link">Portfolio</a>
                            </DropdownItem>
                            <DropdownItem data-testid="profile-link">Profile</DropdownItem>
                            <DropdownItem onClick={handleLogout} data-testid="logout-link">Logout</DropdownItem>
                            <DropdownItem>
                                <a className="nav-link" data-testid="login-link" href="/login">Login</a></DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </nav>
            <div style={{paddingTop: '60px'}} data-testid="children-container">
                {children}
            </div>
        </div>
    );
};

export default Layout;

