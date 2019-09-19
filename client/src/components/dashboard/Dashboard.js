import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import { getPosts } from '../../actions/post';
import PostItem from '../posts/PostItem';
const Dashboard = ({
  getCurrentProfile,
  getPosts,
  deleteAccount,
  auth: { user },
  post: { posts },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getPosts();
    getCurrentProfile();
  }, [getCurrentProfile, getPosts]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Dashboard</h1>
      <p>
        <p>
          <i className='fas fa-user'></i>Hello {user && user.name}, Welcome to
          IdeaShare
        </p>
      </p>

      {profile !== null ? (
        <div className='profile-action'>
          <Link to={`/profile/${user._id}`} className='btn btn-primary'>
            My profile
          </Link>
          <DashboardActions />
          <div>
            <button className='btn btn-danger' onClick={() => deleteAccount()}>
              <i class='fas fa-user-minus'></i>
              Delete My Account
            </button>
          </div>
        </div>
      ) : (
        <Fragment>
          <p>You have not created profile yet, let's add some info.</p>
          <div className='profile-action'>
            <Link to='create-profile' className='btn btn-primary'>
              Create Profile
            </Link>
            <button className='btn btn-danger' onClick={() => deleteAccount()}>
              <i class='fas fa-user-minus'></i>
              Delete My Account
            </button>
          </div>
        </Fragment>
      )}
      <div className='my-post-section'>
        <h2>My posts</h2>
        {posts
          .filter(post => post.user === user._id)
          .map(mypost => (
            <PostItem key={mypost._id} post={mypost} />
          ))}
      </div>
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  getPosts: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPosts, getCurrentProfile, deleteAccount }
)(Dashboard);
