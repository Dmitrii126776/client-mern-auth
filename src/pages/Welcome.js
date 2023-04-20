import React from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'reactstrap';
import './Welcome.css';

const Welcome = () => {
    return (
        <div className="welcome-container welcome-background">
            <aside className="welcome-content ">
                <h2>Welcome</h2>
                <h3>Please login to get started</h3>
                <p>
                    This system is for authorized users only. If you're having trouble
                    logging in or feel that you have reached this page in error, please
                    contact the support team.
                </p>
                <Link to="/login">
                    <Button className="btn btn-primary w-25">Sign in</Button>
                </Link>
            </aside>
        </div>
    );
};

export default Welcome;
