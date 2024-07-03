import { BASE_URL } from "../../Config/api";
import {
  CREATE_COMMENT,
  DELETE_COMMENT,
  GET_ALL_COMMENT,
  LIKE_COMMENT,
  UNLIKE_COMMENT,
} from "./ActionType";

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

// Action.js
export const editComment =
  ({ data, jwt, callback }) =>
  async (dispatch) => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/comments/edit/${data.commentId}`,
        // `http://localhost:8082/api/comments/edit/${data.commentId}`,
        // `http://hehegiggle.online:8082/api/comments/edit/${data.commentId}`,
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
  } catch (error) {}
};
