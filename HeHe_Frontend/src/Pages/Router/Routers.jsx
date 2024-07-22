import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import { getUserProfileAction } from "../../Redux/User/Action";
import Auth from "../Auth/Auth";
import EditProfilePage from "../EditProfile/EditProfilePage";
import HomePage from "../HomePage/HomePage";
import Profile from "../Profile/Profile";
import ReelViewer from "../ReelViewer/ReelViewer";
import Sidebar from "../../Components/Sidebar/Sidebar";
import ForgotPassword from "../../Components/Register/ForgotPassword";
import ResetPassword from "../../Components/Register/ResetPassword";
import Messages from "../Message/Messages";
import Notification from "../Notification/Notification";

const Routers = () => {
  const { reels } = useSelector((state) => state.reel);
  const location = useLocation();
  const token = sessionStorage.getItem("token");
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(getUserProfileAction(token));
    }
  }, [token, dispatch]);

  const isLoginPage = location.pathname === "/login";
  const isSignupPage = location.pathname === "/signup";
  const isForgotPasswordPage = location.pathname === "/forgotpassword";
  const isMessagePage = location.pathname === "/Messages";
  const isResetPassword = location.pathname === "/resetpassword";

  return (
   <>
      {/* donot display navbar in Login and Signup page */}
      {!isLoginPage && !isSignupPage && !isForgotPasswordPage && !isMessagePage  && !isResetPassword && <Navbar />}
      {/* donot display sidebar in Login and Signup page */}
      {!isLoginPage && !isSignupPage && !isMessagePage && !isForgotPasswordPage && !isResetPassword && <Sidebar />}

      {location.pathname !== "/login" && location.pathname !== "/signup" &&  location.pathname !== "/forgotpassword" &&  location.pathname !== "/resetpassword" && (
        <div className="flex">
          <div
            className="w-full"
            style={{ backgroundColor: "#ffffff", height: "100vh" }}
          >
            <Routes>
              <Route path="/" element={<Navigate to="/signup" />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/p/:postId" element={<HomePage />} />
              <Route path="/p/:postId/edit" element={<HomePage />} />
              <Route path="/:username" element={<Profile />} />
              <Route path="/account/edit" element={<EditProfilePage />} />
              <Route path="/Reels" element={<ReelViewer reels={reels} />} />
              <Route path="/Messages" element={<Messages />}/>
              <Route path="/Notifications" element={<Notification />}/>
            </Routes>
          </div>
        </div>
      )}
      {(isLoginPage || isSignupPage || isForgotPasswordPage || isResetPassword) && (
        <Routes>
          <Route path="/login" element={<Auth />} />
          <Route path="/signup" element={<Auth />} />
          <Route path="/forgotpassword" element={<ForgotPassword />}/>
          <Route path="/resetpassword" element={<ResetPassword />}/>
        </Routes>
      )}
      </>
  );
};

export default Routers;
