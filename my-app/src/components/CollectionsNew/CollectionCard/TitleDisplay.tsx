import React from "react";
import { Flex, Text, Icon } from "@chakra-ui/react";
import { FiFolder, FiLayers } from "react-icons/fi";

interface TitleDisplayProps {
  title: string;
  cardCount: number;
}

export default function TitleDisplay({ title, cardCount }: TitleDisplayProps) {
  return (
    <Flex flexDir={"column"}>
      <Flex align="center" mb={2}>
        <Icon as={FiFolder} mr={1} />
        <Text fontWeight={500} fontSize="md">
          {title}
        </Text>
      </Flex>
      <Flex color="#666666" align="center">
        <Text fontSize="sm" mr={2}>
          {cardCount} {cardCount !== 1 ? "cards" : "card"}
        </Text>
        <Icon as={FiLayers} />
      </Flex>
    </Flex>
  );
}
