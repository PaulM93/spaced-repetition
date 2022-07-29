import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Flex, Icon, Text } from "@chakra-ui/react";
import { FiActivity } from "react-icons/fi";

interface LastStudiedProps {
  lastStudied: string;
}

export default function LastStudied({ lastStudied }: LastStudiedProps) {
  dayjs.extend(relativeTime);

  return lastStudied !== "" ? (
    <Flex align="center">
      {/* Depending on the when studied we change the status  i.e. 1 day is green , 2 days orange, bot studied red  */}
      <Text color="#1DB954" fontSize="xs" mr={2}>
        Studied {dayjs(lastStudied).fromNow()}
      </Text>
      <Icon color="#1DB954" as={FiActivity} />
    </Flex>
  ) : null;
}
