import React from 'react';
import {CircularProgress} from "@mui/material";

const Loader = () => {
    return (
        <div className="min-vh-100 mt-5">
            <CircularProgress disableShrink size="4rem"/>
            <p className="mt-3 text-primary">Loading...</p>
        </div>
    );
};

export default Loader;
