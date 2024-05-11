import React, {useState} from 'react';
import {CircularProgress} from "@mui/material";
import {useNavigate} from "react-router-dom";

const Loader = () => {
    const [alert, setAlert] = useState(false);
    const navigate = useNavigate();
    const moveToLogin = () => {
        navigate("/login");
    }

    setTimeout(() => {
        setAlert(true)
    }, 4000)

    return (
        <div className="min-vh-100 mt-5">
            {!alert ? (
                <div>
                    <CircularProgress disableShrink size="4rem"/>
                    <p className="mt-3 text-primary">Sorry, we are having some issues at the moment.</p>
                    <p className="text-primary">Please try again later.</p>
                </div>
            ) : (
                <div className="alert alert-secondary d-inline-block" role="alert"
                     style={{boxShadow: '2px 4px 4px #888888', minWidth: '250px', maxWidth: '500px'}}
                >
                    <button onClick={moveToLogin} type="button" className="close" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h5 className="text-danger">Sorry, you are not allowed to access this page !</h5>
                    <h5 className="text-danger">Please, Sign in using these credentials:</h5>
                    <hr/>
                    <h5>Email: selenium@mail.com Password: 1234</h5>
                    <h5>Email: cypress@mail.com Password: 1234</h5>
                </div>
            )}
        </div>
    );
};

export default Loader;
