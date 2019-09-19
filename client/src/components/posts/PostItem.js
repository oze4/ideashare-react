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
  post: { _id, title, name, avatar, user, likes, comments, date, status },
  history
}) => {
  let xxx;
  if (status === 'red') {
    // xxx = <i className='fas fa-times red' />;
    xxx = <p>To Tackle</p>;
  } else if (status === 'yellow') {
    // xxx = <i className='fas fa-spinner yellow' />;
    xxx = <p>On Progress</p>;
  } else if (status === 'green') {
    // xxx = <i className='fas fa-check green' />;
    xxx = <p>Done</p>;
  } else {
    xxx = <p>No Status</p>;
  }
  return (
    <div className={`post-item ${status}-border`}>
      <div className='left'>
        <Link to={`/profile/${user}`}>
          <img className='post-avatar' src={avatar} alt={`avatar${name}`} />
          <p>{name}</p>
        </Link>
        {!auth.loading &&
          auth.isAuthenticated &&
          auth.user &&
          user === auth.user._id && (
            <button
              onClick={e => deletePost(_id, history)}
              type='button'
              className='delete-post-button'
            >
              <i class='fas fa-trash-alt'></i>
            </button>
          )}
      </div>
      <Link to={`posts/${_id}`} className='middle'>
        <p className='my-1 post-item-content'>{title}</p>
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
      </Link>

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
            <i class='fas fa-sort-up text-primary' />{' '}
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
            <i class='fas fa-sort-up text-grey' />{' '}
            <div className='comment-count'>
              {likes.length > 0 ? likes.length : 0}
            </div>
          </button>
        )}

        <button className='status' onClick={e => toggleStatus(_id)}>
          <p className='status1'>status</p>
          <p className={`status2 ${status}-status`}>{xxx}</p>
        </button>
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
