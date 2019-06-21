import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    console.log('Success');
  };
  return (
    <Fragment>
      <div className='register-form'>
        <div className='close'>+</div>
        <h1>Sign into your account</h1>

        <form className='form' onSubmit={e => onSubmit(e)}>
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
          <input
            type='submit'
            value='Sign in'
            className='button green-button'
          />
        </form>

        <p>
          Don't have an account? <Link to='/register'>Sign up</Link>
        </p>
      </div>
    </Fragment>
  );
};

export default Login;
