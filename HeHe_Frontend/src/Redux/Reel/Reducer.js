import {
  CREATE_REEL_FAILURE,
  CREATE_REEL_REQUEST,
  CREATE_REEL_SUCCESS,
  DELETE_REEL_FAILURE,
  DELETE_REEL_REQUEST,
  DELETE_REEL_SUCCESS,
  GET_ALL_REELS_FAILURE,
  GET_ALL_REELS_REQUEST,
  GET_ALL_REELS_SUCCESS,
  REQ_USER_REELS_FAILURE,
  REQ_USER_REELS_SUCCESS,
  REQ_USER_REELS_REQUEST,
} from "./ActionType";

const initialState = {
  reels: [],
  createdReel: null,
  deletedReel: null,
  loading: false,
  error: null,
};

export const reelReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_REEL_REQUEST:
    case DELETE_REEL_REQUEST:
    case GET_ALL_REELS_REQUEST:
    case REQ_USER_REELS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_REEL_SUCCESS:
      return {
        ...state,
        reels: [action.payload, ...state.reels],
        createdReel: action.payload,
        loading: false,
      };
    case DELETE_REEL_SUCCESS:
      return {
        ...state,
        reels: state.reels.filter((reel) => reel.id !== action.payload.id),
        deletedReel: action.payload,
        loading: false,
      };
    case CREATE_REEL_FAILURE:
    case DELETE_REEL_FAILURE:
    case GET_ALL_REELS_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case GET_ALL_REELS_SUCCESS:
      return {
        reels: action.payload,
        loading: false,
      };
    case REQ_USER_REELS_SUCCESS:
      return {
        ...state,
        reels: action.payload,
        loading: false,
      };
    case REQ_USER_REELS_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default reelReducer;
