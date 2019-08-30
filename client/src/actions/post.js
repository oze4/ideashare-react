import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_POSTS,
  POST_ERROR,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  UPDATE_LIKES,
  UPDATE_COMMENT_LIKES,
  ADD_COMMENT,
  REMOVE_COMMENT,
  UPDATE_STATUS
} from './types';

//Get posts
export const getPosts = () => async dispatch => {
  try {
    console.log('1');
    const res = await axios.get('/api/posts');
    console.log('2');
    dispatch({
      type: GET_POSTS,
      payload: res.data
    });
    console.log('3');
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get a single post
export const getPost = id => async dispatch => {
  try {
    const res = await axios.get(`/api/posts/${id}`);
    dispatch({
      type: GET_POST,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.message, status: err.name }
    });
  }
};

// toggleLike
export const toggleLike = id => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/togglelike/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
    });
  } catch (err) {
    dispatch(setAlert('Please login to vote', 'danger'));

    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// toggleLike of a comment
export const toggleCommentLike = (id, comment_id) => async dispatch => {
  try {
    const res = await axios.put(
      `/api/posts/comment/${id}/${comment_id}/togglelike_comment`
    );

    dispatch({
      type: UPDATE_COMMENT_LIKES,
      payload: res.data
    });
  } catch (err) {
    dispatch(setAlert('Please login to like', 'danger'));

    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Add like
export const addLike = id => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/like/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Remove like
export const removeLike = id => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/unlike/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete post
export const deletePost = (id, history) => async dispatch => {
  try {
    const approved = window.confirm(
      'Are you sure you want to delet this post?'
    );
    if (approved) {
      await axios.delete(`/api/posts/${id}`);

      dispatch({
        type: DELETE_POST,
        payload: id
      });

      dispatch(setAlert('Post Removed', 'success'));
      history.push('/');
    }
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const addPost = (formData, history) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const res = await axios.post('/api/posts', formData, config);
    dispatch({
      type: ADD_POST,
      payload: res.data
    });

    dispatch(setAlert('Post Created', 'success'));
    history.push(`/posts/${res.data._id}`);
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// add comment
export const addComment = (postId, formData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const res = await axios.post(
      `/api/posts/comment/${postId}`,
      formData,
      config
    );
    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    });

    dispatch(setAlert('Comment Added', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete Comment
export const deleteComment = (postId, commentId) => async dispatch => {
  try {
    const res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId
    });

    dispatch(setAlert('Comment Removed', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// update status of the post
export const toggleStatus = id => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/status/${id}`);

    dispatch({
      type: UPDATE_STATUS,
      payload: { id, status: res.data }
    });
  } catch (err) {
    dispatch(setAlert('You are not authorized', 'danger'));
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
