import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
  return (
    <div className='dash-buttons'>
      <Link to='/edit-profile' className='btn btn-light'>
        <i class='fas fa-edit'></i> Edit
      </Link>
    </div>
  );
};

export default DashboardActions;
