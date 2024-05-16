import React, {useContext, useState} from 'react';
import {Button, Col, Form, FormGroup, Input, Label, Row} from "reactstrap";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import './Welcome.css';
import AuthContext from "../providers/AuthContext";

const Login = () => {
    const {setUser} = useContext(AuthContext);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loginError, setLoginError] = useState(false);
    const [networkError, setNetworkError] = useState(false);

    const navigate = useNavigate();

    const loginUser = (e) => {
        e.preventDefault()

        const data = {email, password}
        axios.post('https://server-mern-project.vercel.app/login', data, {withCredentials: true})
            .then((response) => {
                const token = response.data.accessToken;
                localStorage.setItem('token', token);
                setEmail('')
                setPassword('')
                setLoginError(false)
                navigate(-1)
            })
            .catch((error) => {
                if (error.response) {
                    // The request was made and the server responded with a status code that falls out of the range of 2xx
                    console.log('login error', error.response)
                    setLoginError(true)
                    setEmail('')
                    setPassword('')
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log('network error', error.request);
                    setNetworkError(true)
                    setEmail('')
                    setPassword('')
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('error-message', error.message);
                }
                console.log('error-config', error.config);
            })
    }

    return (
        <div className="welcome-container welcome-background">
            <Form className="login-form welcome-content" action="src" onSubmit={e => loginUser(e)}>
                <h1 style={{marginTop: 5}}>Sign in now</h1>

                <Row style={{margin: 20}}>
                    <Col md={10}>
                        <FormGroup>
                            <Label>Email</Label>
                            <Input
                                value={email} onChange={e => setEmail(e.target.value)}
                                name="email" placeholder="email" type="email"
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row style={{margin: 20}}>
                    <Col md={10}>
                        <FormGroup>
                            <Label>Password </Label>
                            <Input
                                value={password} onChange={e => setPassword(e.target.value)}
                                placeholder="******" type="password" autocomplete="off"
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row style={{margin: 20}}>
                    <Col md={10}>
                        <Button className="btn btn-primary w-75" disabled={email === '' || password === ''}>
                            Sign in
                        </Button>
                        <p style={{marginTop: 10}}>
                            <span>
                                Don't have an account?
                            </span>
                            <a href="/registration">
                                Sign up now
                            </a>
                        </p>
                    </Col>
                </Row>
                {loginError && (
                    // <div className="login-error">Login Error! Wrong email or password!</div>
                    <div className="login-error">User with this email or password not found.</div>
                )}
                {networkError && (
                    <div className="login-error"> Sorry, we are having some issues at the moment. Please try again
                        later.</div>
                )}
            </Form>
        </div>
    );
};

export default Login;
