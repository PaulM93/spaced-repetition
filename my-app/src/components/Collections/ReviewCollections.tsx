import React, { useState, useEffect } from "react";
import { Button, Text, Flex, Grid, GridItem, useToast } from "@chakra-ui/react";
import { motion } from "framer-motion";
//Component
import CollectionCard from "./CollectionCard/CollectionCard";
import EditContainer from "./EditContainer";
import ReviewCards from "../ReviewCards";
import AddCard from "./CollectionCard/AddCard";

interface ReviewCollections {
  collections: any;
  setCollections: any;
}

export default function ReviewCollections({
  collections,
  setCollections,
}: ReviewCollections) {
  //Include a timer
  const toast = useToast();

  //Markup Types // review, add, edit, delete
  const [markupType, setMarkupType] = useState("");
  //User selects a collection
  const [selectedCollection, setSelectedCollection] = useState("");
  //We need to set the correct cards for the collection also
  const handleCollectionSelection = (val: string, type: string) => {
    setMarkupType(type);
    setSelectedCollection(val);
    //Find index position of collection obj and setCards state depending on this
    const index = collections.findIndex((obj) => {
      return obj.name === val;
    });
    setCards(collections[index].cards);
  };

  //Close add, edit, review, delete
  const handleClose = () => {
    setMarkupType("");
    setSelectedCollection("");
  };

  //Add Cards
  const handleAddCards = (newCard: {}) => {
    //Merge the added cards with the cards of the selected collection
    //Cards have already been set to the correct collection so we just merge the new card
    setCards([...cards, newCard]);
    //We must also save to the collection
    const updateArr = [...cards, newCard];
    const updatedData = collections.map((obj) => {
      if (obj.name === selectedCollection) {
        return { ...obj, cards: updateArr };
      } else return obj;
    });
    setCollections(updatedData);
    //Success message
    setToast("success", "Card Added");
  };

  //Immediate translations to language with the google translator api

  // console.log("These are the collections", collections);

  //Main Cards
  const [cards, setCards] = useState([]);
  const [reviewedCards, setReviewedCards] = useState([]);
  // console.log("These are the cards", cards);
  // console.log("These are the reviewed cards", reviewedCards);

  // //Save Cards -- We will need to update the collection
  // const handleSave = () => {
  //   setReviewedCards([]);
  //   setCards(reviewedCards);
  // };

  const setToast = (statusType: any, title: string) => {
    toast({
      title: title,
      status: statusType,
      duration: 2000,
      isClosable: true,
    });
  };

  //Review Completed
  const handleReviewCompleted = () => {
    //Set the toast to show message that it's saved
    setToast("success", "Progress Saved");

    //We must also update the collection state for this object
    //Use index and replace the whole cards arr with the reviewed cards
    //We would update the database here and then set reviewed cards to [] as well as cards []

    //Update Cards in the collection with the reviewed data
    const updatedData = collections.map((obj) => {
      if (obj.name === selectedCollection) {
        return { ...obj, cards: reviewedCards };
      } else return obj;
    });
    setCollections(updatedData);
    //Reser selected collection
    setSelectedCollection("");
    //Reset reviewed cards
    setReviewedCards([]);
  };

  //Delete Card -- use the id
  const handleDeleteCard = (id: string) => {
    //Filter out the card from the arr and then set the new arr
    const updatedCards = cards.filter((obj) => obj.id !== id);
    //Set the cards
    setCards(updatedCards);
    //Update the collection
    const updatedData = collections.map((obj) => {
      if (obj.name === selectedCollection) {
        return { ...obj, cards: updatedCards };
      } else return obj;
    });
    setCollections(updatedData);
    //Set toast to show card is deleted
    setToast("success", "Card Deleted");
  };

  //Edit Card -- use the id
  const handleEditCard = (editedCard: { id: string }) => {
    const cardId = editedCard.id;
    //Filter out the old card
    const cardsArr = cards.filter((obj) => obj.id !== cardId);
    //Add the new card to the cards
    const updatedCards = [...cardsArr, editedCard];
    setCards(updatedCards);
    //Update the collection
    const updatedData = collections.map((obj) => {
      if (obj.name === selectedCollection) {
        return { ...obj, cards: updatedCards };
      } else return obj;
    });
    setCollections(updatedData);
    //Success message
    setToast("success", "Card Edited");
  };

  //We need to store all the collections here
  const collectionCardMarkup =
    collections.length &&
    collections.map((collection) => (
      <GridItem key={collection}>
        <CollectionCard
          handleAddCards={handleAddCards}
          cards={collection.cards}
          name={collection.name}
          category={collection.category}
          handleCollectionSelection={handleCollectionSelection}
        />
      </GridItem>
    ));

  let markup;
  //No Collection is selected so we show all collections
  if (selectedCollection === "") {
    markup = collections.length ? (
      <Grid gap={4} templateColumns="repeat(3, 1fr)" minWidth="100%" h="200px">
        {collectionCardMarkup}
      </Grid>
    ) : (
      <Text fontSize="md">You have no collections...</Text>
    );
  } else {
    //Collection Selected
    switch (markupType) {
      case "review":
        markup = (
          <ReviewCards
            handleClose={handleClose}
            handleReviewCompleted={handleReviewCompleted}
            cards={cards}
            setCards={setCards}
            reviewedCards={reviewedCards}
            setReviewedCards={setReviewedCards}
          />
        );
        break;
      case "add":
        markup = (
          <AddCard handleClose={handleClose} handleAddCards={handleAddCards} />
        );
        break;
      case "edit":
        markup = (
          <EditContainer
            handleClose={handleClose}
            handleEditCard={handleEditCard}
            handleDeleteCard={handleDeleteCard}
            cards={cards}
            setCards={setCards}
          />
        );
    }
  }

  return (
    <>
      <Flex minWidth="100%" flexDir={"column"} align="center">
        {markup}
      </Flex>
    </>
  );
}
