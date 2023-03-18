import React, {useContext, useState} from 'react';
import {Button, Col, Form, FormGroup, Input, Label, Row} from "reactstrap";
import axios from "axios";
import UserContext from "../UserContext";
import {useNavigate} from "react-router-dom";
import './Welcome.css';

const Login = () => {
    const [email, setEmail] = useState('')
    const [firstname] = useState('')
    const [password, setPassword] = useState('')
    const [loginError, setLoginError] = useState(false);

    const navigate = useNavigate();
    const user = useContext(UserContext)

    const loginUser = (e) => {
        e.preventDefault()

        const data = {email, password, firstname}
        axios.post('https://server-mern-project.vercel.app/login', data, {withCredentials: true})
            .then((response) => {
                //console.log(response.data)
                const token = response.data.token;
                const id = response.data.id
                localStorage.setItem('token', token);
                localStorage.setItem('id', id);
                user.setEmail(response.data.user.email)
                user.setFirstName(response.data.user.firstname)
                setEmail('')
                setPassword('')
                setLoginError(false)
                navigate('/home')
            })
            .catch(() => {
                console.log('error')
                setLoginError(true)
                setEmail('')
                setPassword('')
            })
    }


    return (
        <div className="welcome-container welcome-background">
            <Form className="login-form welcome-content" action="src" onSubmit={e => loginUser(e)}>
            <h1>Sign in now</h1>

                <Row style={{margin: 20}}>
                    <Col md={10}>
                        <FormGroup>
                            <Label> Sign in with you email address </Label>
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
                            <Label>Enter you password </Label>
                            <Input
                                value={password} onChange={e => setPassword(e.target.value)}
                                placeholder="password" type="password"
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
                    <div className="login-error">Login Error! Wrong email or password!</div>
                )}
            </Form>
        </div>
    );
};

export default Login;
