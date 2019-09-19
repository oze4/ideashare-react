import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to='/post-form'>+</Link>
      </li>

      <li>
        <Link to='/dashboard'>
          <i className='fas fa-user' />{' '}
          <span className='hide-sm'>My Dashboard</span>
        </Link>
      </li>

      <li>
        <a onClick={logout} href='/'>
          <i className='fas fa-sign-out-alt' />
          {'  '}
          <span className='hide-sm'>Log out</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to='/login'>+</Link>
      </li>

      <Link to='/register'>
        <li>Sign up</li>
      </Link>
      <Link to='/login'>
        <li>Log in</li>
      </Link>
    </ul>
  );
  return (
    <nav className='navbar bg-white'>
      <div className='left-nav'>
        <h1>
          <Link to='/'>
            <img src='/images/logo.svg' alt='logo' />
            <h1>IDEATOSHARE</h1>
          </Link>
        </h1>

        <Link to='/about'>About</Link>
      </div>

      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logout }
)(Navbar);
