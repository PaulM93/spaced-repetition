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
      mobText: "0 😭",
      text: "Blackout 😭",
      color: "#322659",
    },
    {
      val: 1,
      mobText: "1 😨",
      text: "Wrong 😨",
      color: "#44337A",
    },
    {
      val: 2,
      mobText: "2 🙁",
      text: "Almost 🙁",
      color: "#553C9A",
    },
    {
      val: 3,
      mobText: "3 😐",
      text: "Correct 😐",
      color: "#6B46C1",
    },
    {
      val: 4,
      mobText: "4 😐",
      text: "Easy 😉",
      color: "#805AD5",
    },
    {
      val: 5,
      mobText: "5 🤩",
      text: "Perfect 🤩",
      color: "#9F7AEA",
    },
  ];

  return (
    <Flex h="5%" w={"100%"} justify="center" position={"relative"}>
      {!view ? (
        <Box>
          <Button
            _hover={{ background: "#805AD5", color: "#fff" }}
            fontSize="14px"
            variant="outline"
            onClick={() => setView(true)}
            size="md"
          >
            View answer
          </Button>
        </Box>
      ) : (
        <HStack spacing={1} position="relative">
          {valueButtonArr.map((button) => (
            <ValueButton
              mobText={button.mobText}
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
