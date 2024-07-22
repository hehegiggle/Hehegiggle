import { FETCH_NOTIFICATIONS_SUCCESS, FETCH_UNREAD_COUNT_SUCCESS } from "./ActionType";

const initialState = {
  notifications: [],
  unreadCount: null,
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        notifications: action.payload,
      };
    case FETCH_UNREAD_COUNT_SUCCESS:
      return {
        ...state,
        unreadCount: action.payload,
      };
    default:
      return state;
  }
};

export default notificationReducer;
