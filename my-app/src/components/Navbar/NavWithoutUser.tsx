import React from "react";
//Components
import NavButton from "./NavButton";
import Logo from "./Logo";
import SignupButton from "./SignupButton";
////////
import { Flex, HStack } from "@chakra-ui/react";

export default function NavWithoutUser() {
  return (
    <Flex
      pt={2}
      h="60px"
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
          h="100%"
          width="100%"
          align="center"
          justifyContent={"space-between"}
        >
          <Logo />
          <HStack spacing={2}>
            <NavButton title="Sign in" url={"/signin"} />
            <SignupButton />
          </HStack>
        </Flex>
      </Flex>
      {/* //Allow user to change position of cards  */}
    </Flex>
  );
}
