import React from "react";
import { Button, Box, Flex } from "@chakra-ui/react";

interface ValueButtonProps {
  color: string;
  val: number;
  text: string;
  handleCardActions: (val: number) => void;
}

export default function ValueButton({
  color,
  val,
  text,
  handleCardActions,
}: ValueButtonProps) {
  return (
    <Button
      onClick={() => handleCardActions(val)}
      variant="solid"
      _hover={{ bg: color }}
    >
      {text}
      {/* Perfect 🧠 */}
    </Button>
  );
}
