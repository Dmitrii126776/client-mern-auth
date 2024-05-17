import React, {useState} from 'react';
import {Avatar, Box, Button, Container, FilledInput, InputAdornment, InputLabel, Typography} from "@mui/material";
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import {HowToReg, Visibility, VisibilityOff} from "@mui/icons-material";
import {Controller, useForm} from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import {IconButton} from "@mui/joy";
import TextFields from "../components/registrationForm/TextFields";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import ErrorMessage from "../components/registrationForm/ErrorMessage";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const schema = yup.object({
    email: yup.string().required('Email is required').email(),
    password: yup.string().required('Password is required')
}).required()

const LoginForm = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [loginError, setLoginError] = useState(false);
    const [networkError, setNetworkError] = useState(false);
    const navigate = useNavigate();

    const moveToRegistration = () => {
        navigate("/registration");
    }
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const {handleSubmit, control, reset, formState: {errors}} = useForm({
        defaultValues: {
            email: '',
            password: ''
        },
        resolver: yupResolver(schema),
    })

    const onSubmit = (data) => {
        console.log(data)
        const user = {email: data.email, password: data.password}
        axios.post('https://server-mern-project.vercel.app/login', user, {withCredentials: true})
            .then((response) => {
                localStorage.setItem('token', response.data.accessToken);
                navigate(-1)
            }).catch((error) => {
            if (error.response) {
                console.log('registration error', error.response)
                setLoginError(true)
            } else if (error.request) {
                console.log('network error', error.request);
                setNetworkError(true)
            } else {
                console.log('error-message', error.message);
            }
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
                    <Typography component='h1' fontSize='24px'
                                sx={{mb: 2}}>Sign in</Typography>
                    <Box noValidate component='form' onSubmit={handleSubmit(onSubmit)} sx={{width: '100%'}}>

                        <TextFields errors={errors} control={control} name='email' label='Email'/>

                        <FormControl variant="filled" fullWidth sx={{mb: '1rem'}}>
                            <Controller name="password" control={control}
                                        render={({field}) => (
                                            <>
                                                <InputLabel required
                                                            htmlFor="filled-adornment-password">Password</InputLabel>

                                                <FilledInput
                                                    {...field} autoComplete="off" variant="filled"
                                                    name="password"
                                                    type={showPassword ? 'text' : 'password'}
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={handleClickShowPassword}
                                                                onMouseDown={handleMouseDownPassword}
                                                                edge="end"
                                                            >
                                                                {showPassword ? <VisibilityOff/> :
                                                                    <Visibility/>}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    }
                                                />
                                            </>
                                        )}
                            />
                            {errors["password"] ? <ErrorMessage message={errors["password"].message}/> : null}
                        </FormControl>
                        {loginError && (
                            <Typography color='error.main' variant='h2' fontSize='16px'>
                                Sorry, wrong email or password. Please try again.
                            </Typography>
                        )}
                        {networkError && (
                            <Typography color='error.main' variant='h2' fontSize='16px'>
                                Sorry, we are having some issues at the moment. Please try again later.
                            </Typography>
                        )}
                        <Button type="submit" fullWidth variant="contained"
                                sx={{mt: 3, mb: 3}}>Sign in</Button>
                        <Divider>
                            <Chip label="Don't have an account?" size="medium"/>
                        </Divider>
                        <Button type="button" onClick={moveToRegistration} fullWidth variant="contained"
                                color="secondary"
                                sx={{mt: 3, mb: 3}}>Sign up</Button>
                    </Box>
                </Box>
            </Container>
        </div>
    );
};

export default LoginForm;
