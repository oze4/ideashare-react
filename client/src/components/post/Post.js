import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import { getPost, getPosts } from '../../actions/post';
import { Link, withRouter } from 'react-router-dom';
import Moment from 'react-moment';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import SubCommentForm from './SubCommentForm';
import { deletePost, toggleLikePostPage } from '../../actions/post';

const Post = ({
  getPost,
  getPosts,
  post: { post, loading },
  match,
  auth,
  deletePost,
  toggleLikePostPage,
  alert,
  history
}) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost]);

  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to='/posts' className='btn'>
        Back to posts
      </Link>

      <div className='post'>
        <div className='left'>
          <Link className='user' to={`/profile/${post.user}`}>
            <img className='avatar' src={post.avatar} alt='' />
            <p className='user-name'> {post.name}</p>
          </Link>

          <div className='post-content'>
            <h1 className='post-title'>{post.title}</h1>
            <p className='post-body'>{post.body}</p>
            <p className='post-date'>
              Posted on <Moment format='YYYY/MM/DD'>{post.date}</Moment>
            </p>

            <span className='border-btn'>
              <i class='fas fa-comments border-btn' />{' '}
              {post.comments.length > 0 && (
                <span className='comment-count'>{post.comments.length}</span>
              )}
            </span>

            {!auth.loading &&
              auth.isAuthenticated &&
              auth.user &&
              post.user === auth.user._id && (
                <button
                  onClick={e => deletePost(post._id, history)}
                  type='button'
                >
                  Delete this post
                </button>
              )}
          </div>
        </div>

        <div className='right'>
          {auth &&
          auth.user &&
          post.likes.filter(arrayItem => arrayItem.user === auth.user._id)
            .length > 0 ? (
            <button
              onClick={e => toggleLikePostPage(post._id)}
              type='button'
              className='btn toggle-like primary-border'
            >
              <i class='fas fa-sort-up' />{' '}
              <div className='comment-count'>
                {post.likes.length > 0 ? post.likes.length : 0}
              </div>
            </button>
          ) : (
            <button
              onClick={e => toggleLikePostPage(post._id)}
              type='button'
              className='btn toggle-like'
            >
              <i class='fas fa-sort-up border-btn' />{' '}
              <div className='comment-count'>
                {post.likes.length > 0 ? post.likes.length : 0}
              </div>
            </button>
          )}
        </div>
      </div>

      <h2>Discussion</h2>
      <div className='discussion-section'>
        <CommentForm postId={post._id} />
        <div className='comments'>
          {post.comments.map(comment => (
            <Fragment>
              <CommentItem
                key={comment._id}
                comment={comment}
                postId={post._id}
              />
            </Fragment>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  posts: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  toggleLikePostPage: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth,
  alert: state.alert
});

export default connect(
  mapStateToProps,
  { getPost, getPosts, deletePost, toggleLikePostPage }
)(withRouter(Post));
