import React from "react";
import { Link } from "react-router-dom";
import { Button, Flex, HStack } from "@chakra-ui/react";
//Logout
import LogoutButton from "./LogoutButton";

interface NavButtons {
  navVal: string;
  setNavVal: (val: string) => void;
}

export default function NavButtons({ navVal, setNavVal }: NavButtons) {
  //Structure
  /*
        Main Buttons
        1) Add Collection
                    SubButtons
                        Add Card, edit cards, delete cards
        2) Review Cards
                    SubButton
                        Collection types 
    
    */
  // const navButtons = ["Add Collection", "Review Cards"];

  const navButtons = [
    {
      title: "Auth",
      url: "/auth",
    },
    {
      title: "Add Collection",
      url: "/addCollection",
    },
    {
      title: "Review Cards",
      url: "/cards",
    },
  ];

  const buttonMarkup = navButtons.map((button) => (
    <Link to={button.url}>
      <Button
        key={button.title}
        // variant={navVal === button ? "solid" : "outline"}
        // colorScheme={navVal === button ? "blue" : "gray"}
      >
        {button.title}
      </Button>
    </Link>
  ));

  return (
    <HStack spacing={2}>
      {buttonMarkup} <LogoutButton />
    </HStack>
  );
}
{
  /* <Button onClick={() => handleSave()}>Save</Button> */
}
{
  /* Save adds reviewedCards to cards and updates the database with this  */
}
