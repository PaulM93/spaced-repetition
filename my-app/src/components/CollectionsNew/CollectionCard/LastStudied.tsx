import React from "react";
import { Flex, Icon, Text } from "@chakra-ui/react";
import { FiActivity } from "react-icons/fi";

interface LastStudiedProps {
  lastStudied: string;
}

export default function LastStudied({ lastStudied }: LastStudiedProps) {
  return (
    <Flex align="center">
      {/* Depending on the when studied we change the status  i.e. 1 day is green , 2 days orange, bot studied red  */}
      <Text color="#1DB954" fontSize="xs" mr={2}>
        {lastStudied}
      </Text>
      <Icon color="#1DB954" as={FiActivity} />
    </Flex>
  );
}
