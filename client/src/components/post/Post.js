import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import { getPost, getPosts } from '../../actions/post';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import { addLike, removeLike, deletePost } from '../../actions/post';

const Post = ({
  getPost,
  getPosts,
  post: { post, posts, loading },
  match,
  auth,
  addLike,
  removeLike,
  deletePost
}) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to='/posts' className='btn'>
        Back to posts
      </Link>
      <div className='post bg-white p-1 my-1'>
        <div>
          <Link to={`/profile/${post.user}`}>
            <img className='round-img' src={post.avatar} alt='' />
            <h4> {post.name}</h4>
          </Link>
        </div>
        <div>
          <p className='my-1'>{post.title}</p>
          <p>{post.body}</p>
          <p className='post-date'>
            Posted on <Moment format='YYY/MM/DD'>{post.date}</Moment>
          </p>
        </div>

        <button
          onClick={e => addLike(post._id)}
          type='button'
          className='btn btn-light'
        >
          <i className='fas fa-thumbs-up' />{' '}
          <span>
            {/* {post.likes.length > 0 &&
                posts.map(x => x._id === post._id && <h2>{x.likes.length}</h2>)} */}

            {post.likes.length > 0 ? (
              posts.map(x => x._id === post._id && <h2>{x.likes.length}</h2>)
            ) : (
              <h1>0</h1>
            )}

            {/* {post.likes.length > 0 && (
                <span className='comment-count'>{post.likes.length}</span>
              )} */}
          </span>
        </button>

        <button
          onClick={e => removeLike(post._id)}
          type='button'
          className='btn btn-light'
        >
          <i className='fas fa-thumbs-down' />
        </button>

        <Link to={`posts/${post._id}`} className='btn btn-primary'>
          Discussion{' '}
          {post.comments.length > 0 && (
            <span className='comment-count'>{post.comments.length}</span>
          )}
        </Link>
      </div>
      <CommentForm postId={post._id} />

      <div className='comments'>
        {post.comments.map(comment => (
          <CommentItem key={comment._id} comment={comment} postId={post._id} />
        ))}
      </div>
    </Fragment>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  posts: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPost, getPosts, addLike, removeLike, deletePost }
)(Post);
