import React from "react";
import { Heading, Flex, Box, Button } from "@chakra-ui/react";
import BrainEmoji from "../Util/BrainEmoji";

interface StudyCompletedProps {
  handleSaveStudy: () => void;
}

export default function StudyCompleted({
  handleSaveStudy,
}: StudyCompletedProps) {
  return (
    <>
      <Flex flexDir={"column"} width="100%" align={"center"}>
        <Heading size="lg" mb={8} display="flex">
          Brain Training Completed <BrainEmoji />
        </Heading>
        <Box>
          <Button colorScheme={"purple"} onClick={() => handleSaveStudy()}>
            Save Progress
          </Button>
        </Box>
      </Flex>
    </>
  );
}
