import React from "react";
import CollectionCard from "./CollectionCard/CollectionCard";
import AddEditCollection from "./AddEditCollection";
import About from "../About/About";
import {
  Grid,
  Heading,
  Spinner,
  Flex,
  useColorModeValue,
  HStack,
} from "@chakra-ui/react";

export default function CollectionDisplay({
  collections,
  handleStudyMode,
  setOrderDisplay,
  isLoading,
  setStudyCards,
  setCardsNotDue,
}) {
  //Color Mode
  const color = useColorModeValue("font.light", "font.dark");

  const loadingMarkup = (
    <Flex width="100%" justify={"center"} mt={10}>
      <Spinner size="sm" color="#fff" />
    </Flex>
  );

  // console.log("Collection Display", collections);

  return isLoading && !collections ? (
    loadingMarkup
  ) : collections.length !== 0 ? (
    <Grid
      templateColumns={[
        "repeat(1, 1fr)",
        "repeat(2, 1fr)",
        "repeat(3, 1fr)",
        "repeat(3, 1fr)",
      ]}
      gap={3}
      minW="100%"
    >
      {collections.map((collection) => (
        <CollectionCard
          setCardsNotDue={setCardsNotDue}
          setStudyCards={setStudyCards}
          handleStudyMode={handleStudyMode}
          key={collection.id}
          collection={collection}
          setOrderDisplay={setOrderDisplay}
        />
      ))}
    </Grid>
  ) : (
    <Flex
      minHeight={"fit-content"}
      mt={5}
      flexDir={"column"}
      minWidth="100%"
      align="center"
    >
      <Heading size="sm" color={color} mb={5}>
        Get Started by creating a collection
      </Heading>
      <HStack>
        <AddEditCollection type={"add"} collection={null} />
        <About />
      </HStack>
    </Flex>
  );
}
