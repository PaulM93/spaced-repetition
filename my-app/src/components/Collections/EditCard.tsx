import React, { useState, useEffect } from "react";
import { Flex, Heading, Input, VStack, Button } from "@chakra-ui/react";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";

// interface CreateCard {
//   setCards: any;
//   cards: any;
// }

export default function EditCard({ handleEditCard, card, handleClose }) {
  const [cardDetails, setCardDetails] = useState({
    front: "",
    back: "",
  });

  //Set edit card vals
  useEffect(() => {
    console.log("useeffect", card);
    setCardDetails({
      front: card[0].front,
      back: card[0].back,
      ...card[0],
    });
  }, [card]);

  //Handle front and back text change
  const handleChange = (e: any) => {
    setCardDetails({
      ...cardDetails,
      [e.target.id]: e.target.value,
    });
  };

  console.log("Edit Card", cardDetails);

  //Check if card already exists
  const handleSubmit = () => {
    setCardDetails({
      ...cardDetails,
      front: "",
      back: "",
    });
    handleEditCard(cardDetails);
  };

  //Create a new cards array here
  //Once we press close or save it merges with the old cards

  return (
    <Flex
      flexDir={"column"}
      align="center"
      w={"40%"}
      p={10}
      boxShadow={"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}
      borderRadius={4}
    >
      <Flex align="center" mb={5}>
        <Heading size="md" mr={2}>
          Create Card
        </Heading>
        <Button size="xs" onClick={() => handleClose()}>
          Close
        </Button>
      </Flex>
      <VStack spacing={3}>
        <Input
          value={cardDetails.front}
          onChange={handleChange}
          id="front"
          placeholder="Front of card..."
          size="md"
        />
        <Input
          value={cardDetails.back}
          onChange={handleChange}
          id="back"
          placeholder="Back of card..."
          size="md"
        />
        <Button
          disabled={cardDetails.front === "" || cardDetails.back === ""}
          onClick={() => handleSubmit()}
        >
          Add Card
        </Button>
      </VStack>
    </Flex>
  );
}
