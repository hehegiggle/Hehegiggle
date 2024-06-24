import { BASE_URL } from "../../Config/api";
import {
  CREATE_COMMENT,
  DELETE_COMMENT,
  EDIT_COMMENT,
  GET_ALL_COMMENT,
  LIKE_COMMENT,
  UNLIKE_COMMENT,
} from "./ActionType";

export const createComment = (data) => async (dispatch) => {
  try {
    console.log("data create comment", data);
    const res = await fetch(`${BASE_URL}/api/comments/create/${data.postId}`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.jwt,
      },

      body: JSON.stringify(data.data),
    });
    console.log("create comment res ", res);

    const resData = await res.json();

    console.log("created comment", resData);
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
  console.log("like comment :- ", resData);
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
  console.log("unliked comment ", resData);
  dispatch({ type: UNLIKE_COMMENT, paylod: resData });
};

// Action.js
export const editComment =
  ({ data, jwt, callback }) =>
  async (dispatch) => {
    try {
      console.log("Editing comment with ID:", data.commentId);
      console.log("Content:", data.content);

      const response = await fetch(
        `http://localhost:8082/api/comments/edit/${data.commentId}`,
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
      console.log("edited comment", result);
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
  console.log("deleted comment ", resData);
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
    console.log("all comment ", resData);
    dispatch({ type: GET_ALL_COMMENT, payload: resData });
  } catch (error) {}
};
