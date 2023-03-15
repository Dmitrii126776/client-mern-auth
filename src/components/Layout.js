import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from "reactstrap";
import {Avatar} from "antd";

const Layout = (props) => {
    const {email, firstname, logout} = props;
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const toggle = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light" hidden={!email}>
                <div className="container-fluid">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{marginRight: "50px"}}>
                        <li className="nav-item">
                            <a className="nav-link" href="/home">
                                Home
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/tasks">
                                Tasks
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/kanban">
                                Kanban
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/animals">
                                Animals
                            </a>
                        </li>
                    </ul>
                    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                        <DropdownToggle tag="a" className="dropdown-toggle mr-4">
                            <Avatar style={{backgroundColor: "lightblue"}}
                                    className="mr-2" size={32} src={require('../images/AvatarsDefault.png')}/>
                            {firstname}
                            <span className="caret"></span>
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem>{firstname}</DropdownItem>
                            <DropdownItem>{email}</DropdownItem>
                            <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </nav>
        </div>
    );
};

export default Layout;

