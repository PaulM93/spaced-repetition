import React from "react";
import { VStack, Button, useColorModeValue, Icon } from "@chakra-ui/react";
import { FiUser, FiTool, FiLogOut } from "react-icons/fi";

interface ControlButtonsProps {
  setSelectedPage: (val: string) => void;
  selectedPage: string;
  signUserOut: () => void;
}

export default function ControlButtons({
  setSelectedPage,
  selectedPage,
  signUserOut,
}: ControlButtonsProps) {
  const buttonColor = useColorModeValue("purple", "gray");
  const borderColor = useColorModeValue("#eaeaea", "#262626");
  const buttonArr = [
    { title: "General", icon: <Icon as={FiUser} /> },
    { title: "Settings", icon: <Icon as={FiTool} /> },
    { title: "Logout", icon: <Icon as={FiLogOut} /> },
  ];
  // const buttonArr = [{title: "General", icon: <MdBuild/>}, "Settings", "Logout"];
  return (
    <VStack minWidth={"100%"}>
      {buttonArr.map((button) => (
        <Button
          borderRadius={"5px"}
          leftIcon={button.icon}
          borderColor={borderColor}
          fontWeight="500"
          fontSize="14px"
          onClick={
            button.title !== "Logout"
              ? () => setSelectedPage(button.title)
              : () => signUserOut()
          }
          size="md"
          colorScheme={buttonColor}
          variant={selectedPage === button.title ? "solid" : "outline"}
          width="100%"
        >
          {button.title}
        </Button>
      ))}
    </VStack>
  );
}
