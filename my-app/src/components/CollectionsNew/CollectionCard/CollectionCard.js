import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { editCollection } from "../../../features/collections/collectionsSlice";
//Components
import MotionContainer from "./MotionContainer";
import TitleDisplay from "./TitleDisplay";
import LastStudied from "./LastStudied";
import StudyButton from "./StudyButton";
import DeleteButton from "./DeleteButton";
import AddEditCollection from "../AddEditCollection";
import AddCards from "../AddCards/Index";
import Category from "./Category";

import {
  Flex,
  HStack,
  GridItem,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";

export default function CollectionCard({ collection, handleStudyMode }) {
  const toast = useToast();
  const dispatch = useDispatch();

  //Collection data
  const [collectionData, setcollectionData] = useState({
    title: "",
    description: "",
    category: "",
    cards: [],
    id: "",
    nextStudyDate: "",
    lastStudyDate: "",
  });

  useEffect(() => {
    setcollectionData({
      title: collection.title,
      description: collection.description,
      category: collection.category,
      cards: JSON.parse(collection.cards),
      id: collection.id,
      nextStudyDate: collection.nextStudyDate,
      lastStudyDate: collection.lastStudyDate,
    });
  }, [collection]);

  const setToast = (statusType, title) => {
    toast({
      title: title,
      status: statusType,
      duration: 1000,
      isClosable: true,
    });
  };

  //We need to ensure the data here is fresh from a study session

  //Add Cards
  const handleAddCards = (newCard) => {
    // console.log("CollectionData", collectionData);

    const collectionCardArr = collectionData.cards;
    console.log("CollectionCardArr", collectionCardArr);
    const newCardArr = [...collectionCardArr, newCard];
    console.log("NewcardArr", newCardArr);
    setcollectionData({
      ...collectionData,
      cards: newCardArr,
    });
    // setCardsToBeSaved([...cardsToBeSaved, newCard]);
    setToast("success", "Card Added");
  };

  //Move this to the dashboard
  const saveCollection = () => {
    dispatch(editCollection(collectionData));
  };

  //Save Card edits
  const saveUpdatedCards = (allCards) => {
    const newStateCollection = {
      ...collectionData,
      cards: allCards,
    };
    setcollectionData(newStateCollection);
    dispatch(editCollection(newStateCollection));
  };

  //Color Mode
  const color = useColorModeValue("font.light", "font.dark");

  return (
    <GridItem h="200px" width="100%">
      <MotionContainer>
        <Flex
          color={color}
          flexDir={"column"}
          justifyContent="space-between"
          minHeight="100%"
          p={"25px"}
        >
          <Flex flexDir={"column"}>
            <Flex justify={"space-between"} align="flex-start">
              <TitleDisplay
                title={collection.title}
                cardsDue={collection.cardsDue}
                totalCards={collectionData.cards.length}
              />
              <Category
                category={collection.category}
                description={collection.description}
              />
            </Flex>
          </Flex>
          <Flex>
            <LastStudied lastStudied={collection.lastStudyDate} />
          </Flex>
          <Flex justify={"space-between"}>
            <HStack spacing={1}>
              <DeleteButton id={collection.id} />,
              <AddCards
                collection={collection}
                cards={collection.cards}
                saveUpdatedCards={saveUpdatedCards}
                saveCollection={saveCollection}
                handleAddCards={handleAddCards}
              />
              <AddEditCollection
                type={"edit"}
                collection={{
                  title: collection.title,
                  id: collection.id,
                  description: collection.description,
                  category: collection.category,
                }}
              />
            </HStack>
            {/* Study button - disable if now cards are due  */}
            <StudyButton
              nextStudyDate={collection.nextStudyDate}
              cardsDue={collection.cardsDue}
              collectionData={collectionData}
              handleStudyMode={handleStudyMode}
            />
          </Flex>
        </Flex>
      </MotionContainer>
    </GridItem>
  );
}
