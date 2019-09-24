import {
  GET_NOTIFICATION,
  SEE_NOTIFICATION,
  UNSEE_NOTIFICATION
} from '../actions/types';

const initialState = {
  notification: [],
  seen: true,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_NOTIFICATION:
      return {
        ...state,
        // notification: payload,
        seen: payload.seen,
        loading: false
      };
    case SEE_NOTIFICATION:
      return { ...state, seen: true, loading: false };
    case UNSEE_NOTIFICATION:
      return { ...state, seen: false, loading: false };
    default:
      return state;
  }
}
