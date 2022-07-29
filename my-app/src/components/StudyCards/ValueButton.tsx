import React, { useState } from "react";
import { Text } from "@chakra-ui/react";
import { useTheme } from "../ThemeContext";
import { motion } from "framer-motion";

interface ValueButtonProps {
  color: string;
  val: number;
  text: string;
  mobText: string;
  handleCardActions: (val: number) => void;
}

export default function ValueButton({
  color,
  val,
  text,
  mobText,
  handleCardActions,
}: ValueButtonProps) {
  const { theme } = useTheme();
  const [whileHover, setWhileHover] = useState({ val: false, type: "" });

  return (
    <>
      <motion.div
        onClick={() => handleCardActions(val)}
        onHoverStart={() => setWhileHover({ val: true, type: text })}
        onHoverEnd={() => setWhileHover({ val: false, type: "" })}
      >
        <motion.button
          animate={{
            y: whileHover.val && whileHover.type === text ? -2 : 0,
            background:
              whileHover.val && whileHover.type === text
                ? color
                : "transparent",
            color: whileHover.val && whileHover.type === text ? "#ffffff" : "",
          }}
          style={theme.studyCard.valueButton}
        >
          <Text display={["none", "none", "block", "block"]}>{text}</Text>
          <Text display={["block", "block", "none", "none"]}>{mobText}</Text>
        </motion.button>
      </motion.div>
    </>
  );
}
