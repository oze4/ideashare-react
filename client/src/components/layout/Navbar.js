import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <a onClick={logout} href='!#'>
          <i className='fas fa-sign-out-alt' />
          {'  '}
          <span className='hide-sm'>Log out</span>
        </a>
      </li>
      <li>
        <Link to='/profiles'>Ideators</Link>
      </li>

      <li>
        <Link to='/posts'>Posts</Link>
      </li>

      <li>
        <Link to='/dashboard'>
          <i className='fas fa-user' />{' '}
          <span className='hide-sm'>Dashboard</span>
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to='/profiles'>Ideators</Link>
      </li>

      <li>
        <Link to='/posts'>Posts</Link>
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
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>Idea Share</Link>
      </h1>
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
