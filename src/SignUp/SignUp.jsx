import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import app from '../assets/firebase/firebase.init';
import { Link } from 'react-router-dom';
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
        const name = form.name.value;
        if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
            setError('Please add at least two uppercase in your password');
            return;
        }
        else if (!/(?=.*[!@#$&*])/.test(password)) {
            setError('Please add at least one special character in your password');
            return;
        }
        else if (!/(?=.*[0-9].*[0-9])/) {
            setError('Please add at least two digits in your password');
            return;
        }
        else if (password.length < 8) {
            setError('Password must be eight character!');
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then((data) => {
                const user = data.user;
                form.reset();
                setSuccess('Sign Up Success');
                updateProfile(user, {
                    displayName: name, photoURL: "https://example.com/jane-q-user/profile.jpg"
                  }).then(() => {
                    console.log(user)
                  }).catch((error) => {
                  });
                sendEmailVerification(user)
                    .then(() => {
                        alert('Please Verify Your Email')
                    })
                    .catch(error => {
                        setError(error.message)
                    })
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
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Your Name" name='name' required />
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
            <div><small>Already have an account? Please <Link to='/log-in'>log in</Link>.</small></div>
        </div>
    );
};

export default SignUp;