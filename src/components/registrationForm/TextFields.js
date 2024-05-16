import React from 'react';
import {FormControl, TextField} from "@mui/material";
import {Controller} from "react-hook-form"
import ErrorMessage from "./ErrorMessage";

const TextFields = (props) => {
    const {label, control, name, errors} = props;
    const addErrorIntoField = (errors) => errors ? {error: true} : {error: false};

    return (
        <FormControl fullWidth sx={{mb: '1rem'}}>
            <Controller
                name={name}
                control={control}
                render={({field}) => (
                    <TextField {...field} {...addErrorIntoField(errors[name])}
                               required label={label} variant="filled"/>
                )}
            />
            {errors[name] ? <ErrorMessage message={errors[name].message}/> : null}
        </FormControl>
    );
};

export default TextFields;

