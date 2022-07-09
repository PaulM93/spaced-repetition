import React from "react";
import { Link } from "react-router-dom";
import { Flex, Text, Icon, useColorModeValue } from "@chakra-ui/react";
import { FiCircle } from "react-icons/fi";

export default function Logo() {
  //ColorMode
  const color = useColorModeValue("font.light", "font.dark");
  const secondaryColor = useColorModeValue(
    "font.lightSubtle",
    "font.darkSubtle"
  );
  //
  return (
    <Link to="/">
      <Flex align="flex-end" color={color}>
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
          <Text fontSize={"xs"} fontWeight="400" color={secondaryColor}>
            Simple spaced repetition
          </Text>
        </Flex>
      </Flex>
    </Link>
  );
}
