import React from "react";
import { Button, Box, Flex, HStack } from "@chakra-ui/react";
import ValueButton from "./ValueButton";

interface ValueButtonProps {
  handleCardActions: (val: number) => void;
  view: boolean;
  setView: (val: boolean) => void;
}

export default function ValueButtons({
  handleCardActions,
  view,
  setView,
}: ValueButtonProps) {
  //Value Buttons
  //   const valueButtonArr = [0, 1, 2, 3, 4, 5];
  //Value, text, color
  const valueButtonArr = [
    {
      val: 0,
      text: "Blackout",
      color: "red",
    },
    {
      val: 1,
      text: "Almost",
      color: "red",
    },
    {
      val: 2,
      text: "Wrong",
      color: "red",
    },
    {
      val: 3,
      text: "Correct",
      color: "orange",
    },
    {
      val: 4,
      text: "Easy",
      color: "green",
    },
    {
      val: 5,
      text: "Perfect",
      color: "green",
    },
  ];

  return (
    <Flex h="5%" w={"100%"} justify="center">
      {!view ? (
        <Box>
          <Button variant="outline" onClick={() => setView(true)} size="md">
            View answer
          </Button>
        </Box>
      ) : (
        <HStack spacing={1}>
          {valueButtonArr.map((button) => (
            <ValueButton
              text={button.text}
              color={button.color}
              val={button.val}
              handleCardActions={handleCardActions}
            />
          ))}
        </HStack>
      )}
    </Flex>
  );
}
