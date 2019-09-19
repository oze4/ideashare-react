import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfileById } from '../../actions/profile';
import { getPosts } from '../../actions/post';
import ProfileTop from './ProfileTop';
import PostItem from '../posts/PostItem';
import ProfileAbout from './ProfileAbout';

const Profile = ({
  getProfileById,
  getPosts,
  profile: { profile, loading },
  auth,
  post: { posts },
  match
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
    getPosts();
  }, [getProfileById, getPosts, match.params.id]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          {!profile ? (
            <Fragment>
              <h1>Sorry, this user doesn't not exist anymore</h1>
              <Link to='/'>
                <i class='fas fa-chevron-left'></i>Back to Home
              </Link>
            </Fragment>
          ) : (
            <Fragment>
              {/* <Link to='/profiles' className='btn btn-light'>
                Back To Profiles
              </Link> */}

              {auth.isAuthenticated &&
                auth.loading === false &&
                auth.user._id === profile.user._id && (
                  <Link to='/edit-profile' className='btn btn-dark'>
                    Edit Profile
                  </Link>
                )}

              <div className='profile-section'>
                <ProfileTop profile={profile} />
                <ProfileAbout profile={profile} />
              </div>
              <div className='look-down'>
                <i className='fas fa-chevron-down fa-2x'></i>
                <i className='fas fa-chevron-down fa-2x relative'></i>
              </div>

              <h2>Posts from {profile.user.name}</h2>
              {posts
                .filter(post => post.user === profile.user._id)
                .map(mypost => (
                  <PostItem key={mypost._id} post={mypost} />
                ))}
            </Fragment>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  post: state.post
});
export default connect(
  mapStateToProps,
  { getProfileById, getPosts }
)(Profile);
