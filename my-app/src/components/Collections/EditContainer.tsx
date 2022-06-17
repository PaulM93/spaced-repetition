import React, { useState } from "react";
import { Button, Text, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
//Components
import EditCard from "./EditCard";

export default function EditContainer({
  cards,
  setCards,
  handleDeleteCard,
  handleClose,
  handleEditCard,
}) {
  const cardMarkup = cards.map((card) => (
    <motion.div
      key={card.id}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1rem",
        borderRadius: "5px",
        border: "2px solid #F3F5F7",
      }}
      whileHover={{
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
      }}
    >
      <Flex>
        <Text mr={4}>{card.front}</Text>
        <Text>{card.back}</Text>
      </Flex>
      <Flex>
        <Button onClick={() => editCard(card.id)} mr={2} size="xs">
          Edit
        </Button>
        <Button size="xs" onClick={() => handleDeleteCard(card.id)}>
          Delete
        </Button>
      </Flex>
    </motion.div>
  ));

  //Handle edit cards here
  /*
      1) Find card by it's id
      2) Display Card and it's values
      3) Allow user to update it's fields
  
  */
  const [editing, setEditing] = useState(false);
  const [cardDetails, setCardDetails] = useState({});
  const editCard = (id: string) => {
    setEditing(true);
    //Access card here
    const card = cards.filter((obj) => obj.id === id);
    setCardDetails(card);
    //HandleEditCard here
  };

  console.log("These are the card details", cardDetails);

  //To edit the card we can remove the original card and replace it with a new one

  return (
    //Display all cards here -- with edit and delete buttons
    !editing ? (
      cardMarkup
    ) : (
      <EditCard
        card={cardDetails}
        handleEditCard={handleEditCard}
        handleClose={handleClose}
      />
    )
  );
}
