import React from "react";
import { useLocation } from "react-router-dom";
import Signin from "../../Components/Register/Signin";
import "./Auth.css";
import { Grid } from "@chakra-ui/react";
import Signup from "../../Components/Register/Singup";
import vdo from "../../Album/Videos/authbg.mp4";

const Auth = () => {
  const location = useLocation();

  return (
    <div className="relative">
      <div className="mobileWallpaper"></div>

      <div className="flex items-center justify-center h-screen">
      <video
          src={vdo}
          type="video/mp4"
          autoPlay
          muted
          loop
          className="absolute inset-0 w-full h-full object-cover"
        >
          Your browser does not support the video tag.
        </video>
        <Grid
          className="z-10"
          placeItems="center"
          height="100%"
          width="100%"
          minHeight="100vh"
        >
          {location.pathname === "/signup" ? <Signup /> : <Signin />}
        </Grid>
      </div>
    </div>
  );
};

export default Auth;
