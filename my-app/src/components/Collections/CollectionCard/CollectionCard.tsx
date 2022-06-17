import React from "react";
import {
  Button,
  Box,
  Flex,
  Heading,
  HStack,
  Tag,
  Divider,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

interface CollectionCard {
  name: string;
  category: string;
  cards: [{}];
  handleCollectionSelection: (val: string, type: string) => void;
  handleAddCards: (val: string) => void;
}

export default function CollectionCard({
  name,
  category,
  cards,
  handleCollectionSelection,
  handleAddCards,
}: CollectionCard) {
  return (
    <motion.div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "1rem",
        borderRadius: "5px",
        border: "2px solid #F3F5F7",
      }}
      whileHover={{
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
      }}
    >
      <Flex mb={5} flexDir="column" align={"center"} w="100%">
        <Heading mb={2} size="md">
          {name}
        </Heading>
        <Box>
          <Tag size={"sm"} variant="outline" colorScheme="blue">
            {category}
          </Tag>
        </Box>
      </Flex>
      <Button
        onClick={() => handleCollectionSelection(name, "review")}
        size="sm"
        colorScheme={"blue"}
        mb={5}
      >
        Review Cards
      </Button>
      <Divider />
      <HStack>
        {/* Add button opens the add modal  */}
        <Button
          onClick={() => handleCollectionSelection(name, "add")}
          size="sm"
        >
          Add
        </Button>
        <Button
          size="sm"
          onClick={() => handleCollectionSelection(name, "edit")}
        >
          Edit
        </Button>
        {/* Edit shows all cards which we can then edit or delete */}
        <Button size="sm">Delete</Button>
      </HStack>
    </motion.div>
  );
}
