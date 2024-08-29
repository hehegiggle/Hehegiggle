import axios from "axios";
import { BASE_URL } from "../../Config/api";
import {
  FETCH_NOTIFICATIONS_SUCCESS,
  FETCH_UNREAD_COUNT_SUCCESS,
  FETCH_UNREAD_COUNT_REQUEST,
  FETCH_UNREAD_COUNT_FAILURE,
  FETCH_NOTIFICATIONS_FAILURE,
  FETCH_NOTIFICATIONS_REQUEST,
  DELETE_ALL_NOTIFICATIONS_REQUEST,
  DELETE_ALL_NOTIFICATIONS_SUCCESS,
  DELETE_ALL_NOTIFICATIONS_FAILURE,
  DELETE_A_NOTIFICATION_SUCCESS,
  DELETE_A_NOTIFICATION_REQUEST,
  DELETE_A_NOTIFICATION_FAILURE,
} from "./ActionType";

export const fetchNotifications = () => async (dispatch) => {
  dispatch({ type: FETCH_NOTIFICATIONS_REQUEST });
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
      (notification) => notification.read === false
    ).length;
    dispatch({
      type: FETCH_UNREAD_COUNT_SUCCESS,
      payload: unreadCount,
    });
  } catch (error) {
    dispatch({ type: FETCH_NOTIFICATIONS_FAILURE, parload: error });
    console.error("Error fetching notifications:", error);
  }
};

export const markAllAsRead = () => async (dispatch) => {
  dispatch({ type: FETCH_UNREAD_COUNT_REQUEST });
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
    dispatch({ type: FETCH_UNREAD_COUNT_FAILURE, parload: error });
    console.error("Error marking notifications as read:", error);
  }
};

export const markIndividulaAsRead = (data) => async (dispatch) => {
  try {
    await axios.put(
      `${BASE_URL}/api/realtime-notifications/mark-as-read-by-id/${data.notificationId}`, {},
      {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }
    );
    dispatch(fetchNotifications());
  } catch (error) {
    console.error(`Error while marking ${data.notificationId} as read: `, error);
  }
};

export const deleteAllNotifications = () => async (dispatch) => {
  dispatch({ type: DELETE_ALL_NOTIFICATIONS_REQUEST });
  const jwt = sessionStorage.getItem("token");
  try {
    const response = await axios.delete(
      `${BASE_URL}/api/realtime-notifications/delete-all`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    const result = response.data;
    dispatch({ type: DELETE_ALL_NOTIFICATIONS_SUCCESS, payload: result });
  } catch (error) {
    dispatch({ type: DELETE_ALL_NOTIFICATIONS_FAILURE, parload: error });
    console.error("Error while deleting all notifications:", error);
  }
};

export const deleteParticularNotification = (notificationId) => async (dispatch) => {
  dispatch({ type: DELETE_A_NOTIFICATION_REQUEST });
  const jwt = sessionStorage.getItem("token");
  try {
    const response = await axios.delete(`${BASE_URL}/api/realtime-notifications/delete-by-id/${notificationId}`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    const result = response.data;
    dispatch({ type: DELETE_A_NOTIFICATION_SUCCESS, payload: result });
  } catch (error) {
    dispatch({ type: DELETE_A_NOTIFICATION_FAILURE, parload: error });
    console.error(`Error occured while deleteing ${notificationId} notification: `, error);
  }
}