import React from "react";
import { Flex, Text, Icon } from "@chakra-ui/react";
import { FiFolder, FiLayers } from "react-icons/fi";
import CustomTooltip from "../../Util/CustomTooltip";

interface TitleDisplayProps {
  title: string;
  cardsDue: number;
  totalCards: number;
}

export default function TitleDisplay({
  title,
  cardsDue,
  totalCards,
}: TitleDisplayProps) {
  return (
    <Flex flexDir={"column"}>
      <Flex align="center" mb={2}>
        <Icon as={FiFolder} mr={1} />
        <Text fontWeight={500} fontSize="md">
          {title}
        </Text>
      </Flex>
      <CustomTooltip
        label={`${totalCards} ${totalCards !== 1 ? "cards" : "card"} in total.`}
      >
        <Flex color="#666666" align="center">
          <Text fontSize="sm" mr={2}>
            {cardsDue} {cardsDue !== 1 ? "cards due" : "card due"}
          </Text>
          <Icon as={FiLayers} />
        </Flex>
      </CustomTooltip>
    </Flex>
  );
}
