import React, { useState } from "react";
import dayjs from "dayjs";
import { supermemo, SuperMemoItem, SuperMemoGrade } from "supermemo";
import {
  Flex,
  Heading,
  Input,
  Text,
  HStack,
  VStack,
  Button,
} from "@chakra-ui/react";

// interface Flashcard extends SuperMemoItem {
//   front: string;
//   back: string;
//   dueDate: string;
// }

function practice(flashcard, grade) {
  const { interval, repetition, efactor } = supermemo(flashcard, grade);
  const dueDate = dayjs(Date.now())
    .add(interval, "day")
    .toISOString();

  return { ...flashcard, interval, repetition, efactor, dueDate };
}

// interface Card {
//   cards: any;
//   setCards: any;
//   reviewedCards: any;
//   setReviewedCards: any;
// }

export default function ReviewCards({
  cards,
  setCards,
  reviewedCards,
  setReviewedCards,
  handleReviewCompleted,
  handleClose,
}) {
  const [view, setView] = useState(false);
  //If the card has the due date of today we review it
  const [cardVal, setCardVal] = useState(0);

  //   const frontOfCardMarkup =
  const valueButtonArr = [0, 1, 2, 3, 4, 5];
  const valueButtonMarkup = valueButtonArr.map((val) => (
    <Button key={val} onClick={() => handleCardActions(val, cardVal)}>
      {val}
    </Button>
    //function on the button which sets the value of the card

    /*
        1) Remove card from cardArr
        2) Push new card into cardArr with updated values
    
    */
  ));

  const handleCardActions = (val) => {
    //Supermemo the card
    const newObj = practice(cards[0], val);
    //Card ID -- we are using front text atm
    const cardID = cards[cardVal].front;

    //Filter out the card -- creates new arr without the card
    const filteredCards = cards.filter((item) => item.front !== cardID);

    //Get todays date as iso string to compare with the due date
    const now = dayjs(Date.now()).toISOString();
    const nowJav = new Date(now);
    console.log("Now", now);
    //Due date of the card
    const dueDate = new Date(newObj.dueDate);
    //Differnece between due date and time right now -- if less than 86400 we push into cards again
    const difference = Math.trunc(dueDate - nowJav) / 1000; //divide by 1000 to match 86400
    console.log("difference", difference);

    // if (difference <= 86400) {
    //   alert("back you go");
    // } else {
    //   alert("well done");
    // }

    //Values 0,1,2 = incorrect
    //Values 3,4,5 = correct
    //If value is incorrect we immediately send it back to the cards

    //Only do this if the cards.length is not 0 i.e. the review is completed
    if (cards.length) {
      if (val < 3) {
        setCards([...filteredCards, newObj]);
      } else {
        //If value is correct but due date is less than 86400 we sent it back to the cards
        if (difference <= 86400) {
          setCards([...filteredCards, newObj]);
        } else {
          //If correct and due date is more than 86400 we push to the reviewedcards
          setCards([...filteredCards]);
          setReviewedCards([...reviewedCards, newObj]);
        }
      }
    }

    setView(false);
    /*
      1) Remove the card from the array 
      2) Push into review arr
      3) When user closes we merge this array with the original one
    
    
    */
  };

  // console.log("CardVal", cardVal);

  // console.log("CardArrLength", cardArrLength);

  //Card order vals === show first card = increase val -- use array

  //Set new values of card
  //   flashcard = practice(flashcard, 5);
  // console.log(flashcard);

  return cards.length ? (
    <Flex flexDir={"column"} align="center" w={"100%"} p={10} borderRadius={4}>
      <Flex align="center" mb={5}>
        <Text mr={4}>Remaining Cards: {cards.length}</Text>
        <Button size="xs" onClick={() => handleClose()}>
          Close
        </Button>
      </Flex>
      {view ? (
        <Heading size="lg" mb={10}>
          {cards[cardVal].front}
        </Heading>
      ) : (
        <Heading size="lg" mb={10}>
          {cards[cardVal].back}
        </Heading>
      )}
      {view ? (
        <HStack>{valueButtonMarkup}</HStack>
      ) : (
        <Button onClick={() => setView(true)}>View</Button>
      )}
    </Flex>
  ) : (
    <Button onClick={() => handleReviewCompleted()}>Save Progress</Button>
  );
}
