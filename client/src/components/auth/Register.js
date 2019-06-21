import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }
  return (
    <Fragment>
      <div className='register-form'>
        <div className='close'>+</div>
        <h1>Create your account</h1>

        <form className='form' onSubmit={e => onSubmit(e)}>
          <div className='form-group'>
            <input
              name='name'
              type='text'
              placeholder='Name'
              requried
              value={name}
              onChange={e => onChange(e)}
            />
          </div>

          <div className='form-group'>
            <input
              name='email'
              type='email'
              placeholder='E-mail'
              value={email}
              onChange={e => onChange(e)}
            />
          </div>

          <div className='form-group'>
            <input
              name='password'
              type='text'
              placeholder='Password'
              minLength='6'
              value={password}
              onChange={e => onChange(e)}
            />
          </div>

          <div className='form-group'>
            <input
              name='password2'
              type='text'
              placeholder='Confirm Password'
              minLength='6'
              value={password2}
              onChange={e => onChange(e)}
            />
          </div>
          <input
            type='submit'
            value='Create account'
            className='button green-button'
          />
        </form>

        <p>
          Already have an account? <Link to='/login'>Sign in</Link>
        </p>
      </div>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { setAlert, register }
)(Register);
