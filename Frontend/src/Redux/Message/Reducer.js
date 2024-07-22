import {
  CREATE_CHAT_SUCCESS,
  CREATE_MESSAGE_SUCCESS,
  GET_ALL_CHATS_SUCCESS,
  DELETE_CHAT_FAILURE,
  DELETE_CHAT_SUCCESS
} from "./ActionType";

const initialState = {
  messages: [],
  chats: [],
  loading: false,
  error: null,
  message: null,
  deleteChatStatus: null,
};

export const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_MESSAGE_SUCCESS:
      return { ...state, message: action.payload };

    case CREATE_CHAT_SUCCESS:
      return { ...state, chats: [action.payload, ...state.chats] };

    case GET_ALL_CHATS_SUCCESS:
      return { ...state, chats: action.payload };

    case DELETE_CHAT_SUCCESS:
      return {
        ...state,
        chats: state.chats.filter((chat) => chat.id !== action.payload.chatId),
        deleteChatStatus: "success",
      };

    case DELETE_CHAT_FAILURE:
      return {
        ...state,
        deleteChatStatus: "failure",
        error: action.payload,
      };

    default:
      return state;
  }
};
