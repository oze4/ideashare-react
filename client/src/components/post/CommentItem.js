import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteComment, toggleCommentLike } from '../../actions/post';
import SubCommentItem from './SubCommentItem';
import SubCommentForm from './SubCommentForm';

const CommentItem = ({
  postId,
  comment: { _id, text, name, avatar, user, date, likes, subComments },
  auth,
  deleteComment,
  toggleCommentLike
}) => {
  const [displayForm, toggleDisplayForm] = useState(false);
  return (
    <div className='comment-item'>
      <div>
        <Link className='user' to={`/profile/${user}`}>
          <img className='avatar' src={avatar} alt='' />
          <h4 className='user-name'>{name}</h4>
        </Link>
      </div>
      <div>
        <p className='comment-content'>{text}</p>
        <p class='comment-date'>
          <Moment format='YYYY/MM/DD'>{date}</Moment>
        </p>

        <div className='comment-panel'>
          {auth &&
          auth.user &&
          likes.filter(arrayItem => arrayItem.user === auth.user._id).length >
            0 ? (
            <button
              className='text-primary'
              onClick={e => toggleCommentLike(postId, _id)}
            >
              Upvote &#40;
              {likes.length}&#41;
            </button>
          ) : (
            <button onClick={e => toggleCommentLike(postId, _id)}>
              Upvote &#40;
              {likes.length}&#41;
            </button>
          )}
          <button
            className='toggle-form-button'
            onClick={e => toggleDisplayForm(!displayForm)}
          >
            {!displayForm ? <p>Reply</p> : <p>Reply</p>}
          </button>
        </div>

        {!auth.loading && auth.isAuthenticated && user === auth.user._id && (
          <button
            onClick={e => deleteComment(postId, _id)}
            type='button'
            className='remove-comment'
          >
            Delete
            {/* <i className='fas fa-times' /> */}
          </button>
        )}

        <div className='subcomment-section'>
          <div className='subcomment-form'>
            {displayForm && <SubCommentForm postId={postId} commentId={_id} />}
          </div>

          <div className='subcomment-items'>
            {subComments.map(subcomment => (
              <SubCommentItem
                commentid={_id}
                subcomment={subcomment}
                postId={postId}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  postId: PropTypes.number.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
  toggleCommentLike: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteComment, toggleCommentLike }
)(CommentItem);
