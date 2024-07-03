import {applyMiddleware, combineReducers, legacy_createStore} from "redux"
import thunk from "redux-thunk";
import { AuthReducer } from "../Auth/Reducer";
import { commentReducer } from "../Comment/Reducer";
import { postReducer } from "../Post/Reducer";
import { userReducer } from "../User/Reducer";
import { reelReducer } from "../Reel/Reducer";
import { messageReducer } from "../Message/Reducer";
import notificationReducer from "../Notification/Reducer";

const rootReducers=combineReducers({

    post:postReducer,
    comments:commentReducer,
    user:userReducer,
    auth:AuthReducer,
    reel:reelReducer,
    message:messageReducer,
    notifications: notificationReducer

});

export const store = legacy_createStore(rootReducers,applyMiddleware(thunk))