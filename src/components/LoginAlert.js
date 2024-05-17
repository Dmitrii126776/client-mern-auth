import React from 'react';
import {CircularProgress} from "@mui/material";
import {useNavigate} from "react-router-dom";

const LoginAlert = () => {
    const navigate = useNavigate();
    const moveToLogin = () => {
        navigate("/login");
    }

    return (
        <div className="min-vh-100 mt-5">
            <div>
                <CircularProgress disableShrink size="4rem"/>
            </div>
            <div className="alert  d-inline-block" role="alert"
                 style={{boxShadow: '1px 1px 2px 2px #888888', minWidth: '250px', maxWidth: '500px', marginTop: '20px'}}
            >
                <button onClick={moveToLogin} type="button" className="close" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <h5 className="text-danger" style={{marginTop: '25px'}}>Sorry, you don't have access to this
                    page!</h5>
                <h5 className="text-danger">Please, sign in using these credentials:</h5>
                <hr/>
                <h5>Email: selenium@mail.com Password: 1234</h5>
                <h5>Email: cypress@mail.com Password: 1234</h5>
            </div>
        </div>
    );
};

export default LoginAlert;
