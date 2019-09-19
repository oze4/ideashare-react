import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import { getUsers } from '../../actions/user';

const UserItem = ({ user: { users, loading }, getUsers }) => {
  useEffect(() => {
    getUsers();
  }, [getUsers]);
  return (
    <Fragment>
      {loading || users === null ? (
        <Spinner />
      ) : (
        <div className='users-grid'>
          <p className='lead'>
            <i className='fab fa-connectdevelop' /> Our Ideators
          </p>
          <div className='users'>
            <div className='flex'>
              {users.length > 0 ? (
                users.map(user => (
                  <div key={user._id}>
                    <Link to={`/profile/${user._id}`}>
                      <img className='user-avatar' src={user.avatar} />
                    </Link>
                  </div>
                ))
              ) : (
                <h4>No profiles found ...</h4>
              )}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

UserItem.propTypes = {
  user: PropTypes.object.isRequired,
  getUsers: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { getUsers }
)(UserItem);
