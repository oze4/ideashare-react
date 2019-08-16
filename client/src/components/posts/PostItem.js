import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { toggleLike, deletePost, toggleStatus } from '../../actions/post';
const PostItem = ({
  toggleLike,
  deletePost,
  toggleStatus,
  auth,
  post: { _id, title, name, avatar, user, likes, comments, date, status }
}) => {
  let xxx;
  if (status === 'red') {
    xxx = <i className='fas fa-times red' />;
  } else if (status === 'yellow') {
    xxx = <i className='fas fa-spinner yellow' />;
  } else {
    xxx = <i className='fas fa-check green' />;
  }
  return (
    <div className='post-item'>
      <div className='left'>
        <Link to={`/profile/${user}`}>
          <img className='post-avatar' src={avatar} alt={`avatar${name}`} />
          <p>{name}</p>
        </Link>
        <button className='status' onClick={e => toggleStatus(_id)}>
          {xxx}
        </button>
      </div>
      <div className='middle'>
        <p className='my-1 lead'>{title}</p>
        <p className='post-date small'>
          Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
        </p>

        <span className='border-btn'>
          <Link to={`posts/${_id}`}>
            <i className='fas fa-comments' />{' '}
            <span className='comment-count'>
              {comments.length > 0 ? comments.length : 0}
            </span>
          </Link>
        </span>
        {/* {!auth.loading &&
          auth.isAuthenticated &&
          auth.user &&
          user === auth.user._id && (
            <button
              onClick={e => deletePost(_id)}
              type='button'
              className='btn btn-danger'
            >
              <i className='fas fa-times' />
            </button>
          )} */}
      </div>

      <div className='right'>
        {auth &&
        auth.user &&
        likes.filter(arrayItem => arrayItem.user === auth.user._id).length >
          0 ? (
          <button
            onClick={e => toggleLike(_id)}
            type='button'
            className='btn toggle-like primary-border'
          >
            <i class='fas fa-sort-up' />{' '}
            <div className='comment-count'>
              {likes.length > 0 ? likes.length : 0}
            </div>
          </button>
        ) : (
          <button
            onClick={e => toggleLike(_id)}
            type='button'
            className='btn toggle-like'
          >
            <i class='fas fa-sort-up' />{' '}
            <div className='comment-count'>
              {likes.length > 0 ? likes.length : 0}
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  toggleLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  toggleStatus: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { toggleLike, deletePost, toggleStatus }
)(PostItem);
