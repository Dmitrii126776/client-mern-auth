import React from 'react';
import {Box, Typography} from "@mui/material";
import ErrorIcon from '@mui/icons-material/Error';

const ErrorMessage = ({message, name}) => {
    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            mt: '6px'
        }} data-testid="error-box">
            <ErrorIcon color='error' sx={{width: '20px'}}/>
            <Typography color='error.main' variant='span' fontSize='12px' data-testid={`error-message-${name}`}>
                {message}
            </Typography>
        </Box>
    );
};

export default ErrorMessage;
