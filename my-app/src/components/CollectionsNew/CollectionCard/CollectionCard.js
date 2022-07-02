import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editCollection } from "../../../features/collections/collectionsSlice";
//Components
import CustomTooltip from "../../Util/CustomTooltip";
import MotionContainer from "./MotionContainer";
import TitleDisplay from "./TitleDisplay";
import LastStudied from "./LastStudied";
import StudyButton from "./StudyButton";
import DeleteButton from "./DeleteButton";
import AddEditCollection from "../AddEditCollection";
import AddCards from "../AddCards/Index";

import {
  Box,
  Flex,
  Icon,
  HStack,
  GridItem,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { FiMoreVertical } from "react-icons/fi";

export default function CollectionCard({
  setOrderDisplay,
  collection,
  handleStudyMode,
}) {
  const toast = useToast();
  const dispatch = useDispatch();

  //Collection data
  const [collectionData, setcollectionData] = useState({
    title: collection.title,
    description: collection.description,
    category: collection.category,
    cards: JSON.parse(collection.cards),
    id: collection.id,
    nextStudyDate: collection.nextStudyDate,
  });

  const setToast = (statusType, title) => {
    toast({
      title: title,
      status: statusType,
      duration: 1000,
      isClosable: true,
    });
  };

  //Add Cards
  const handleAddCards = (newCard) => {
    setcollectionData({
      ...collectionData,
      cards: [...collectionData.cards, newCard],
    });
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

  return (
    <GridItem h="200px" width="100%">
      <MotionContainer>
        <Flex
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
              />
              <Box>
                <CustomTooltip label={"Change Order"}>
                  <IconButton
                    onClick={() => setOrderDisplay(true)}
                    size="sm"
                    cursor={"move"}
                    colorScheme={"grey"}
                    aria-label="Change Order"
                    icon={<Icon mt={1} as={FiMoreVertical} />}
                  />
                </CustomTooltip>
              </Box>
            </Flex>
          </Flex>
          <Flex>
            <LastStudied lastStudied={"1 day ago"} />
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
