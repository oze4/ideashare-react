import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NotificationIcon from './NotificationIcon';
import { logout } from '../../actions/auth';
import { useMediaPredicate } from 'react-media-hook';
const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const biggerThan700 = useMediaPredicate('(min-width: 700px)');
  const [isActive, setIsActive] = useState(false);
  const toggle = () => setIsActive(!isActive);
  const authLinks = (
    <ul className={isActive ? 'block' : 'hide'}>
      <li>
        <Link to='/post-form' onClick={e => setIsActive(false)}>
          +
        </Link>
      </li>

      <li>
        <Link to='/dashboard' onClick={e => setIsActive(false)}>
          <i className='fas fa-user' />{' '}
          <span className='hide-sm'>My Dashboard</span>
        </Link>
      </li>
      <li>
        <NotificationIcon />
      </li>
      <li>
        <a onClick={logout} href='/'>
          <i className='fas fa-sign-out-alt' />
          {'  '}
          <span className='hide-sm'>Log out</span>
        </a>
      </li>
      <li>
        {' '}
        {!biggerThan700 && (
          <Link to='/about' onClick={e => setIsActive(false)}>
            About
          </Link>
        )}
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className={isActive ? 'block' : 'hide'}>
      <li>{/* <Link to='/login'>+</Link> */}</li>

      <Link to='/register' onClick={e => setIsActive(false)}>
        <li>Sign up</li>
      </Link>
      <Link to='/login' onClick={e => setIsActive(false)}>
        <li>Log in</li>
      </Link>

      {!biggerThan700 && (
        <Link to='/about' onClick={e => setIsActive(false)}>
          <li>About</li>
        </Link>
      )}
    </ul>
  );
  return (
    <nav className='navbar bg-white'>
      <div className='fix-content'>
        <h1>
          <Link to='/' onClick={e => setIsActive(false)}>
            {biggerThan700 ? (
              <Fragment>
                <img src='/images/logo.svg' alt='logo' />
                <h1>IDEATOSHARE</h1>
              </Fragment>
            ) : (
              <img src='/images/logo.svg' alt='logo' />
            )}
          </Link>
        </h1>
        {biggerThan700 && (
          <Link to='/about' onClick={e => setIsActive(false)}>
            About
          </Link>
        )}
        <button
          onClick={e => toggle()}
          className={
            isActive
              ? 'hamburger hamburger--collapse is-active'
              : 'hamburger hamburger--collapse'
          }
          type='button'
        >
          <span className='hamburger-box'>
            <span className='hamburger-inner' />
          </span>
        </button>
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
