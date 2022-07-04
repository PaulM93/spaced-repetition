import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signout, reset } from "../../features/auth/authSlice";
import jwtDecode from "jwt-decode";
import { useToast } from "@chakra-ui/react";

export default function AuthWrapper({ children }) {
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();
  //If no user push back to home page
  const { user } = useSelector((state: any) => state.auth);

  /*
    - Check token expirey time 
    - If expired we fire the logout function
    - Token is stored in the user object in state
  
  */

  //Check for user
  useEffect(() => {
    //Autologout -- works on page refresh
    if (user) {
      const decodedToken: { exp: number } = jwtDecode(user.accessToken);
      console.log("Token", decodedToken);
      console.log("DecodedTokane", decodedToken);
      //Set a timer for auto logout
      setTimeout(() => {
        dispatch<any>(signout());
        dispatch(reset());
        toast({
          title: "Signed out",
          status: "success",
          position: "bottom-left",
          isClosable: true,
        });
      }, decodedToken.exp * 1000 - Date.now());
    }
    if (!user) {
      navigate("/");
    }
  }, [user, navigate, dispatch, toast]);

  return <>{children}</>;
}