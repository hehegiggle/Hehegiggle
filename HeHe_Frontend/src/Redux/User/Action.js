import { BASE_URL } from "../../Config/api";
import {
  FOLLOW_USER,
  GET_USERS_BY_USER_IDS,
  GET_USER_BY_USERNAME,
  GET_USER_PROFILE,
  SEARCH_USER,
  SEARCH_USER_FAILURE,
  SEARCH_USER_SUCCESS,
  UPDATE_USER,
  FOLLOWER_LIST_FAILURE,
  FOLLOWER_LIST_REQUEST,
  FOLLOWER_LIST_SUCCESS,
  FOLLOWING_LIST_FAILURE,
  FOLLOWING_LIST_REQUEST,
  FOLLOWING_LIST_SUCCESS,
} from "./ActionType";

export const getUserProfileAction = (token) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_URL}/api/users/req`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const reqUser = await res.json();
    dispatch({ type: GET_USER_PROFILE, payload: reqUser });
  } catch (error) {
    console.log("catch error - ", error);
  }
};

export const findByUsernameAction = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_URL}/api/users/username/${data.username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      },
    });

    const user = await res.json();
    dispatch({ type: GET_USER_BY_USERNAME, payload: user });
  } catch (error) {
    console.log("catch error - ", error);
  }
};

export const findByUserIdsAction = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_URL}/api/users/m/${data.userIds}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.jwt,
      },
    });

    const users = await res.json();
    dispatch({ type: GET_USERS_BY_USER_IDS, payload: users });
  } catch (error) {
    console.log("catch error -  ", error);
  }
};

export const followUserAction = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_URL}/api/users/follow/${data.userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.jwt,
      },
    });

    const users = await res.json();
    dispatch({ type: FOLLOW_USER, payload: users });
  } catch (error) {
    console.log("catch error -  ", error);
  }
};

export const unFollowUserAction = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_URL}/api/users/unfollow/${data.userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.jwt,
      },
    });

    const users = await res.json();
    dispatch({ type: FOLLOW_USER, payload: users });
  } catch (error) {
    console.log("catch error -  ", error);
  }
};

export const searchUserAction = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_URL}/api/users/search?q=${data.query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.jwt,
      },
    });

    const users = await res.json();
    dispatch({
      type: SEARCH_USER,
      payload: users.message ? { isError: true, ...users } : users,
    });
  } catch (error) {
    console.log("catch error -  ", error);
  }
};

export const editUserDetailsAction = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_URL}/api/users/account/edit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.jwt,
      },
      body: JSON.stringify(data.data),
    });

    const users = await res.json();
    dispatch({ type: UPDATE_USER, payload: users });
  } catch (error) {
    console.log("catch error -  ", error);
  }
};

// For Chat SearchUser
export const searchUser = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_URL}/api/users/search?q=${data.query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      },
    });
    if(!res.ok){
      throw new Error( `Error Occured!!! Status: ${res.status}`);
    }
    
    const users = await res.json();
    const filteredUsers = users.filter(user => user.id !== data.loggedInuser);
    dispatch({ type: SEARCH_USER_SUCCESS, payload: filteredUsers });
  } catch (error) {
    console.log("Error while getting users: ", error);
    dispatch({ type: SEARCH_USER_FAILURE, payload: error.message });
  }
};

export const followerList = (data) => async (dispatch) => {
  dispatch({type: FOLLOWER_LIST_REQUEST});
  try{
    const response = await fetch(`${BASE_URL}/api/users/follower-list/${data.userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      },
    });
    const results = await response.json();
    console.log("Followers List------------", results);
    dispatch({
      type: FOLLOWER_LIST_SUCCESS,
      payload: results.message ? { isError: true, ...results } : results,
    });
  }catch(error){
    console.log("Error while getting followers: ", error);
    dispatch({ type: FOLLOWER_LIST_FAILURE, payload: error.message });
  }
}

export const followingList = (data) => async (dispatch) => {
  dispatch({type: FOLLOWING_LIST_REQUEST});
  try{
    const response = await fetch(`${BASE_URL}/api/users/following-list/${data.userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.token,
      },
    });
    const results = await response.json();
    console.log("Following List------------", results);
    dispatch({
      type: FOLLOWING_LIST_SUCCESS,
      payload: results.message ? { isError: true, ...results } : results,
    });
  }catch(error){
    console.log("Error while getting followings: ", error);
    dispatch({ type: FOLLOWING_LIST_FAILURE, payload: error.message });
  }
}
