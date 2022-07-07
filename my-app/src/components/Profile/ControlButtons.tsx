import React from "react";
import { motion } from "framer-motion";
import { VStack } from "@chakra-ui/react";

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
  const buttonArr = ["General", "Settings", "Logout"];
  return (
    <VStack minWidth={"100%"}>
      {buttonArr.map((button) => (
        <motion.button
          onClick={
            button !== "Logout"
              ? () => setSelectedPage(button)
              : () => signUserOut()
          }
          style={{
            minWidth: "100%",
            padding: "10px",
            border:
              selectedPage === button ? "1px solid #fff" : "1px solid #262626",
            fontSize: "12px",
            borderRadius: "7px",
            color: "#ffffffb3",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
          //Put cool subtle animation of gray background which moves
        >
          {button}
        </motion.button>
      ))}
    </VStack>
  );
}
