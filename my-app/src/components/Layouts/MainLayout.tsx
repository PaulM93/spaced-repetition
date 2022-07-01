import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetUpdate } from "../../features/collections/collectionsSlice";
//Components
import Navbar from "../Navbar/Index";
import { Flex, useToast } from "@chakra-ui/react";

export default function Layout({ children }) {
  const dispatch = useDispatch();
  const toast = useToast();
  //Display toasts here
  const {
    isUpdated,
    isCreated,
    isLoading,
    isError,
    isSuccess,
    message,
    isDeleted,
  } = useSelector((state: any) => state.collection);

  useEffect(() => {
    if (isUpdated) {
      toast({
        title: "Collection Updated",
        status: "success",
        position: "bottom-left",
        isClosable: true,
      });
      dispatch(resetUpdate());
    }
    if (isCreated) {
      toast({
        //Get the message
        title: "Collection created",
        // title: message,
        status: "success",
        position: "bottom-left",
        isClosable: true,
      });
      dispatch(resetUpdate());
    }
    if (isDeleted) {
      toast({
        //Get the message
        title: "Collection Deleted",
        // title: message,
        status: "success",
        position: "bottom-left",
        isClosable: true,
      });
      dispatch(resetUpdate());
    }

    //Error also
  }, [isSuccess]);

  return (
    <Flex
      minHeight="200vh"
      minWidth="100%"
      background={"#1A1A1A"}
      flexDir={"column"}
    >
      <Navbar />
      <Flex mt={5} width={"100%"} minH={`calc("100vh")`} justify="center">
        <Flex minH="100%" width={["90%", "90%", "90%", "60%"]}>
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
}
