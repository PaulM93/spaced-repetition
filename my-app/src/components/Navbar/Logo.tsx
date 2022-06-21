import React from "react";
import { Link } from "react-router-dom";
import { Flex, Text, Icon } from "@chakra-ui/react";
import { FiCircle } from "react-icons/fi";

export default function Logo() {
  return (
    <Link to="/">
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
    </Link>
  );
}
