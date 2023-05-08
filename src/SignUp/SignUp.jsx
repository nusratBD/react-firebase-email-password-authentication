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
        setError('');
        setSuccess('');
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        if(!/(?=.*[A-Z].*[A-Z])/.test(password)){
            setError('Please add at least two uppercase in your password');
            return;
        }
        else if(!/(?=.*[!@#$&*])/.test(password)){
            setError('Please add at least one special character in your password');
            return;
        }
        else if(!/(?=.*[0-9].*[0-9])/){
            setError('Please add at least two digits in your password');
            return;
        }
        else if(password.length<8){
            setError('Password must be eight character!');
            return;
        }
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
                <Button variant="primary fw-bold" type="submit">
                    Submit
                </Button>
                <p className='text-success fw-bold'>{success}</p>
            </Form>
        </div>
    );
};

export default SignUp;