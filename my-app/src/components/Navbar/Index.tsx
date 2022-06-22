import React from "react";
import { useSelector } from "react-redux";
//Componentss
import AuthNavbar from "./AuthNavbar";
import NavWithoutUser from "./NavWithoutUser";

export default function Index() {
  //Access auth state from redux
  const { user } = useSelector((state: { auth: any }) => state.auth);
  return user ? <AuthNavbar /> : <NavWithoutUser />;
}
