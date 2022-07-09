import React from "react";
import { useTheme } from "../ThemeContext";
//Components
import NavButton from "./NavButton";
import Logo from "./Logo";
import SignupButton from "./SignupButton";
import ColorMode from "./ColorMode";
////////
import { Flex, HStack, useColorModeValue } from "@chakra-ui/react";

export default function NavWithoutUser() {
  //ColorMode
  const { theme } = useTheme();
  const border = useColorModeValue("border.light", "border.dark");
  console.log("Border", border);
  //
  return (
    <Flex
      pt={2}
      h="60px"
      w="100%"
      style={theme.navbar}
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
            <SignupButton type={"nav"} />
            <ColorMode />
          </HStack>
        </Flex>
      </Flex>
      {/* //Allow user to change position of cards  */}
    </Flex>
  );
}
