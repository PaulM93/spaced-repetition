import React from "react";
import { Heading, Flex } from "@chakra-ui/react";

interface SectionTitlesProps {
  navVal: string;
}

export default function SectionTitles({ navVal }: SectionTitlesProps) {
  let title;
  switch (navVal) {
    case "Review Cards":
      title = "Review Collections";
      break;
    case "Add Collection":
      title = "Add Collection";
      break;
    default:
  }

  return (
    <Flex>
      <Heading mb={5} size="md">
        {title}
      </Heading>
    </Flex>
  );
}
