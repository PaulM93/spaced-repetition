import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { supermemo, SuperMemoItem, SuperMemoGrade } from "supermemo";
import { Flex, Box, HStack, Divider } from "@chakra-ui/react";
//Components
import FeedbackLayout from "./FeedbackLayout";
import HowToUse from "./HowToUse";
import ValueButtons from "./ValueButtons";
import NavButton from "../Navbar/NavButton";
import TitleDisplay from "../CollectionsNew/CollectionCard/TitleDisplay";
import CardDisplay from "./CardDisplay";
import StudyCompleted from "./StudyCompleted";

function practice(flashcard, grade) {
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
  //Render buttons
  const [view, setView] = useState(false);
  //Always reviewe the first card of the array
  const cardVal = [0];

  //Add a study timer

  const [initialCardVal, setInitialCardVal] = useState(0);
  useEffect(() => {
    if (studyMode) {
      setInitialCardVal(studyCards.length);
    }
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

  /*
    - User cycles through cards
    - Two arrays 
    1) Cards to study
    2) Reviewed cards
    - We remove from the cards to study and push into the reviewed cards
  */

  const [answerShadow, setAnswerShadow] = useState({
    shadowColor: "",
    val: false,
  });
  //use Effect that sets opacity back to false
  const handleAnswerShadow = (val) => {
    let color;
    const colors = [
      "0px 0px 5px 2px #E53E3E",
      "0px 0px 5px 2px #E53E3E",
      "0px 0px 5px 2px #DD6B20",
      "0px 0px 5px 2px #48BB78",
      "0px 0px 5px 2px #48BB78",
      "0px 0px 5px 2px #805AD5",
    ];
    color = colors[val];
    console.log("color", color);
    setAnswerShadow({ shadowColor: color, val: true });
  };
  useEffect(() => {
    //Find colors with val = colors[val]

    if (answerShadow.val === true) {
      setTimeout(() => setAnswerShadow({ shadowColor: "", val: false }), 600);
    }
  }, [answerShadow]);

  // console.log("Answer shadow", answerShadow);

  //Progress Val
  const [progressVal, setProgressVal] = useState(0);
  console.log("Progress val", progressVal);
  const handleCardActions = (val) => {
    //depending on the val we set the ansewr shadow
    handleAnswerShadow(val);

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
        // alert("less than 3");
        //We want to set the cards to reviewe as the filtered cards and the new card
        setStudyCards([...filteredCards, newCard]);
      } else {
        //If value is correct but due date is less than 86400 we sent it back to the cards
        if (difference <= 86400) {
          // alert("less than a day");
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

  //Timer Feature
  /*
    -- get time now when opened
    -- get time now when last card completed
    -- find difference
  
  */

  return (
    <>
      <FeedbackLayout answerShadow={answerShadow}>
        {/* Header  */}
        <Box>
          <Flex
            mb={6}
            h="5%"
            justify="space-between"
            w="100%"
            alignItems={"flex-start"}
          >
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
          <Divider />
        </Box>
        {/* Study div  */}
        {studyCards.length !== 0 ? (
          <CardDisplay
            progressVal={progressVal}
            studyCards={studyCards}
            view={view}
          />
        ) : (
          <StudyCompleted handleSaveStudy={handleSaveStudy} />
        )}
        {/* Buttons  */}
        <Box>
          {studyCards.length !== 0 ? (
            <>
              <Divider mb={6} />
              <ValueButtons
                handleCardActions={handleCardActions}
                view={view}
                setView={setView}
              />
            </>
          ) : null}
        </Box>
      </FeedbackLayout>
    </>
  );
}
