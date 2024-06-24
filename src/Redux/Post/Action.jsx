import { BASE_URL } from "../../Config/api";
import axios from "axios";
import { useEffect } from "react";
import {
  CREATE_NEW_POST,
  DELETE_POST,
  EDIT_POST,
  GET_SINGLE_POST,
  GET_USER_POST,
  LIKE_POST,
  REQ_USER_POST,
  SAVE_POST,
  UNLIKE_POST,
  UNSAVE_POST,
} from "./ActionType";

//Create Post

export const createPost = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_URL}/api/posts/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.jwt}`,
      },
      body: JSON.stringify(data.data),
    });

    if (!res.ok) {
      throw new Error("Failed to create post");
    }

    const resData = await res.json();
    dispatch({ type: CREATE_NEW_POST, payload: resData });
    dispatch((getState) => {
      const currentPosts = getState().post.userPost;
      dispatch({ type: GET_USER_POST, payload: [resData, ...currentPosts] });
    });
  } catch (error) {
    console.log("error - ", error);
  }
};


//Find All Posts By Users ID (All posts are displayed using this)
export const findUserPost = (data) => async (dispatch) => {
  
  const token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/posts/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.message));
  }, [BASE_URL, token]);
  // console.log("user-id: " +data.userIds)
  // try {
  //   const res = await fetch(`${BASE_URL}/api/posts/`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${data.jwt}`,
  //     },
  //   });

  //   if (!res.ok) {
  //     throw new Error("Failed to find user posts");
  //   }

  //   const resData = await res.json();
  //   dispatch({ type: GET_USER_POST, payload: resData });
  // } catch (error) {
  //   console.log("catch error ---- ", error);
  // }
};

//Displaying all uploaded Posts in Profile section
export const reqUserPostAction = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_URL}/api/posts/all/${data.userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.jwt}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to find user posts");
    }

    const resData = await res.json();
    dispatch({ type: REQ_USER_POST, payload: resData });
  } catch (error) {
    console.log("catch error ---- ", error);
  }
};

//Like a Post using PostId
export const likePostAction = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_URL}/api/posts/like/${data.postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.jwt}`,
      },
      body: JSON.stringify(data.data),
    });

    if (!res.ok) {
      throw new Error("Failed to like post");
    }

    const resData = await res.json();
    dispatch({ type: LIKE_POST, payload: resData });
  } catch (error) {
    console.log("error - ", error);
  }
};

//Dislike a post using postId
export const unLikePostAction = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_URL}/api/posts/unlike/${data.postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.jwt}`,
      },
      body: JSON.stringify(data.data),
    });

    if (!res.ok) {
      throw new Error("Failed to unlike post");
    }

    const resData = await res.json();
    dispatch({ type: UNLIKE_POST, payload: resData });
  } catch (error) {
    console.log("error - ", error);
  }
};


//Save post using PostId
export const savePostAction = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_URL}/api/posts/save_post/${data.postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.jwt}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to save post");
    }

    const savedPost = await res.json();
    dispatch({ type: SAVE_POST, payload: savedPost });
  } catch (error) {
    console.log("catch error ", error);
  }
};

//UnSave post using PostId
export const unSavePostAction = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_URL}/api/posts/unsave_post/${data.postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.jwt}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to unsave post");
    }

    const unSavedPost = await res.json();
    dispatch({ type: UNSAVE_POST, payload: unSavedPost });
  } catch (error) {
    console.log("catch error ", error);
  }
};

// Find Post by postId
export const findPostByIdAction = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_URL}/api/posts/${data.postId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.jwt}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to find post by ID");
    }

    const post = await res.json();
    dispatch({ type: GET_SINGLE_POST, payload: post });
  } catch (error) {
    console.log("catch error ", error);
  }
};

//Delete a post using PostId
export const deletePostAction = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_URL}/api/posts/delete/${data.postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.jwt}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to delete post");
    }

    const deletedPost = await res.json();
    dispatch({ type: DELETE_POST, payload: deletedPost });
  } catch (error) {
    console.log("catch error ", error);
  }
};


//Edit post using PostId
export const editPOst = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_URL}/api/posts/edit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.jwt}`,
      },
      body: JSON.stringify(data.data),
    });

    if (!res.ok) {
      throw new Error("Failed to edit post");
    }

    const resData = await res.json();
    dispatch({ type: EDIT_POST, payload: resData });
  } catch (error) {
    console.log("catch error ", error);
  }
};
