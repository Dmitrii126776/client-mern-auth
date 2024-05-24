import React from 'react';
import {FormControlLabel, Checkbox} from "@mui/material";
import {Controller} from "react-hook-form";
import ErrorMessage from "./ErrorMessage";

const CheckboxFields = ({name, control, errors}) => {
    return (
        <>
            <Controller
                name={name}
                control={control}
                render={({field}) => (
                    <FormControlLabel required control={<Checkbox {...field} required/>}
                                      label="I Agree to ClientApp Terms and Privacy Policy"/>
                )}
            />
            {errors[name] ? <ErrorMessage name={name} message={errors[name].message}/> : null}
        </>
    );
};

export default CheckboxFields;
