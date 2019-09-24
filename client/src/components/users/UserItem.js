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

  const shuffleWords = array => {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  };

  return (
    <Fragment>
      {loading || users === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <h2>
            <i className='fab fa-connectdevelop' /> Our Ideators Today
          </h2>
          <div className='users'>
            <div className='flex'>
              {users.length > 0 ? (
                shuffleWords(users)
                  .slice(0, 10)
                  .map(user => (
                    <div key={user._id}>
                      <Link to={`/profile/${user._id}`}>
                        <img
                          className='user-avatar'
                          src={user.avatar}
                          alt='user-avatar'
                        />
                      </Link>
                    </div>
                  ))
              ) : (
                <h4>No profiles found ...</h4>
              )}
            </div>
            <hr />
            <Link to='/post-form'>Join them</Link>
          </div>
        </Fragment>
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
