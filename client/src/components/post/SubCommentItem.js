import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteSubComment, toggleCommentLike } from '../../actions/post';
import Spinner from '../layout/Spinner';

const SubCommentItem = ({
  postId,
  subcomment: { _id, text, name, avatar, user, date, likes },
  auth,
  commentid,
  deleteSubComment
}) => (
  <div className='subcomment-item'>
    <div>
      <Link className='user' to={`/profile/${user}`}>
        <img className='avatar' src={avatar} alt='' />
        <h4 className='user-name'>{name}</h4>
      </Link>
    </div>
    <div>
      <p className='comment-content'>{text}</p>

      <div className='comment-info'>
        <p className='comment-date'>
          <Moment format='YYYY/MM/DD'>{date}</Moment>
        </p>

        {!auth.loading && auth.isAuthenticated && user === auth.user._id && (
          <button
            onClick={e => deleteSubComment(postId, commentid, _id)}
            type='button'
            className='remove-sub-comment'
          >
            Delete
          </button>
        )}
      </div>

      {/* <button onClick={e => toggleCommentLike(postId, _id)}>
      like
      {likes.length}
    </button> */}
    </div>
  </div>
);

SubCommentItem.propTypes = {
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
  { deleteSubComment, toggleCommentLike }
)(SubCommentItem);
