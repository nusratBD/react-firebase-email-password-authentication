import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from '../assets/firebase/firebase.init';
const auth = getAuth(app);
const SignUp = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        setError('');
        setSuccess('');
        createUserWithEmailAndPassword(auth, email, password)
            .then((data) => {
                const user = data.user;
                form.reset();
                setSuccess('Sign Up Success');
            })
            .catch((error) => {
                setError(error.message)
            });
    }
    return (
        <div className='w-50 mx-auto text-start'>
            <br></br>
            <h2>Sign Up Form</h2>
            <br></br>
            <Form onSubmit={handleSubmit}>
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
                <p className='text-danger'>{error}</p>
                <p className='text-success'>{success}</p>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default SignUp;