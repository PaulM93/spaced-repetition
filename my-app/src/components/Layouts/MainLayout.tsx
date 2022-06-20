import React from "react";
//Components
import Navbar from "../Navbar/Index";
import { Flex } from "@chakra-ui/react";

export default function Layout({ children }) {
  return (
    <Flex
      minHeight="100vh"
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
