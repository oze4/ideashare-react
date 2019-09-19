import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/' />;
  }
  return (
    <div className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <p>Welcome to IdeaToShare</p>
          <p className='lead'>Share your ideas and problem with the world</p>
          <div className='buttons'>
            <Link to='/register' className='btn btn-action'>
              Sign up
            </Link>
            <Link to='/login' className='btn'>
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps)(Landing);
