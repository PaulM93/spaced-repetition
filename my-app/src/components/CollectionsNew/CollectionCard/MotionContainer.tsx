import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../ThemeContext";

export default function MotionContainer({ children }) {
  const { theme } = useTheme();
  return (
    <motion.div
      style={theme.collectionCard}
      whileHover={{
        boxShadow:
          "rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px",
      }}
    >
      {children}
    </motion.div>
  );
}
