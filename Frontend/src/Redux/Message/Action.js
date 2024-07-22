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
  DELETE_CHAT_REQUEST,
  DELETE_CHAT_SUCCESS,
  DELETE_CHAT_FAILURE,
  DELETE_CHAT_ALL_MESSAGES_FAILURE,
  DELETE_CHAT_ALL_MESSAGES_REQUEST,
  DELETE_CHAT_ALL_MESSAGES_SUCCESS,
  DELETE_MESSAGE_REQUEST,
  DELETE_MESSAGE_SUCCESS,
  DELETE_MESSAGE_FAILURE
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

// Delete Chat
const deleteChat = (chat) => async (dispatch) => {
  dispatch({ type: DELETE_CHAT_REQUEST });
  try {
    const res = await fetch(`${BASE_URL}/api/chats/delete/${chat.data.chatId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + chat.data.token,
      },
    });

    if (res.ok) {
      const data = await res.json();
      dispatch({ type: DELETE_CHAT_SUCCESS, payload: { chatId: chat.data.chatId, data } });
    } else {
      throw new Error("Failed to delete chat");
    }
  } catch (error) {
    console.log("Error occurred in Catch:", error);
    dispatch({ type: DELETE_CHAT_FAILURE, payload: error.message });
  }
};

// Delete all messages by chatId
const deleteAllChatMessages = (chat) => async (dispatch) => {
  dispatch({type: DELETE_CHAT_ALL_MESSAGES_REQUEST});
  try {
    const res = await fetch(`${BASE_URL}/api/messages/delete/${chat.chatId}`, {
      method:"DELETE",
      headers:{
        "Content-Type": "application/json",
        Authorization: "Bearer " + chat.jwt,
      },
    });

    if (res.ok) {
      const data = await res.json();
      dispatch({ type: DELETE_CHAT_ALL_MESSAGES_SUCCESS, payload: { chatId: chat.chatId, data } });
    } else {
      throw new Error("Failed to Delete all messages of selected chat");
    }
  } catch (error) {
    console.log("Error occurred in Catch:", error);
    dispatch({ type: DELETE_CHAT_ALL_MESSAGES_FAILURE, payload: error.message });
  }
};

// Delete Message By Message Id
const deleteMessageById = (message) => async (dispatch) => {

  dispatch({type: DELETE_MESSAGE_REQUEST});
  try {
    const res = await fetch(`${BASE_URL}/api/messages/deleteById/${message.messageId}`, {
      method:"DELETE",
      headers:{
        "Content-Type": "application/json",
        Authorization: "Bearer " + message.jwt,
      },
    });

    if(res.ok){
      const data = await res.json();
      dispatch({ type: DELETE_MESSAGE_SUCCESS, payload: { messageId: message.messageId, data } });
    } else {
      throw new Error("Failed to Delete the message");
    }
  } catch (error) {
    console.log("Error occurred in Catch:", error);
    dispatch({ type: DELETE_MESSAGE_FAILURE, payload: error.message });
  }
}

export { createMessage, createChat, getAllChats, deleteChat, deleteAllChatMessages, deleteMessageById};
