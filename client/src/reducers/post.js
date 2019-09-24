import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  UPDATE_LIKE,
  UPDATE_COMMENT_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
  ADD_SUB_COMMENT,
  REMOVE_SUB_COMMENT,
  UPDATE_STATUS
} from '../actions/types';

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        // posts: [...state.posts, ...payload],
        posts: payload,
        loading: false
      };
    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false
      };
    case ADD_POST:
      return {
        ...state,
        post: payload,
        // posts: [payload, ...state.posts],
        loading: false
      };

    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };

    case UPDATE_COMMENT_LIKES:
      return {
        ...state,
        post: {
          ...state.post,
          comments: payload
        },
        loading: false
      };

    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
        loading: false
      };
    case UPDATE_LIKE:
      return {
        ...state,
        post: { ...state.post, likes: payload },
        loading: false
      };

    case UPDATE_STATUS:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === payload.id ? { ...post, status: payload.status } : post
        ),
        loading: false
      };

    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== payload),
        loading: false
      };
    case ADD_COMMENT:
      return {
        ...state,
        // payload is all the comments
        post: { ...state.post, comments: payload },
        loading: false
      };

    case ADD_SUB_COMMENT:
      return {
        ...state,
        // payload is all the comments of a post
        post: { ...state.post, comments: payload },
        loading: false
      };

    case REMOVE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            comment => comment._id !== payload
          ),
          loading: false
        }
      };

    case REMOVE_SUB_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: payload
          // comments: state.post.comments.map(comment =>
          //   {
          //   if (comment._id === payload.commentId) {
          //     comment.subComments.filter(
          //       subcomment => subcomment._id === payload.subcommentId
          //     );
          //   }
          // }
          // )
        },
        loading: false
      };

    default:
      return state;
  }
}
