import React, { useState } from "react";
import { Flex, Text, Button } from "@chakra-ui/react";
import { motion, Reorder } from "framer-motion";
//Componrnts
import ReorderItem from "./ReorderItem";
import NavButton from "../Navbar/NavButton";

const data = [
  {
    title: "Spanish",
    position: 1,
  },
  {
    title: "English",
    position: 2,
  },
  {
    title: "Science",
    position: 3,
  },
];

// const initialItems = ["🍅 Tomato", "🥒 Cucumber", "🧀 Cheese", "🥬 Lettuce"];

//Change position property of the item depending on where it is
//Find position in the new array and set

const initialItems = [
  { title: "Spanish", cardCount: 10 },
  { title: "English", cardCount: 20 },
];

interface ReorderList {
  setOrderDisplay: (val: boolean) => void;
}

export default function ReorderList({ setOrderDisplay }) {
  const [items, setItems] = useState(initialItems);

  return (
    <Flex width={"100%"} mt={4} flexDir="column">
      <Flex w="100%" justify={"space-between"} align="center" mb={2}>
        <Text width="15%" fontSize={"xs"} color="#ffffff">
          Position
        </Text>
        <Button size="sm" onClick={() => setOrderDisplay(false)}>
          Save
        </Button>
      </Flex>
      <Reorder.Group
        axis="y"
        onReorder={setItems}
        values={items}
        style={{ width: "100%" }}
      >
        {items.map((item, index) => (
          <ReorderItem position={index} key={item.title} item={item} />
        ))}
      </Reorder.Group>
    </Flex>
  );
}
