import React from "react";
import { motion, Reorder } from "framer-motion";
//Components
import NavButton from "./NavButton";
import Feedback from "./Feedback";
import CustomTooltip from "../CustomTooltip";
import SignupButton from "./SignupButton";
////////
import {
  Button,
  Box,
  Flex,
  Divider,
  Text,
  Heading,
  HStack,
  VStack,
  Grid,
  Icon,
  IconButton,
  Avatar,
} from "@chakra-ui/react";
import { DragHandleIcon } from "@chakra-ui/icons";
import { FiCircle } from "react-icons/fi";

export default function Index() {
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
      <Flex width="60%" h="100%" flexDir="column" pb={2} align="space-between">
        <Flex
          h="100%"
          width="100%"
          align="center"
          justifyContent={"space-between"}
        >
          <Flex align="flex-end" color="#ffffff">
            <Flex align="center">
              <Icon fontSize="lg" as={FiCircle} mr={1} />
              <Text fontSize={"lg"} fontWeight="700" mr={3}>
                Spaced
              </Text>
            </Flex>
            <Flex align={"flex-end"} mb={"3px"}>
              <Text fontSize={"xs"} fontWeight="400" color="#ffffffb3">
                Simple spaced repetition
              </Text>
            </Flex>
          </Flex>
          <HStack spacing={2}>
            <NavButton title="Sign in" />
            <SignupButton />
          </HStack>
        </Flex>
      </Flex>
      {/* //Allow user to change position of cards  */}
    </Flex>
  );
}
