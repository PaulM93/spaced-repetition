import React, { useState } from "react";
import Card from "./Card";
import dayjs from "dayjs";
import { filter, Flex } from "@chakra-ui/react";

interface EditCardsProps {
  collection: {};
  allCards: {}[];
  setAllCards: any;
  generateID: () => void;
  saveUpdatedCards: ({}) => void;
}

export default function EditCards({
  allCards,
  setAllCards,
  generateID,
  collection,
  saveUpdatedCards,
}: EditCardsProps) {
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
    const newState = allCards.map((card: { id: string }) => {
      if (card.id === cardObj.id) {
        return { ...card, [val]: newVal };
      }
      return card;
    });
    setAllCards(newState);
  };

  //Handle Save Cards
  const handleSaveCards = () => {
    saveUpdatedCards(allCards);
  };

  //Delete Card
  const deleteCard = (id: string) => {
    //Works
    console.log("allCards", allCards);
    const filteredCards = allCards.filter(
      (card: { id: string }) => card.id !== id
    );
    //Save to database
    setAllCards(filteredCards);
    saveUpdatedCards(filteredCards);
  };

  //Reset Card
  const resetCard = (id: string) => {
    // When user clicks a popover asks if they are sure
    const resetDetails = {
      interval: 0,
      repetition: 0,
      efactor: 2.5,
      dueDate: dayjs(Date.now()).toISOString(),
    };
    const newState = allCards.map(
      (card: { id: string; front: string; back: string }) => {
        if (card.id === id) {
          return {
            id: card.id,
            front: card.front,
            back: card.back,
            ...resetDetails,
          };
        }
        return card;
      }
    );
    setAllCards(newState);
    saveUpdatedCards(newState);
  };

  return (
    <Flex flexDir={"column"} w="100%">
      {allCards.length !== 0
        ? allCards.map((card: { id: string; back: string; front: string }) => (
            <Card
              key={card.id}
              card={{
                id: card.id,
                back: card.back,
                front: card.front,
              }}
              resetCard={resetCard}
              deleteCard={deleteCard}
              editInProgress={{
                val: editInProgess.val,
                id: editInProgess.id,
              }}
              handleSaveCards={handleSaveCards}
              handleEditCard={handleEditCard}
            />
          ))
        : null}
    </Flex>
  );
}
