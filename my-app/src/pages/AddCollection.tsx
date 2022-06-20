import React, { useState } from "react";
//Components
import MotionContainer from "../components/CollectionsNew/CollectionCard/MotionContainer";
import {
  Flex,
  Heading,
  Input,
  VStack,
  Button,
  Text,
  Divider,
  Box,
  useToast,
} from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";

export default function AddCollection({ location }) {
  interface Collection {
    cards: [{}];
    name: string;
    id: string;
    category: string; //language, sports etc
    createdAt: string;
  }
  const [collectionDetails, setCollectionDetails] = useState<Collection>({
    cards: [{}],
    name: "",
    category: "",
    createdAt: "",
    id: uuidv4(),
  });
  const toast = useToast();

  const handleChange = (e: any) => {
    setCollectionDetails({
      ...collectionDetails,
      [e.target.id]: e.target.value,
    });
  };

  //Check if card already exists
  const handleSubmit = () => {
    toast({
      title: "Collection created",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    setCollectionDetails({
      ...collectionDetails,
      name: "",
      category: "",
      id: uuidv4(),
      createdAt: "",
    });
    //Change Nav
    // setNavVal("Review Cards");
    //Change button Val
    //Set the collection
    // setCollections([...collections, collectionDetails]);
  };

  return (
    <Flex width="100%" justify="center">
      <Flex>
        <MotionContainer>
          <Flex flexDir={"column"} align="center">
            <Box p={"40px"}>
              <Heading size={"md"} color="white">
                Add a Collection
              </Heading>
            </Box>

            <VStack spacing={3} p={"0px 40px 00px 40px"}>
              <Input
                variant="outline"
                borderColor={"#262626"}
                focusBorderColor="green.500"
                errorBorderColor="red.300"
                value={collectionDetails.name}
                onChange={handleChange}
                id="name"
                placeholder="Enter collection name..."
                size="md"
              />
              {/* //Add a collection tag  */}
              <Input
                variant="outline"
                borderColor={"#262626"}
                focusBorderColor="green.500"
                errorBorderColor="red.300"
                value={collectionDetails.category}
                onChange={handleChange}
                id="category"
                placeholder="Collection category"
                size="md"
              />
            </VStack>
            <Box p={"40px"}>
              <Button
                size="md"
                variant="solid"
                colorScheme={"green"}
                onClick={() => handleSubmit()}
              >
                Add Collection
              </Button>
            </Box>
          </Flex>
        </MotionContainer>
      </Flex>
    </Flex>
  );
}
