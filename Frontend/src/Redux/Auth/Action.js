// Action.js
import axios from "axios";
import { BASE_URL } from "../../Config/api";
import { SIGN_IN_SUCCESS, SIGN_IN_FAILURE, SIGN_UP_SUCCESS, SIGN_UP_FAILURE, REQUEST_RESET_PASSWORD_FAILURE, REQUEST_RESET_PASSWORD_REQUEST, REQUEST_RESET_PASSWORD_SUCCESS,} from "./ActionType";

// SignIn 
export const signinAction = (data) => async (dispatch) => {
  console.log("Data passed is: ", data);
  try {
    const res = await fetch(`${BASE_URL}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      const responseJson = await res.json();
      const authToken = responseJson.jwt;
      if (!authToken) {
        throw new Error("Authentication failed");
      }
      localStorage.setItem("token", authToken);
      console.log("Token from response body: ", authToken);
      dispatch({ type: SIGN_IN_SUCCESS, payload: authToken });
    } else {
      const errorData = await res.json();
      throw new Error(errorData.message || "SignIn Failed");
    }
  } catch (error) {
    dispatch({ type: SIGN_IN_FAILURE, payload: error.message });
    console.log("Error got in Action.js: ", error.message);
  }
};

// SignUp
export const signupAction = (userData) => async (dispatch) => {
  console.log('Data I got------', userData);
  try {
    // Step 1: Post data to signup endpoint
    const res = await fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Signup failed");
    }

    const user = await res.json();
    console.log("Signup Success: ", user);
    dispatch({ type: SIGN_UP_SUCCESS, payload: user });

    // Step 2: Send email to the entered email id
    const emailRes = await fetch(`${BASE_URL}/notifications/send-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify( userData.email ),
    });

    if (!emailRes.ok) {
      const errorData = await emailRes.json();
      throw new Error(errorData.message || "Email sending failed");
    }

    console.log("Email sent successfully");

  } catch (error) {
    dispatch({ type: SIGN_UP_FAILURE, payload: error.message });
    console.log("Error: ", error.message);
  }
};

// Reset Password Request
export const resetPasswordRequest = (email) => async (dispatch) => {
  dispatch({type:REQUEST_RESET_PASSWORD_REQUEST});
  try {
    console.log("Inside Resetpasswordrequest");
    console.log('Sent email: '+email);
    const {data} = await axios.post(`${BASE_URL}/resetpassword/reset?email=${email}`,{});
    
    console.log("reset password -: ", data);
   
    dispatch({type:REQUEST_RESET_PASSWORD_SUCCESS,payload:data});
  } catch (error) {
    console.log("error ",error)
    dispatch({type:REQUEST_RESET_PASSWORD_FAILURE,payload:error.message});
  }
};


export const resetPassword = (reqData) => async (dispatch) => {
  dispatch({type:REQUEST_RESET_PASSWORD_REQUEST});
  try {
    const {data} = await axios.post(`${BASE_URL}/resetpassword`,reqData.data);
    
    console.log("reset password -: ", data);

    reqData.navigate("/login")
   
    dispatch({type:REQUEST_RESET_PASSWORD_SUCCESS,payload:data});
  } catch (error) {
    console.log("error ",error)
    dispatch({type:REQUEST_RESET_PASSWORD_FAILURE,payload:error.message});
  }
};