import {
  CREATE_COMMENT,
  DELETE_COMMENT,
  EDIT_COMMENT,
  GET_ALL_COMMENT,
  GET_ALL_COMMENTS_REEL_SUCCESS,
  GET_POST_COMMENT,
  GET_REEL_COMMENT,
  LIKE_COMMENT,
  DELETE_REEL_COMMENT_SUCCESS,
  UPDATE_REEL_COMMENT_SUCCESS,
  LIKE_REEL_COMMENT_SUCCESS,
  CREATE_REEL_COMMENT_SUCCESS,
} from "./ActionType";

const initialState = {
  createdComment: null,
  postComments: null,
  likedComment: null,
  updatedComment: null,
  deletedComment: null,
  comments: null,
  reelComments: null,
  reelCreatedComment: null,
  reelCommentLiked: null,
  reelUpdatedComment: null,
  reelDeletedComment: null,
};

export const commentReducer = (store = initialState, { type, payload }) => {
  if (type === CREATE_COMMENT) {
    return { ...store, createdComment: payload };
  } else if (type === GET_POST_COMMENT) {
    return { ...store, postComments: payload };
  } else if (type === LIKE_COMMENT) {
    return { ...store, likedComment: payload };
  } else if (type === EDIT_COMMENT) {
    return { ...store, updatedComment: payload };
  } else if (type === DELETE_COMMENT) {
    return { ...store, deletedComment: payload };
  } else if (type === GET_ALL_COMMENT) {
    return { ...store, comments: payload };
  } else if (type === GET_REEL_COMMENT) {
    return { ...store, reelComments: payload };
  } else if (type === GET_ALL_COMMENTS_REEL_SUCCESS) {
    return { ...store, comments: payload };
  } else if (type === UPDATE_REEL_COMMENT_SUCCESS) {
    return { ...store, reelUpdatedComment: payload };
  } else if (type === DELETE_REEL_COMMENT_SUCCESS) {
    return { ...store, reelDeletedComment: payload };
  } else if (type === LIKE_REEL_COMMENT_SUCCESS) {
    return { ...store, reelCommentLiked: payload };
  } else if (type === CREATE_REEL_COMMENT_SUCCESS) {
    return { ...store, reelCreatedComment: payload };
  }
  return store;
};
