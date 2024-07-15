import {
  GET_USERS_BY_USER_IDS,
  GET_USER_BY_USERNAME,
  GET_USER_PROFILE,
  SEARCH_USER,
  SEARCH_USER_SUCCESS,
  UPDATE_USER,
} from "./ActionType";

const initialState = {
  reqUser: null,
  findByUsername: null,
  searchResult: null,
  updatedUser: null,
  error: null,
  loading: false,
  userByIds: [],
  searchUser: {
    data: [],
    message: null,
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
      return { ...state, searchResult:payload};

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

    default:
      return state;
  }
};
