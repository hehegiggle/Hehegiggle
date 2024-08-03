import {
  GET_USERS_BY_USER_IDS,
  GET_USER_BY_USERNAME,
  GET_USER_PROFILE,
  SEARCH_USER,
  SEARCH_USER_SUCCESS,
  UPDATE_USER,
  FOLLOWER_LIST_FAILURE,
  FOLLOWER_LIST_REQUEST,
  FOLLOWER_LIST_SUCCESS,
  FOLLOWING_LIST_FAILURE,
  FOLLOWING_LIST_REQUEST,
  FOLLOWING_LIST_SUCCESS,
} from "./ActionType";

const initialState = {
  reqUser: null,
  findByUsername: null,
  searchResult: null,
  updatedUser: null,
  error: null,
  loading: false,
  userId: null,
  userByIds: [],
  searchUser: {
    data: [],
    message: null,
    error: null,
  },
  followerList: {
    loading: false,
    data: [],
    error: null,
  },
  followingList: {
    loading: false,
    data: [],
    error: null,
  },
};

export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_USER_PROFILE:
      return { ...state, reqUser: payload };

    case GET_USER_BY_USERNAME:
      return { ...state, findByUsername: payload };

    case GET_USERS_BY_USER_IDS:
      return { ...state, userByIds: payload };

    case SEARCH_USER:
      return { ...state, searchResult: payload };

    case SEARCH_USER_SUCCESS:
      return {
        ...state,
        searchUser: {
          data: payload,
          message: null,
          error: null,
        },
        loading: false,
      };

    case UPDATE_USER:
      return { ...state, updatedUser: payload };

    case FOLLOWER_LIST_REQUEST:
      return {
        ...state,
        followerList: {
          ...state.followerList,
          loading: true,
        },
      };

    case FOLLOWER_LIST_SUCCESS:
      return {
        ...state,
        followerList: {
          loading: false,
          data: payload,
          error: null,
        },
      };

    case FOLLOWER_LIST_FAILURE:
      return {
        ...state,
        followerList: {
          loading: false,
          error: payload,
        },
      };

    case FOLLOWING_LIST_REQUEST:
      return {
        ...state,
        followingList: {
          ...state.followingList,
          loading: true,
        },
      };

    case FOLLOWING_LIST_SUCCESS:
      return {
        ...state,
        followingList: {
          loading: false,
          data: payload,
          error: null,
        },
      };

    case FOLLOWING_LIST_FAILURE:
      return {
        ...state,
        followingList: {
          loading: false,
          error: payload,
        },
      };

    default:
      return state;
  }
};
