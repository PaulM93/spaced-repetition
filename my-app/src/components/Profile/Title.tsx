import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

interface TitleProps {
  title: string;
  subititle: string;
}

export default function Title({ title, subititle }: TitleProps) {
  return (
    <Box mb={5}>
      <Heading size="sm">{title}</Heading>
      <Text fontSize={"sm"} color="#ffffffb3">
        {subititle}
      </Text>
    </Box>
  );
}
