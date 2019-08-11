import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteComment } from '../../actions/post';

const CommentItem = ({
  postId,
  comment: { _id, text, name, avatar, user, date },
  auth,
  deleteComment
}) => (
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
    </div>
  </div>
);

CommentItem.propTypes = {
  postId: PropTypes.number.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteComment }
)(CommentItem);
