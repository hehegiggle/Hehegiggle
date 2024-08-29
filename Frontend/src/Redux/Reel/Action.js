import axios from "axios";
import { BASE_URL } from "../../Config/api";
import {
  CREATE_REEL_FAILURE,
  CREATE_REEL_REQUEST,
  CREATE_REEL_SUCCESS,
  GET_ALL_REELS_FAILURE,
  GET_ALL_REELS_REQUEST,
  GET_ALL_REELS_SUCCESS,
  REQ_USER_REELS_FAILURE,
  REQ_USER_REELS_SUCCESS,
  DELETE_REEL_FAILURE,
  DELETE_REEL_REQUEST,
  DELETE_REEL_SUCCESS,
  LIKE_REEL_FAILURE,
  LIKE_REEL_SUCCESS,
  LIKE_REEL_REQUEST,
  DISLIKE_REEL_FAILURE,
  DISLIKE_REEL_REQUEST,
  DISLIKE_REEL_SUCCESS,
} from "./ActionType";

//Create Reel
export const createReel = (data) => async (dispatch) => {
  dispatch({ type: CREATE_REEL_REQUEST });
  try {
    const response = await fetch(`${BASE_URL}/api/reels`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.jwt,
      },
      body: JSON.stringify(data.reelData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create reel");
    }
    const responseData = await response.json();
    console.log("created reel ", responseData);
    dispatch({
      type: CREATE_REEL_SUCCESS,
      payload: responseData,
    });
  } catch (error) {
    dispatch({
      type: CREATE_REEL_FAILURE,
      payload: error.message,
    });
  }
};

//Get all reels
export const getAllReels = (jwt) => async (dispatch) => {
  dispatch({ type: GET_ALL_REELS_REQUEST });
  try {
    const response = await fetch(`${BASE_URL}/api/reels`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to get reels");
    }

    const responseData = await response.json();
    dispatch({
      type: GET_ALL_REELS_SUCCESS,
      payload: responseData,
    });
  } catch (error) {
    console.log("An error occurred: ", error);
    dispatch({
      type: GET_ALL_REELS_FAILURE,
      payload: error.message,
    });
  }
};

//Get reel by userId
export const getReelByUserId = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_URL}/api/reels/user/${data.userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.jwt}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to find user reels");
    }

    const resData = await res.json();
    if (resData.length === 0) {
      dispatch({ type: REQ_USER_REELS_SUCCESS, payload: [] });
    } else {
      dispatch({ type: REQ_USER_REELS_SUCCESS, payload: resData });
    }
  } catch (error) {
    console.log("catch error ---- ", error);
    dispatch({
      type: REQ_USER_REELS_FAILURE,
      payload: error.message,
    });
  }
};

// Delete reel by reelId
export const deleteReelByReelId = (data) => async (dispatch) => {
  dispatch({ type: DELETE_REEL_REQUEST });
  try {
    const response = await fetch(
      `${BASE_URL}/api/reels/user/delete-reel/${data.reelId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.jwt}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to Delete the reel");
    }

    const responseData = await response.json();
    dispatch({
      type: DELETE_REEL_SUCCESS,
      payload: responseData,
    });
  } catch (error) {
    console.log("An error occurred: ", error);
    dispatch({
      type: DELETE_REEL_FAILURE,
      payload: error.message,
    });
  }
};

// Like Reel
export const likeReel = (data) => async (dispatch) => {
  dispatch({ type: LIKE_REEL_REQUEST });
  try {
    const req = await axios.post(`${BASE_URL}/api/reels/like/${data.reelId}`, {}, {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    });

    const response = await req.json();
    dispatch({ type: LIKE_REEL_SUCCESS, payload: response });
  } catch (error) {
    dispatch({ type: LIKE_REEL_FAILURE });
    console.error("Error while liking the reel ", error);
  }
};

// Dislike Reel
export const dislikeReel = (data) => async (dispatch) => {
  dispatch({ type: DISLIKE_REEL_REQUEST });
  try {
    const req = await axios.post(
      `${BASE_URL}/api/reels/unlike/${data.reelId}`, {},
      {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }
    );

    if (!req.ok) {
      throw new Error("Failed to Dislike reel");
    }

    const response = await req.json();
    dispatch({ type: DISLIKE_REEL_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: DISLIKE_REEL_FAILURE });
    console.error("Error while disliking the reel ", error);
  }
};
