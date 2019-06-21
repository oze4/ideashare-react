import React from 'react';
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>Idea Share</Link>
      </h1>
      <ul>
        <Link to='/register'>
          <li>Sign up</li>
        </Link>
        <Link to='/login'>
          <li>Log in</li>
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;
