import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { supermemo, SuperMemoItem, SuperMemoGrade } from "supermemo";
import CustomTooltip from "../Util/CustomTooltip";
import {
  Grid,
  Heading,
  Spinner,
  IconButton,
  Flex,
  Box,
  Icon,
  Button,
} from "@chakra-ui/react";
import { FiX } from "react-icons/fi";

function practice(flashcard, grade) {
  console.log("Flashcard", flashcard);
  const { interval, repetition, efactor } = supermemo(flashcard, grade);
  const dueDate = dayjs(Date.now()).add(interval, "day").toISOString();

  return { ...flashcard, interval, repetition, efactor, dueDate };
}

export default function StudyCards({
  setStudyCollection,
  reviewedCards,
  setReviewedCards,
  resetStudyMode,
  handleStudyMode,
  studyCollection,
  studyCards,
  handleSaveStudy,
  setStudyCards,
}) {
  const [view, setView] = useState(false);
  //Always reviewe the first card of the array
  const cardVal = [0];

  /*
    - User cycles through cards
    - Two arrays 
    1) Cards to study
    2) Reviewed cards
    - We remove from the cards to study and push into the reviewed cards
  */
  const handleCardActions = (val) => {
    // console.log("handle", cardsToReview);
    //Supermemo the card
    const newCard = practice(studyCards[0], val);
    console.log("New card", newCard);
    //Card ID
    const cardID = studyCards[cardVal].id;
    //Filter out the card that has been reviewed
    const filteredCards = studyCards.filter((card) => card.id !== cardID);

    //Get todays date as iso string to compare with the due date
    const now = dayjs(Date.now()).toISOString();
    const nowJav = new Date(now);
    console.log("Now", now);
    //Due date of the card
    const dueDate = new Date(newCard.dueDate);
    //Differnece between due date and time right now -- if less than 86400 we push into cards again
    const difference = Math.trunc(dueDate - nowJav) / 1000; //divide by 1000 to match 86400
    console.log("difference", difference);

    //Card viewed is filtered out
    console.log("Filtered cards", filteredCards);
    // setCardsToReview([...filteredCards, newCard]);
    // setStudyCollection({
    //   ...studyCollection,
    //   cards: [...filteredCards, newCard],
    // });
    // setStudyCards([...filteredCards, newCard]);

    //Only do this if the cards.length is not 0 i.e. the review is completed
    if (studyCards.length) {
      if (val < 3) {
        //We want to set the cards to reviewe as the filtered cards and the new card
        setStudyCards([...filteredCards, newCard]);
      } else {
        //If value is correct but due date is less than 86400 we sent it back to the cards
        if (difference <= 86400) {
          alert("less than a day");
          setStudyCards([...filteredCards, newCard]);
        } else {
          console.log("filtered", filteredCards);
          //If correct and due date is more than 86400 we push to the reviewedcards
          setStudyCards([...filteredCards]);
          setReviewedCards([...reviewedCards, newCard]);
        }
      }
    }

    setView(false);
  };

  //Value Buttons
  const valueButtonArr = [0, 1, 2, 3, 4, 5];
  const valueButtonMarkup = valueButtonArr.map((val) => (
    <Button key={val} onClick={() => handleCardActions(val)}>
      {val}
    </Button>
  ));

  const studyCompletedMarkup = (
    <>
      <Flex flexDir={"column"}>
        <Heading color="#fff" size="lg">
          Review Completed
        </Heading>
        <Button onClick={() => handleSaveStudy()}>Save Progress</Button>
      </Flex>
    </>
  );

  return studyCards.length !== 0 ? (
    <>
      <Flex
        w={"100%"}
        p={10}
        minH="75vh"
        bg="#141414"
        flexDir={"column"}
        borderRadius="5px"
        justify="space-between"
      >
        <Flex h="5%" justify="space-between" w="100%" alignItems={"center"}>
          <Heading size="sm" color="#ffffffb3">
            {studyCollection.title}
          </Heading>
          <CustomTooltip label={"Close and save"}>
            <IconButton
              onClick={() => resetStudyMode()}
              colorScheme={"blackAlpha"}
              size="sm"
              aria-label={"Close study mode"}
              icon={<Icon color="#666666" as={FiX} />}
            />
          </CustomTooltip>
        </Flex>
        {/* //Study div  */}
        <Flex align="center" h="90%" justify="center">
          {view ? (
            <Heading color="#fff" size="3xl">
              {studyCards[cardVal].front}
            </Heading>
          ) : (
            <Heading color="#fff" size="3xl">
              {studyCards[cardVal].back}
            </Heading>
          )}
        </Flex>
        {/* Button Div  */}
        <Flex h="5%" w={"100%"} justify="center">
          {!view ? (
            <Box>
              <Button onClick={() => setView(true)} size="md">
                View
              </Button>
            </Box>
          ) : (
            valueButtonMarkup
          )}
        </Flex>
      </Flex>
    </>
  ) : (
    studyCompletedMarkup
  );
}
