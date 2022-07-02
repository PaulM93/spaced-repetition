import React from "react";
import {
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
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
  return (
    <>
      <FormControl isInvalid={cardExists.val && cardExists.id === "front"}>
        <FormLabel fontSize={"xs"} color={"#ffffffb3"}>
          Front of Card
        </FormLabel>
        <Input
          focusBorderColor={
            cardExists.val && cardExists.id === "front" ? "red.300" : ""
          }
          borderColor={"#262626"}
          value={cardDetails.front}
          color="#ffffffb3"
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
        <FormLabel fontSize={"xs"} color={"#ffffffb3"}>
          Back of Card
        </FormLabel>
        <Input
          borderColor={"#262626"}
          focusBorderColor={
            cardExists.val && cardExists.id === "back" ? "red.300" : ""
          }
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
