import React from "react";
import { Flex, Text, HStack, Icon, IconButton, Avatar } from "@chakra-ui/react";
import { FiCircle } from "react-icons/fi";

export default function Logo() {
  return (
    <Flex align="flex-end" color="#ffffff">
      <Flex align="center">
        <Icon fontSize="lg" as={FiCircle} mr={1} />
        <Text fontSize={"lg"} fontWeight="700" mr={3}>
          Spaced
        </Text>
      </Flex>
      <Flex
        align={"flex-end"}
        mb={"3px"}
        display={["none", "block", "block", "block"]}
      >
        <Text fontSize={"xs"} fontWeight="400" color="#ffffffb3">
          Simple spaced repetition
        </Text>
      </Flex>
    </Flex>
  );
}
