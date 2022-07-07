import React from "react";
import { useDispatch } from "react-redux";
import { signout, resetAuth } from "../../features/auth/authSlice";
//Components
import NavButton from "./NavButton";
import NavMenu from "./NavMenu";
import Logo from "./Logo";
import Feedback from "./Feedback";
import AddCollection from "../CollectionsNew/AddEditCollection";
////////
import { Flex, HStack, useToast } from "@chakra-ui/react";
export default function AuthNavbar() {
  const toast = useToast();
  const dispatch = useDispatch();

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

  return (
    <Flex
      pt={2}
      h="110px"
      w="100%"
      borderBottom="1px solid #262626"
      justify="center"
      boxShadow={
        "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;"
      }
    >
      <Flex
        width={["90%", "90%", "90%", "60%"]}
        h="100%"
        flexDir="column"
        pb={2}
        align="space-between"
      >
        <Flex
          h="50%"
          width="100%"
          align="center"
          justifyContent={"space-between"}
        >
          <Logo />
          <Flex align="center">
            <Feedback />
            <NavMenu signUserOut={signUserOut} />
          </Flex>
        </Flex>
        <Flex h="50%" width="100%" align="center" justify={"space-between"}>
          <HStack spacing={1}>
            <NavButton title={"Dashboard"} url={"/dashboard"} />
            <NavButton title={"Settings"} url={"settings"} />
          </HStack>
          <HStack>
            <AddCollection type={"add"} collection={null} />
          </HStack>
        </Flex>
      </Flex>
    </Flex>
  );
}
