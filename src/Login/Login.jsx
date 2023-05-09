import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from '../assets/firebase/firebase.init';
const auth = getAuth(app);
const Login = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const handleLogin = (event) => {
        event.preventDefault();
        const login = event.target;
        const email = login.email.value;
        const password = login.password.value;
        setError('');
        setSuccess('');
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                setSuccess('Log in Successful');
            })
            .catch((error) => {
                setError(error.message);
            });
    }
    return (
        <div className='w-50 mx-auto text-start'>
            <br></br>
            <h2>Login Form</h2>
            <br></br>
            <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name='email' required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name='password' required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <p className='text-danger fw-bold'>{error}</p>
                <Button variant="primary fw-bold" type="submit">
                    Submit
                </Button>
            </Form>
            <p className='text-success fw-bold'>{success}</p>
            <div><small>Don't you have any account? Please <Link to='/sign-up'>Sign Up</Link> now.</small></div>
        </div>
    );
};

export default Login;