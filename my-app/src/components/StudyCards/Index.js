import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
  useColorModeValue,
  HStack,
} from "@chakra-ui/react";
//Components
import HowToUse from "./HowToUse";
import ValueButtons from "./ValueButtons";
import NavButton from "../Navbar/NavButton";
import TitleDisplay from "../CollectionsNew/CollectionCard/TitleDisplay";

function practice(flashcard, grade) {
  console.log("Flashcard", flashcard);
  const { interval, repetition, efactor } = supermemo(flashcard, grade);
  const dueDate = dayjs(Date.now()).add(interval, "day").toISOString();

  return { ...flashcard, interval, repetition, efactor, dueDate };
}

/*
  Width = 
  Initial Cards === starting val 
  Find percentage remaining and minus

  stusyCards/initialcards * 100
*/

export default function StudyCards({
  setStudyCollection,
  reviewedCards,
  setReviewedCards,
  resetStudyMode,
  handleStudyMode,
  studyMode,
  studyCollection,
  studyCards,
  handleSaveStudy,
  setStudyCards,
}) {
  const [view, setView] = useState(false);
  //Always reviewe the first card of the array
  const cardVal = [0];

  console.log("Study Mode", studyMode);

  const [initialCardVal, setInitialCardVal] = useState(0);
  useEffect(() => {
    setInitialCardVal(studyCards.length);
  }, [studyMode]);
  useEffect(() => {
    //Progress
    // alert("hello");
    const barWidth = 100 - (studyCards.length / initialCardVal) * 100;
    console.log("Bar width", barWidth);
    setProgressVal(barWidth);
    console.log("StudyCards.length", studyCards.length);
    console.log("initialCardVal", initialCardVal);
  }, [studyCards]);

  console.log("Initial", initialCardVal);

  console.log("Study Collection", studyCollection);

  console.log("StudyCards", studyCards);

  /*
    - User cycles through cards
    - Two arrays 
    1) Cards to study
    2) Reviewed cards
    - We remove from the cards to study and push into the reviewed cards
  */

  const [answerShadow, setAnswerShadow] = useState(false);
  //use Effect that sets opacity back to false
  const handleAnswerShadow = (val) => {
    setAnswerShadow(true);
  };
  useEffect(() => {
    if (answerShadow) {
      setTimeout(() => setAnswerShadow(false), 3000);
    }
  }, [answerShadow]);

  console.log("Answer shadow", answerShadow);

  //Progress Val
  const [progressVal, setProgressVal] = useState();
  const handleCardActions = (val) => {
    //depending on the val we set the ansewr shadow
    handleAnswerShadow(val);

    console.log("ValSelected", val);
    // console.log("handle", cardsToReview);
    //Supermemo the card
    let newCard;
    if (val === 0) {
      newCard = studyCards[0];
    } else {
      newCard = practice(studyCards[0], val);
    }
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
        alert("less than 3");
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

  // //Value Buttons
  // const valueButtonArr = [0, 1, 2, 3, 4, 5];
  // const valueButtonMarkup = valueButtonArr.map((val) => (
  //   <Button key={val} onClick={() => handleCardActions(val)}>
  //     {val}
  //   </Button>
  // ));

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

  //Color Mode
  const color = useColorModeValue("font.light", "font.dark");
  const background = useColorModeValue(
    "background.subtleLight",
    "background.subtleDark"
  );

  return studyCards.length !== 0 ? (
    <>
      <Box w="100%" position="relative" zIndex={0}>
        <motion.div
          style={{
            zIndex: 0,
            position: "absolute",
            width: "100%",
            padding: "20px",
            minHeight: "75vh",
            display: "flex",
            flexDirection: "column",
            borderRadius: "5px",
            justifyContent: "space-between",
            border: "1px solid grey",
          }}
        >
          {/* <Flex
        w={"100%"}
        p={10}
        minH="75vh"
        boxShadow={"5px 5px 11px 9px rgba(53,255,24,0.44)"}
        bg={background}
        flexDir={"column"}
        borderRadius="5px"
        justify="space-between"
      > */}
          <Flex h="5%" justify="space-between" w="100%" alignItems={"center"}>
            <TitleDisplay
              title={studyCollection.title}
              cardsDue={studyCards.length}
            />
            <HStack spacing={1}>
              <HowToUse />
              <Box onClick={() => handleSaveStudy()}>
                <NavButton title="Close and Save" url="" />
              </Box>
            </HStack>
          </Flex>
          {/* //Study div  */}
          <Flex align="center" h="90%" justify="center" flexDir={"column"}>
            {view ? (
              <Heading color={color} size="3xl">
                {studyCards[cardVal].front}
              </Heading>
            ) : (
              <Heading color={color} size="3xl">
                {studyCards[cardVal].back}
              </Heading>
            )}
            <Heading size="sm">{studyCards[0].dueDate}</Heading>
            {/* Completion bar - total number of cards/remaining   
            //Set inital number of cards when opened
          */}

            <motion.div
              style={{
                position: "relative",
                marginTop: "20px",
                width: "200px",
                height: "10px",
                background: "gray",
                borderRadius: "10px",
              }}
            >
              <motion.div
                style={{
                  position: "absolute",
                  height: "100%",
                  background: "green",
                  borderRadius: "10px",
                }}
                initial={{ width: "0%" }}
                animate={{
                  width: `${progressVal}%`,
                  transition: { duration: 1 },
                }}
              />
            </motion.div>

            {/* If correct put an effect on the border of the card  */}

            {/* show the number of cards remaining  */}
          </Flex>
          {/* Button Div  */}
          <ValueButtons
            handleCardActions={handleCardActions}
            view={view}
            setView={setView}
          />
        </motion.div>
        {/* If an answer is correct we set the box boxShadow and opacity properties to show feedback  */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: answerShadow ? 1 : 0,
            transition: { duration: 0.2 },
          }}
          style={{
            zIndex: -1,
            position: "absolute",
            width: "100%",
            padding: "20px",
            minHeight: "75vh",
            display: "flex",
            boxShadow: "5px 5px 11px 10px rgba(53,255,24,0.44)",
            flexDirection: "column",
            borderRadius: "5px",
            justifyContent: "space-between",
            border: "1px solid grey",
          }}
        />
      </Box>
      {/* </Flex> */}
    </>
  ) : (
    studyCompletedMarkup
  );
}
