import React, { useState } from "react";
import Card from "./Card";
import { Flex } from "@chakra-ui/react";

interface EditCardsProps {
  allCards: {}[];
  setAllCards: any;
}

export default function EditCards({ allCards, setAllCards }: EditCardsProps) {
  // export default function EditCards({ allCards, setAllCards }: EditCardsProps) {
  //Handle Functions
  console.log("allCards here", allCards);

  //Edit Card
  const [editInProgess, setEditInProgess] = useState<{
    val: boolean;
    id: string;
  }>({
    val: false,
    id: "",
  });
  const handleEditCard = (
    newVal: string,
    cardObj: { id: string },
    val: string
  ) => {
    //If different
    if (cardObj[val] !== newVal) {
      setEditInProgess({
        val: true,
        id: cardObj.id,
      });
    } else {
      setEditInProgess({
        val: false,
        id: cardObj.id,
      });
    }
    // const foundIndex: number = allCards.findIndex(
    //   (card: { id: string }) => card.id === cardObj.id
    // );
    const newState = allCards.map((card: { id: string }) => {
      if ((card.id = cardObj.id)) {
        return { ...card, val: newVal };
      }
    });
    setAllCards(newState);

    //Update the card
    // allCards[foundIndex][val] = newVal;
  };

  //Save Edited Card
  const saveEditedCard = (id) => {
    console.log("SavedCards", allCards);
    // const filteredCards = allCards.filter((card) => card.id !== id);
    // const newCardsArr = [...filteredCards, editedCard];
    // console.log("NewCards arr", newCardsArr);
    /*
      1) Filter out the old card
      2) Create a new arr of other cards
      3) Put the edited card into this array
      4) Send to database
    */
  };

  //Delete Card
  // const deleteCard = (id) => {
  //   //Works
  //   console.log("allCards", allCards);
  //   const filteredCards = allCards.filter((card) => card.id !== id);
  //   setAllCards(filteredCards);
  //   console.log("filteredCards", filteredCards);
  // };

  //Reset Card
  // const resetCard = (id) => {
  //   //Make a new supermemo card with the same details
  // };

  return (
    <Flex flexDir={"column"} w="100%">
      {allCards.length !== 0
        ? allCards.map((card: { id: string; back: string; front: string }) => (
            <Card
              card={{
                id: card.id,
                back: card.back,
                front: card.front,
              }}
              editInProgress={{
                val: editInProgess.val,
                id: editInProgess.id,
              }}
              handleEditCard={handleEditCard}
            />
          ))
        : null}
    </Flex>
  );
}
