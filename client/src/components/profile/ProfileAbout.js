import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ({
  profile: {
    bio,
    skills,
    user: { name }
  }
}) => {
  const firstName = name.trim().split(' ')[0];

  return (
    <div class='profile-about'>
      {bio && (
        <Fragment>
          <h2 class='text-primary'>
            {firstName[firstName.length - 1] === 's'
              ? `${firstName}'`
              : `${firstName}'s`}{' '}
            Bio
          </h2>
          <p className='bio'>{bio}</p>
        </Fragment>
      )}

      <div>
        <h2 class='text-primary'>Skills Set</h2>
        <div className='skills'>
          {skills.map((skill, index) => (
            <div key={index} class='p-1'>
              <i class='fa fa-check' /> {skill}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
