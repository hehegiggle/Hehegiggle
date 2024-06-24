import { BASE_URL } from "../../Config/api";
import {
  CREATE_REEL_FAILURE,
  CREATE_REEL_REQUEST,
  CREATE_REEL_SUCCESS,
  GET_ALL_REELS_FAILURE,
  GET_ALL_REELS_REQUEST,
  GET_ALL_REELS_SUCCESS,
  REQ_USER_REELS,
  REQ_USER_REELS_FAILURE,
  REQ_USER_REELS_SUCCESS,
} from "./ActionType";

export const createReel = (data) => async (dispatch) => {
  dispatch({ type: CREATE_REEL_REQUEST });
  try {
    console.log("Entered Create Reel");
    const response = await fetch(`${BASE_URL}/api/reels`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.jwt,
      },
      body: JSON.stringify(data.reelData),
    });
    console.log("Reel Id: "+data.reelId);

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


// export const deleteReel = (data) => async (dispatch) => {
//   dispatch({ type: DELETE_REEL_REQUEST });
//   try {
//     const response = await fetch(
//       `${BASE_URL}/api/reels/delete/${data.reelId}`,
//       {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: "Bearer " + data.jwt,
//         },
//       }
//     );
//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.message || "Failed to delete reel");
//     }
//     const responseData = await response.json();
//     dispatch({
//       type: DELETE_REEL_SUCCESS,
//       payload: responseData,
//     });
//   } catch (error) {
//     dispatch({
//       type: DELETE_REEL_FAILURE,
//       payload: error.message,
//     });
//   }
// };

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
      console.log("Server responded with an error: ", errorData);
      throw new Error(errorData.message || "Failed to get reels");
    }
    
    const responseData = await response.json();

    console.log("all reels - ", responseData);
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
    console.log("Reels I got_____", resData);

    if (resData.length === 0) {
      dispatch({ type: REQ_USER_REELS_SUCCESS, payload: [] });
    } else {
      dispatch({ type: REQ_USER_REELS_SUCCESS, payload: resData });
    }

    console.log("Response reel: ", resData);
  } catch (error) {
    console.log("catch error ---- ", error);
    dispatch({
      type: REQ_USER_REELS_FAILURE,
      payload: error.message,
    });
  }
};
