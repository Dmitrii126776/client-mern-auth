import React from 'react';
import {CircularProgress} from "@mui/material";

const Loader = () => {
    return (
        <div className="min-vh-100 mt-5">
            <CircularProgress disableShrink/>
            <p>Loading...</p>
        </div>
    );
};

export default Loader;
