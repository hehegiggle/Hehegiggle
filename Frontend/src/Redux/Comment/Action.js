import axios from "axios";
import { BASE_URL } from "../../Config/api";
import {
  CREATE_COMMENT,
  DELETE_COMMENT,
  GET_ALL_COMMENT,
  LIKE_COMMENT,
  UNLIKE_COMMENT,
  CREATE_REEL_COMMENT_REQUEST,
  CREATE_REEL_COMMENT_SUCCESS,
  CREATE_REEL_COMMENT_FAILURE,
  GET_ALL_COMMENTS_REEL_REQUEST,
  GET_ALL_COMMENTS_REEL_SUCCESS,
  GET_ALL_COMMENTS_REEL_FAILURE,
  DELETE_REEL_COMMENT_REQUEST,
  DELETE_REEL_COMMENT_SUCCESS,
  DELETE_REEL_COMMENT_FAILURE,
  UPDATE_REEL_COMMENT_REQUEST,
  UPDATE_REEL_COMMENT_SUCCESS,
  UPDATE_REEL_COMMENT_FAILURE,
  LIKE_REEL_COMMENT_REQUEST,
  LIKE_REEL_COMMENT_SUCCESS,
  LIKE_REEL_COMMENT_FAILURE,
  DISLIKE_REEL_COMMENT_REQUEST,
  DISLIKE_REEL_COMMENT_SUCCESS,
  DISLIKE_REEL_COMMENT_FAILURE,
} from "./ActionType";

// Post Action.js
export const createComment = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_URL}/api/comments/create/${data.postId}`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.jwt,
      },

      body: JSON.stringify(data.data),
    });
    const resData = await res.json();
    dispatch({ type: CREATE_COMMENT, payload: resData });
  } catch (error) {
    console.log("catch error ", error);
  }
};

export const findPostComment = (data) => async (dispatch) => {
  const res = await fetch(`${BASE_URL}/api/comments/${data.postId}`, {
    method: "GET",

    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + data.jwt,
    },
    body: JSON.stringify(data.data),
  });
  const resData = await res.json();
  dispatch({ type: "GET_USER_POST", paylod: resData });
};

export const likeComment = (data) => async (dispatch) => {
  const res = await fetch(`${BASE_URL}/api/comments/like/${data.commentId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + data.jwt,
    },
    body: JSON.stringify(data.data),
  });
  const resData = await res.json();
  dispatch({ type: LIKE_COMMENT, paylod: resData });
};

export const unLikeComment = (data) => async (dispatch) => {
  const res = await fetch(`${BASE_URL}/api/comments/unlike/${data.commentId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + data.jwt,
    },
    body: JSON.stringify(data.data),
  });
  const resData = await res.json();
  dispatch({ type: UNLIKE_COMMENT, paylod: resData });
};

export const editComment =
  ({ data, jwt, callback }) =>
  async (dispatch) => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/comments/edit/${data.commentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify({ content: data.content }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to edit comment");
      }

      const result = await response.json();
      dispatch({
        type: "EDIT_COMMENT_SUCCESS",
        payload: result,
      });
      if (callback) callback();
    } catch (error) {
      console.error(error);
      dispatch({
        type: "EDIT_COMMENT_FAILURE",
        payload: error.message,
      });
    }
  };

export const deleteComment = (data) => async (dispatch) => {
  const res = await fetch(`${BASE_URL}/api/comments/delete/${data.commentId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + data.jwt,
    },
    body: JSON.stringify(data.data),
  });
  const resData = await res.json();
  dispatch({ type: DELETE_COMMENT, payload: resData });
};

export const getAllComments = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_URL}/api/comments/post/${data.postId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.jwt,
      },
    });
    const resData = await res.json();
    dispatch({ type: GET_ALL_COMMENT, payload: resData });
  } catch (error) {
    console.log("Error while getting all comments of post: ", error);
  }
};

// Reel Action.js
export const createReelComment = (data) => async (dispatch) => {
  dispatch({ type: CREATE_REEL_COMMENT_REQUEST });
  try {
    const req = await axios.post(
      `${BASE_URL}/api/comments/create/reel/${data.reelId}`,
      {
        content: data.content,
      },
      {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }
    );

    dispatch({ type: CREATE_REEL_COMMENT_SUCCESS, payload: req.data });
  } catch (error) {
    dispatch({ type: CREATE_REEL_COMMENT_FAILURE });
    console.log(
      `Error while commenting on reel with Id ${data.reelId}: `,
      error.message
    );
  }
};

export const getAllCommentsOfReel = (data) => async (dispatch) => {
  dispatch({ type: GET_ALL_COMMENTS_REEL_REQUEST });
  try {
    const req = await axios.get(
      `${BASE_URL}/api/comments/reel/${data.reelId}`,
      {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }
    );

    dispatch({ type: GET_ALL_COMMENTS_REEL_SUCCESS, payload: req.data });
  } catch (error) {
    dispatch({ type: GET_ALL_COMMENTS_REEL_FAILURE });
    console.log(
      `Error while getting comments of reel with Id ${data.reelId}: `,
      error.message
    );
  }
};

export const deleteReelComment = (data) => async (dispatch) => {
  dispatch({ type: DELETE_REEL_COMMENT_REQUEST });
  try {
    const req = await axios.delete(
      `${BASE_URL}/api/comments/delete/reel/${data.commentId}`,
      {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }
    );

    dispatch({ type: DELETE_REEL_COMMENT_SUCCESS, payload: req.data });
  } catch (error) {
    dispatch({ type: DELETE_REEL_COMMENT_FAILURE });
    console.log(
      `Error occurred while deleting the reel comment ${data.commentId}: `,
      error.message
    );
  }
};

export const likeReelComment = (data) => async (dispatch) => {
  dispatch({ type: LIKE_REEL_COMMENT_REQUEST });
  try {
    const req = await axios.put(
      `${BASE_URL}/api/comments/like/reel/${data.commentId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }
    );

    dispatch({ type: LIKE_REEL_COMMENT_SUCCESS, payload: req.data });
  } catch (error) {
    console.log(
      `Error occured while liking the reel comment: ${data.commentId}`,
      error.message
    );
    dispatch({ type: LIKE_REEL_COMMENT_FAILURE });
  }
};

export const unLikeReelComment = (data) => async (dispatch) => {
  dispatch({ type: DISLIKE_REEL_COMMENT_REQUEST });
  try {
    const req = axios.put(
      `${BASE_URL}/api/comments/dislike/reel/${data.commentId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }
    );

    dispatch({ type: DISLIKE_REEL_COMMENT_SUCCESS, payload: req.data });
  } catch (error) {
    console.log(
      `Error occured while Dis-liking the reel comment: ${data.commentId}`,
      error.message
    );
    dispatch({ type: DISLIKE_REEL_COMMENT_FAILURE });
  }
};
export const editReelComment = (data, callback) => async (dispatch) => {
  dispatch({ type: UPDATE_REEL_COMMENT_REQUEST });
  
  try {
    const res = await axios.put(
      `${BASE_URL}/api/comments/edit/reel/${data.commentId}`,
      { content: data.content },
      {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }
    );

    dispatch({ type: UPDATE_REEL_COMMENT_SUCCESS, payload: res.data });

    if (callback) callback();
  } catch (error) {
    console.log(
      `Error while updating the comment content of ${data.commentId}`,
      error.message
    );
    // Dispatch failure action
    dispatch({ type: UPDATE_REEL_COMMENT_FAILURE });
  }
};
