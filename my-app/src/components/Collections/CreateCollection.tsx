import React, { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  VStack,
  Button,
  useToast,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";

interface CreateCollection {
  collections: any;
  setCollections: any;
  setNavVal: (val: string) => void;
}

export default function CreateCollection({
  setCollections,
  collections,
  setNavVal,
}: CreateCollection) {
  interface Collection {
    cards: [{}];
    name: string;
    id: string;
    category: string; //language, sports etc
    createdAt: string;
  }

  //Create collection
  /*
    1) Enter details into state
    2) Push into Collection Arr
    3) We can edit, delete etc with the collection id
]*/

  //Option to edit collection too -- and delete it
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
    setNavVal("Review Cards");
    //Change button Val
    //Set the collection
    setCollections([...collections, collectionDetails]);
  };

  return (
    <>
      <VStack spacing={3}>
        <Input
          value={collectionDetails.name}
          onChange={handleChange}
          id="name"
          placeholder="Enter collection name..."
          size="md"
        />
        {/* //Add a collection tag  */}
        <Input
          value={collectionDetails.category}
          onChange={handleChange}
          id="category"
          placeholder="Collection category"
          size="md"
        />
        <Button onClick={() => handleSubmit()}>Add Collection</Button>
      </VStack>
    </>
  );
}
