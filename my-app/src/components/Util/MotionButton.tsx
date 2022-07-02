import React, { useState } from "react";
import { motion } from "framer-motion";
import { Box } from "@chakra-ui/react";

interface MotionButtonProps {
  text: string;
}

export default function MotionButton({ text }: MotionButtonProps) {
  const [whileHover, setWhileHover] = useState<boolean>(false);

  return (
    <motion.div
      onHoverStart={() => setWhileHover(true)}
      onHoverEnd={() => setWhileHover(false)}
    >
      <Box position={"relative"}>
        <motion.button
          style={{
            borderRadius: "7px",
            padding: "5px 10px 5px 10px",
            color: "#ffffffb3",
            fontSize: "12px",
            border: "1px solid #262626",
            position: "absolute",
          }}
          initial={{ opacity: 1 }}
          animate={{
            opacity: whileHover ? 0 : 1,
            transition: { duration: 0.5 },
          }}
          aria-label={text}
        >
          {text}
        </motion.button>
        <motion.button
          style={{
            borderRadius: "7px",
            padding: "5px 10px 5px 10px",
            color: "#ffffffb3",
            fontSize: "12px",
            border: "1px solid #ffffffb3",
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: whileHover ? 1 : 0,
            transition: { duration: 0.5 },
          }}
        >
          {text}
        </motion.button>
      </Box>
    </motion.div>
  );
}
