import React, {useState} from 'react';
import {Container, Box, Button, Avatar, Typography} from "@mui/material";
import TextFields from "../components/registrationForm/TextFields";
import CheckboxFields from "../components/registrationForm/CheckboxFields";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {useNavigate} from "react-router-dom";
import {HowToReg} from "@mui/icons-material";
import axios from "axios";

// const emailRegExp = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
const pawdRegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;


const schema = yup
    .object({
        fullName: yup.string().required('Full Name is required').matches(/^([a-zA-Z\s]{2,25})$/, 'name must be valid name'),
        email: yup.string().required('Email is required').email(),
        password: yup.string().required('Password is required')
            .matches(pawdRegExp, 'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'),
        confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Password must match'),
        privacy: yup.bool().oneOf([true], 'Field must be checked'),

    })
    .required()

const RegistrationForm = () => {
    const [registrationError, setRegistrationError] = useState(false);
    const [networkError, setNetworkError] = useState(false);
    const navigate = useNavigate();
    const {control, reset, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
            privacy: false
        },
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        const avatar = data.fullName[0].toUpperCase();
        // console.log(data)
        const user = {firstname: data.fullName, email: data.email, password: data.password, avatar: avatar}
        axios.post('https://server-mern-project.vercel.app/registration', user, {withCredentials: true})
            .then((response) => {
                console.log(response.data)
                localStorage.setItem('token', response.data.accessToken);
                setRegistrationError(false)
                navigate(-2)
            }).catch((error) => {
            if (error.response) {
                console.log('registration error', error.response)
                setRegistrationError(true)
            } else if (error.request) {
                console.log('network error', error.request);
                setNetworkError(true)
            } else {
                console.log('error-message', error.message);
            }
            // console.log('error-config', error.config);
        })
        reset()
    }

    return (
        <div className="min-vh-100">
            <Container maxWidth="xs">
                <Box sx={{display: 'flex', flexDirection: 'column', mt: '1rem', alignItems: 'center'}}>
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <HowToReg/>
                    </Avatar>
                    {/*<h4>Sign up</h4>*/}
                    <Typography component='h1' fontSize='24px'
                                sx={{mb: 2}}>Sign up</Typography>
                    <Box noValidate component='form' onSubmit={handleSubmit(onSubmit)} sx={{width: '100%'}}>
                        <TextFields errors={errors} control={control} name='fullName' label='Full Name'/>
                        <TextFields errors={errors} control={control} name='email' label='Email'/>
                        <TextFields errors={errors} control={control} name='password' label='Password'/>
                        <TextFields errors={errors} control={control} name='confirmPassword' label='Confirm Password'/>
                        <CheckboxFields errors={errors} control={control} name='privacy'/>
                        {registrationError && (
                            <Typography color='error.main' variant='h2' fontSize='18px'>
                                Sorry, user with this email already exists!
                            </Typography>
                        )}
                        {networkError && (
                            <Typography color='error.main' variant='h2' fontSize='16px'>
                                Sorry, we are having some issues at the moment. Please try again later.
                            </Typography>
                        )}
                        <Button type="submit" fullWidth variant="contained"
                                sx={{mt: 3, mb: 3}}>Sign up</Button>
                    </Box>
                </Box>
            </Container>
        </div>
    )
}

export default RegistrationForm;
