import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signout, resetAuth } from "../features/auth/authSlice";
import { changeEmail, changePassword } from "../features/user/userSlice";
import { Grid, GridItem, useToast } from "@chakra-ui/react";
//Components
import Settings from "../components/Profile/Settings";
import General from "../components/Profile/General";
import ControlButtons from "../components/Profile/ControlButtons";

export default function Profile() {
  const toast = useToast();
  const dispatch = useDispatch();
  const { user } = useSelector(
    //Auth state is selected from store
    (state: any) => state.auth
  );
  const { userLoading, isSuccessUser } = useSelector(
    (state: any) => state.user
  );

  //Sign userOut
  const signUserOut = () => {
    dispatch<any>(signout());
    dispatch(resetAuth());
    toast({
      title: "Signed out",
      status: "success",
      position: "bottom-left",
      isClosable: true,
    });
  };

  //Populate with data
  const [selectedPage, setSelectedPage] = useState("General");
  //UserDetails
  const [userDetails, setUserDetails] = useState<{
    username: string;
    bio: string;
  }>({
    username: "",
    bio: "",
  });
  //Email Details
  const [emailDetails, setEmailDetails] = useState<{
    currentEmail: string;
    newEmail: string;
  }>({
    currentEmail: "",
    newEmail: "",
  });
  //Password Details
  const [passwordDetails, setPasswordDetails] = useState<{
    currentPassword: string;
    newPassword: string;
  }>({
    currentPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    if (user) {
      setUserDetails({
        ...userDetails,
        username: user.username,
        bio: user.bio,
      });
    }
  }, []);

  useEffect(() => {
    if (isSuccessUser.val) {
      if (isSuccessUser.type === "email") {
        const emailReset = {
          currentEmail: "",
          newEmail: "",
        };
        setEmailDetails(emailReset);
      }
      if (isSuccessUser.type === "password") {
        const passwordReset = {
          currentPassword: "",
          newPassword: "",
        };
        setPasswordDetails(passwordReset);
      }
    }
  }, [isSuccessUser]);

  //Handle front and back text change
  const handleChange = (e: React.FormEvent<HTMLInputElement>, type: string) => {
    if (type === "userDetails") {
      setUserDetails({
        ...userDetails,
        [e.currentTarget.id]: e.currentTarget.value,
      });
    }
    if (type === "passwordDetails") {
      setPasswordDetails({
        ...passwordDetails,
        [e.currentTarget.id]: e.currentTarget.value,
      });
    }
    if (type === "emailDetails") {
      setEmailDetails({
        ...emailDetails,
        [e.currentTarget.id]: e.currentTarget.value,
      });
    }
  };

  const handleSubmit = (type: string) => {
    if (type === "emailDetails") {
      dispatch<any>(changeEmail(emailDetails));
    }
    if (type === "passwordDetails") {
      alert("here");
      dispatch<any>(changePassword(passwordDetails));
    }
  };

  console.log("Email Details", emailDetails);
  console.log("Password Details", passwordDetails);

  //Markup
  let markup: any;
  switch (selectedPage) {
    case "General":
      markup = (
        <General
          userLoading={userLoading}
          title={"Your Details"}
          subtitle={"Update your details within Spaced"}
          userDetails={userDetails}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      );
      break;
    case "Settings":
      markup = (
        <Settings
          userLoading={userLoading}
          emailDetails={emailDetails}
          passwordDetails={passwordDetails}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          title={"Your Settings"}
          subtitle={"Update your settings within Spaced"}
        />
      );
      break;
    default:
  }

  return (
    <Grid
      templateColumns={[
        "repeat(1, 1fr)",
        "repeat(1, 1fr)",
        "repeat(3, 1fr)",
        "repeat(3, 1fr)",
      ]}
      gap={4}
      minWidth="100%"
    >
      <GridItem colSpan={1}>
        <ControlButtons
          signUserOut={signUserOut}
          setSelectedPage={setSelectedPage}
          selectedPage={selectedPage}
        />
      </GridItem>
      <GridItem colSpan={2}>{markup}</GridItem>
    </Grid>
  );
}
