import React, {useContext, useState} from 'react';
import {Button, Col, Form, FormGroup, Input, Label, Row} from "reactstrap";
import axios from "axios";
import UserContext from "../UserContext";
import {useNavigate} from "react-router-dom";
import './Welcome.css';

const Registration = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstname, setFirstName] = useState('')

    const navigate = useNavigate();
    const user = useContext(UserContext)

    const registerUser = (e) => {
        const avatar = firstname[0].toUpperCase();
        e.preventDefault()
        const data = {email, password, firstname, avatar}
        axios.post('https://server-mern-project.vercel.app/registration', data, {withCredentials: true})
            .then((response) => {
                console.log(response)
                console.log(response.status)
                console.log(response.data)
                // console.log(response.data.accessToken)
                const token = response.data.accessToken;
                localStorage.setItem('token', token);
                setEmail('')
                setPassword('')
                // setLoginError(false)
                navigate(-2)

                // console.log(response.data)
                // const token = response.data.token;
                // const id = response.data.id
                // localStorage.setItem('token', token);
                // localStorage.setItem('id', id);
                // user.setEmail(response.data.user.email)
                // user.setFirstName(response.data.user.firstname)
                // setEmail('')
                // setPassword('')
                // setFirstName('')
                // navigate('/home')
            }).catch(() => {
            console.log('error')
            // setLoginError(true)
            setEmail('')
            setPassword('')
        })
    }


    return (
        <div className="welcome-container welcome-background">
            <Form className="register-form welcome-content" action="src" onSubmit={e => registerUser(e)}>
                <h1>Create an account</h1>
                <Row style={{margin: 10}}>
                    <Col md={12}>
                        <FormGroup>
                            <Label> Email </Label>
                            <Input
                                value={email} onChange={e => setEmail(e.target.value)}
                                name="email" placeholder="email" type="email"
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row style={{margin: 10}}>
                    <Col md={12}>
                        <FormGroup>
                            <Label> Password </Label>
                            <Input
                                value={password} onChange={e => setPassword(e.target.value)}
                                placeholder="password" type="password"
                            />
                        </FormGroup>
                    </Col>
                    <Row style={{margin: 10}}>
                    </Row>
                    <Col md={12}>
                        <FormGroup>
                            <Label> Name </Label>
                            <Input
                                value={firstname} onChange={e => setFirstName(e.target.value)}
                                placeholder="name" type="name"
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row style={{margin: 20}}>
                    <Col md={10}>
                        <Button className="btn btn-primary w-75" disabled={email === '' || password === ''}>
                            Sign up
                        </Button>
                        <p style={{marginTop: 10}}>
                            <span>
                                Already have an account?
                            </span>
                            <a href="/login">
                                Sign in now
                            </a>
                        </p>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default Registration;
