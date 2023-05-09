import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
const Header = () => {
    return (
        <nav>
            <Link to='/'>Home</Link>
            <Link to='/sign-up'>Sign Up</Link>
            <Link to='/log-in'>Log In</Link>
        </nav>
    );
};

export default Header;