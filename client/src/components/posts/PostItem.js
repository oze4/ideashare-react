import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { toggleLike, deletePost } from '../../actions/post';
const PostItem = ({
  toggleLike,
  deletePost,
  auth,
  post: { _id, title, name, avatar, user, likes, comments, date }
}) => (
  <div className='postItem bg-white p-1 my-1'>
    <div className='left'>
      <Link to={`/profile/${user}`}>
        <img className='post-avatar' src={avatar} alt={`avatar${name}`} />
        <p>{name}</p>
      </Link>
    </div>
    <div className='middle'>
      <p className='my-1 lead'>{title}</p>
      <p className='post-date small'>
        Posted on <Moment format='YYY/MM/DD'>{date}</Moment>
      </p>
      <span className='border-btn'>
        <Link to={`posts/${_id}`}>
          <i class='fas fa-comments' />{' '}
          {comments.length > 0 && (
            <span className='comment-count'>{comments.length}</span>
          )}
        </Link>
      </span>
      {!auth.loading && auth.isAuthenticated && user === auth.user._id && (
        <button
          onClick={e => deletePost(_id)}
          type='button'
          className='btn btn-danger'
        >
          <i className='fas fa-times' />
        </button>
      )}
    </div>

    <div className='right'>
      <button
        onClick={e => toggleLike(_id)}
        type='button'
        className='btn grey-border'
      >
        <i class='fas fa-sort-up' />{' '}
        <div className='comment-count'>
          {likes.length > 0 ? likes.length : 0}
        </div>
      </button>
    </div>
  </div>
);

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  toggleLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { toggleLike, deletePost }
)(PostItem);
