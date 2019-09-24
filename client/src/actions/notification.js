import axios from 'axios';
import {
  GET_NOTIFICATION,
  SEE_NOTIFICATION,
  UNSEE_NOTIFICATION,
  POST_ERROR
} from './types';

// Get Notification
export const getNotification = () => async dispatch => {
  try {
    const res = await axios.get('/api/notification');
    dispatch({
      type: GET_NOTIFICATION,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// See Notification
export const seeNotification = () => async dispatch => {
  try {
    const res = await axios.post('/api/notification/see');
    dispatch({
      payload: res.data,
      type: SEE_NOTIFICATION
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Unsee Notification
export const unseeNotification = () => async dispatch => {
  try {
    const res = await axios.get('/api/notification/unsee');
    dispatch({
      payload: res.data,
      type: UNSEE_NOTIFICATION
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
