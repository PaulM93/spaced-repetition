import React from "react";
import {
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  useColorModeValue,
} from "@chakra-ui/react";

interface AddCardsProps {
  cardExists: { val: boolean; id: string };
  handleChange: (e: any) => void;
  cardDetails: { front: string; back: string };
}

export default function AddCards({
  cardExists,
  handleChange,
  cardDetails,
}: AddCardsProps) {
  //Color Mode
  const color = useColorModeValue("font.light", "font.dark");
  const inputColor = useColorModeValue(
    "input.border.light",
    "input.border.dark"
  );

  return (
    <>
      <FormControl isInvalid={cardExists.val && cardExists.id === "front"}>
        <FormLabel fontSize={"xs"} color={color}>
          Front of Card
        </FormLabel>
        <Input
          focusBorderColor={
            cardExists.val && cardExists.id === "front"
              ? "red.300"
              : "purple.500"
          }
          borderColor={inputColor}
          value={cardDetails.front}
          color={color}
          onChange={handleChange}
          id="front"
          placeholder="Front of card..."
          size="md"
        />
        {cardExists.val && cardExists.id === "front" && (
          <FormErrorMessage>Card already exists</FormErrorMessage>
        )}
      </FormControl>
      <FormControl
        mt={4}
        isInvalid={cardExists.val && cardExists.id === "back"}
      >
        <FormLabel fontSize={"xs"} color={color}>
          Back of Card
        </FormLabel>
        <Input
          borderColor={inputColor}
          focusBorderColor={
            cardExists.val && cardExists.id === "back"
              ? "red.300"
              : "purple.500"
          }
          color={color}
          value={cardDetails.back}
          onChange={handleChange}
          id="back"
          placeholder="Back of card..."
          size="md"
        />
        {cardExists.val && cardExists.id === "back" && (
          <FormErrorMessage>Card already exists</FormErrorMessage>
        )}
      </FormControl>
    </>
  );
}
