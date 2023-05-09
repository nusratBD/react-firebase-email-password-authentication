import React, { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import app from '../assets/firebase/firebase.init';
import './Login.css';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
const auth = getAuth(app);
const Login = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [passwordType, setPasswordType] = useState("password");
    const emailRef = useRef();
    const togglePassword = ()=>{
        if(passwordType==="password"){
            setPasswordType("text");
            return;
        }
        setPasswordType("password");
    }
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
                if (!user.emailVerified) {
                    alert('Your Email is not verified yet!!!')
                }
                else {
                    setSuccess('Log in Successful');
                }
            })
            .catch((error) => {
                setError(error.message);
            });
    }
    const resetPassword = event => {
        const email = emailRef.current.value;
        if (!email) {
            alert('Please provide your email to reset password!')
        }
        else {
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    alert('Please Check Your Email to reset Password.')
                })
                .catch((error) => {
                    setError(error.message)
                });
        }
    }
return (
    <div className=' mx-auto text-start form-area'>
        <br></br>
        <h2>Login Form</h2>
        <br></br>
        <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" name='email' ref={emailRef} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                    <Form.Control type={passwordType} placeholder="Password" name='password' required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <p className='text-danger fw-bold'>{error}</p>
            <Button variant="primary fw-bold" type="submit">
                Submit
            </Button>
        </Form>
        <div className='password'><button className="btn btn-outline btn-primary" onClick={togglePassword}>
                        {passwordType === "password" ? <AiFillEye className='eye'></AiFillEye> : <AiFillEyeInvisible className='eye'></AiFillEyeInvisible>}
                    </button></div>
        <p className='text-success fw-bold'>{success}</p>
        <div><small>Don't you have any account? Please <Link to='/sign-up'>Sign Up</Link> now.</small></div>
        <div><small>Have you forgot password? Please <button className='btn btn-link' onClick={resetPassword}>Reset Password.</button></small></div>
    </div>
);
};

export default Login;