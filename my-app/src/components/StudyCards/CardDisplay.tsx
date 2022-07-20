import React from "react";
import { Heading, Flex, Box, useColorModeValue } from "@chakra-ui/react";
import ProgressBar from "./ProgressBar";

export default function CardDisplay({ studyCards, view, progressVal }) {
  //Color Mode
  const color = useColorModeValue("font.light", "font.dark");
  const cardVal = 0;
  return (
    <Flex align="center" h="90%" justify="center" flexDir={"column"}>
      <Box mb={3}>
        {view ? (
          <Heading color={color} size="3xl">
            {studyCards[cardVal].front}
          </Heading>
        ) : (
          <Heading color={color} size="3xl">
            {studyCards[cardVal].back}
          </Heading>
        )}
      </Box>
      <ProgressBar progressVal={progressVal} />
    </Flex>
  );
}
