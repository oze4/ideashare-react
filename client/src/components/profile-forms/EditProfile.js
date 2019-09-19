import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';

const EditProfile = ({
  profile: { profile, loading },
  getCurrentProfile,
  createProfile,
  history,
  auth
}) => {
  const [formData, setFormData] = useState({
    website: '',
    location: '',
    status: '',
    skills: '',
    bio: '',
    youtube: '',
    twitter: '',
    facebook: '',
    instagram: '',
    linkedin: ''
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  useEffect(() => {
    getCurrentProfile();

    setFormData({
      website: loading || !profile.website ? '' : profile.website,
      location: loading || !profile.location ? '' : profile.location,
      status: loading || !profile.status ? '' : profile.status,
      skills: loading || !profile.skills ? '' : profile.skills,
      bio: loading || !profile.bio ? '' : profile.bio,
      youtube: loading || !profile.youtube ? '' : profile.youtube,
      twitter: loading || !profile.twitter ? '' : profile.twitter,
      facebook: loading || !profile.facebook ? '' : profile.facebook,
      instagram: loading || !profile.instagram ? '' : profile.instagram,
      linkedin: loading || !profile.linkedin ? '' : profile.linkedin
    });
  }, [loading, getCurrentProfile]);

  const {
    website,
    location,
    status,
    skills,
    bio,
    youtube,
    twitter,
    facebook,
    instagram,
    linkedin
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history, true);
  };

  if (!auth.isAuthenticated) {
    return <Redirect to='/login' />;
  }
  return (
    <div className='edit-profile-section'>
      <h1 className='large text-primary'>Create Your Profile</h1>
      <p>
        <i className='fas fa-user' /> Let's get some information to make your
        profile stand out
      </p>
      <p>* = required field</p>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <p className='label'>* What are you?</p>
          <select name='status' value={status} onChange={e => onChange(e)}>
            <option value='0'>* Select Professional Status</option>
            <option value='Artist'>Artist</option>
            <option value='Developer'>Developer</option>
            <option value='Designer'>Designer</option>
            <option value='Professor'>Professor</option>
            <option value='Student'>Student</option>
            <option value='Other'>Other</option>
          </select>
          <p className='small'>
            Give us an idea of where you are at in your career
          </p>
        </div>

        <div className='form-group'>
          <p className='label'>Your website</p>
          <input
            type='text'
            placeholder='Website'
            name='website'
            value={website}
            onChange={e => onChange(e)}
          />
          <p className='small'>Could be your own or a company website</p>
        </div>
        <div className='form-group'>
          <p className='label'>Where do you live?</p>
          <input
            type='text'
            placeholder='Location'
            name='location'
            value={location}
            onChange={e => onChange(e)}
          />
          <p className='small'>City & state suggested (eg. Boston, MA)</p>
        </div>
        <div className='form-group'>
          <p className='label'>What are your skills you want to share?</p>
          <input
            type='text'
            placeholder='* Skills'
            name='skills'
            value={skills}
            onChange={e => onChange(e)}
          />
          <p className='small'>
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </p>
        </div>
        <div className='form-group'>
          <p className='label'>Tell us a little about yourself</p>
          <textarea
            placeholder='A short bio of yourself'
            name='bio'
            value={bio}
            onChange={e => onChange(e)}
          />
        </div>

        <div className='my-2'>
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type='button'
            className='btn btn-light'
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {displaySocialInputs && (
          <Fragment>
            <div className='form-group social-input'>
              <i className='fab fa-twitter fa-2x' />
              <input
                type='text'
                placeholder='Twitter URL'
                name='twitter'
                value={twitter}
                onChange={e => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-facebook fa-2x' />
              <input
                type='text'
                placeholder='Facebook URL'
                name='facebook'
                value={facebook}
                onChange={e => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-youtube fa-2x' />
              <input
                type='text'
                placeholder='YouTube URL'
                name='youtube'
                value={youtube}
                onChange={e => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-linkedin fa-2x' />
              <input
                type='text'
                placeholder='Linkedin URL'
                name='linkedin'
                value={linkedin}
                onChange={e => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-instagram fa-2x' />
              <input
                type='text'
                placeholder='Instagram URL'
                name='instagram'
                value={instagram}
                onChange={e => onChange(e)}
              />
            </div>
          </Fragment>
        )}

        <input type='submit' className='btn btn-primary my-1' />
        <Link className='m-1' to='dashboard'>
          Go Back
        </Link>
      </form>
    </div>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(EditProfile));
