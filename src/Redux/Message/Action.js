import {
  CREATE_CHAT_FAILURE,
  CREATE_CHAT_REQUEST,
  CREATE_CHAT_SUCCESS,
  CREATE_MESSAGE_FAILURE,
  CREATE_MESSAGE_REQUEST,
  CREATE_MESSAGE_SUCCESS,
  GET_ALL_CHATS_FAILURE,
  GET_ALL_CHATS_REQUEST,
  GET_ALL_CHATS_SUCCESS,
} from "./ActionType";
import { BASE_URL } from "../../Config/api";

// Create Message
const createMessage = (reqData) => async (dispatch) => {
  dispatch({ type: CREATE_MESSAGE_REQUEST });
  try {
    const res = await fetch(`${BASE_URL}/api/messages/chat/${reqData.message.chatId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + reqData.token,
      },
      body: JSON.stringify(reqData.message),
    });
    const data = await res.json();

    dispatch({ type: CREATE_MESSAGE_SUCCESS, payload: data });
    if (reqData.sendMessageToServer) {
      reqData.sendMessageToServer(data);
    }
  } catch (error) {
    console.log("Error occurred in Catch:", error);
    dispatch({ type: CREATE_MESSAGE_FAILURE, payload: error });
  }
};

// Create Chat
const createChat = (chat) => async (dispatch) => {
  dispatch({ type: CREATE_CHAT_REQUEST });
  try {
    const res = await fetch(`${BASE_URL}/api/chats`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + chat.token,
      },
      body: JSON.stringify(chat),
    });
    
    const data = await res.json();
    dispatch({ type: CREATE_CHAT_SUCCESS, payload: data });
    console.log("Data got------------", data);
  } catch (error) {
    console.log("Error occurred in Catch:", error);
    dispatch({ type: CREATE_CHAT_FAILURE, payload: error });
  }
};

// Get All Chats
const getAllChats = (message) => async (dispatch) => {
  dispatch({ type: GET_ALL_CHATS_REQUEST });

  try {
    const res = await fetch(`${BASE_URL}/api/chats`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + message.token,
      },
    });
    const data = await res.json();
    const sortedData = data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    dispatch({ type: GET_ALL_CHATS_SUCCESS, payload: sortedData });
  } catch (error) {
    console.log("Error occurred in Catch:", error);
    dispatch({ type: GET_ALL_CHATS_FAILURE, payload: error });
  }
};

export { createMessage, createChat, getAllChats };
