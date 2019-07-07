import React, { Fragment } from 'react';
import spinner from './spinner.gif';

export default () => (
  <div className='container-xy'>
    <div className='center-xy'>
      <img
        src={spinner}
        style={{ width: '200px', margin: 'auto', display: 'block' }}
        alt='Landing...'
      />
    </div>
  </div>
);
