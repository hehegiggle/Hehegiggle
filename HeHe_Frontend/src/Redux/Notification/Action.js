import axios from "axios";
import { BASE_URL } from "../../Config/api";
import {
  FETCH_NOTIFICATIONS_SUCCESS,
  FETCH_UNREAD_COUNT_SUCCESS,
  FETCH_UNREAD_COUNT_REQUEST,
  FETCH_UNREAD_COUNT_FAILURE,
  FETCH_NOTIFICATIONS_FAILURE,
  FETCH_NOTIFICATIONS_REQUEST,
} from "./ActionType";

export const fetchNotifications = () => async (dispatch) => {
  dispatch({type: FETCH_NOTIFICATIONS_REQUEST});
  try {
    const jwt = sessionStorage.getItem("token");
    const response = await axios.get(
      `${BASE_URL}/api/realtime-notifications/user`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    dispatch({
      type: FETCH_NOTIFICATIONS_SUCCESS,
      payload: response.data,
    });

    const unreadCount = response.data.filter(
      (notification) => notification.read===false
    ).length;
    dispatch({
      type: FETCH_UNREAD_COUNT_SUCCESS,
      payload: unreadCount,
    });
  } catch (error) {
    dispatch({type: FETCH_NOTIFICATIONS_FAILURE, parload: error})
    console.error("Error fetching notifications:", error);
  }
};


export const markAllAsRead = () => async (dispatch) => {
  dispatch({type: FETCH_UNREAD_COUNT_REQUEST});
  try {
    const jwt = sessionStorage.getItem("token");
    await axios.put(
      `${BASE_URL}/api/realtime-notifications/mark-as-read`,
      {},
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    dispatch(fetchNotifications()); // Refresh notifications after marking as read
  } catch (error) {
    dispatch({type: FETCH_UNREAD_COUNT_FAILURE, parload: error})
    console.error("Error marking notifications as read:", error);
  }
};
