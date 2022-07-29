import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetUpdate } from "../../features/collections/collectionsSlice";
import { resetAuth } from "../../features/auth/authSlice";
import { resetUser } from "../../features/user/userSlice";
import { useNavigate } from "react-router-dom";
//Components
import Navbar from "../Navbar/Index";
import Footer from "../Footer/Footer";
import { Flex, useToast, useColorModeValue } from "@chakra-ui/react";

export default function Layout({ children }) {
  //ColorMode
  const bg = useColorModeValue("background.light", "background.dark");
  //
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  //Display toasts here
  const {
    isUpdated,
    collectionMessage,
    isCreated,
    isSuccess,
    isDeleted,
    isErrorCollection,
  } = useSelector((state: any) => state.collection);
  const { isAuthError, isSuccessAuth, authMessage } = useSelector(
    (state: any) => state.auth
  );
  const { isSuccessUser, userMessage, isErrorUser } = useSelector(
    (state: any) => state.user
  );

  //User
  useEffect(() => {
    const customToast = (
      message: string,
      type: "info" | "warning" | "success" | "error" | "loading"
    ) => {
      toast({
        title: message,
        status: type,
        position: "bottom-left",
        isClosable: true,
      });
      dispatch(resetUser());
    };
    if (isSuccessUser.val && userMessage !== "") {
      customToast(userMessage, "success");
    }
    if (isErrorUser && userMessage !== "") {
      customToast(userMessage, "error");
    }
  }, [isSuccessUser, userMessage, isErrorUser, dispatch, toast]);

  //Auth
  useEffect(() => {
    const customToast = (
      message: string,
      type: "info" | "warning" | "success" | "error" | "loading"
    ) => {
      toast({
        title: message,
        status: type,
        position: "bottom-left",
        isClosable: true,
      });
      dispatch(resetAuth());
    };
    if (isSuccessAuth && authMessage !== "") {
      navigate("/dashboard");
      customToast(authMessage, "success");
    }
    if (isAuthError && authMessage !== "") {
      customToast(authMessage, "error");
    }
  }, [toast, isSuccessAuth, authMessage, isAuthError, dispatch, navigate]);

  //Fix messages -- i.e. errors etc
  useEffect(() => {
    const customToast = (
      message: string,
      type: "info" | "warning" | "success" | "error" | "loading"
    ) => {
      toast({
        title: message,
        status: type,
        position: "bottom-left",
        isClosable: true,
      });
      dispatch(resetUpdate());
    };
    if (isUpdated || isCreated || isDeleted) {
      customToast(collectionMessage, "success");
    }
    if (isErrorCollection && collectionMessage !== "") {
      customToast(collectionMessage, "error");
    }
  }, [
    isSuccess,
    dispatch,
    isCreated,
    isDeleted,
    isUpdated,
    toast,
    isErrorCollection,
    collectionMessage,
  ]);

  return (
    <>
      <Flex
        minHeight="120vh"
        minWidth="100%"
        background={bg}
        pb={20}
        flexDir={"column"}
      >
        <Navbar />
        <Flex
          mt={5}
          pb={20}
          width={"100%"}
          minH={`calc("100vh")`}
          justify="center"
        >
          <Flex minH="100%" width={["90%", "90%", "90%", "60%"]}>
            {children}
          </Flex>
        </Flex>
      </Flex>
      <Footer />
    </>
  );
}
