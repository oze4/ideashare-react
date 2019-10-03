import React from 'react';
import spinner from './spinner.gif';

const Spinner = () => (
  <div className='container-xy'>
    <div className='center-xy'>
      <img
        src={spinner}
        style={{ width: '200px', margin: 'auto', display: 'block' }}
        alt='Landing...'
      />
      <h1>loading...</h1>
    </div>
  </div>
);

export default Spinner;
