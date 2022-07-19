import React from "react";
import { Box, Heading, Text, useColorModeValue } from "@chakra-ui/react";

interface TitleProps {
  title: string;
  subititle: string;
}

export default function Title({ title, subititle }: TitleProps) {
  const titleColor = useColorModeValue("font.light", "font.dark");
  const subtitleColor = useColorModeValue(
    "font.lightSubtle",
    "font.darkSubtle"
  );

  return (
    <Box mb={5}>
      <Heading size="sm" color={titleColor}>
        {title}
      </Heading>
      <Text fontSize={"sm"} color={subtitleColor}>
        {subititle}
      </Text>
    </Box>
  );
}
