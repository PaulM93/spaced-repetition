import React from "react";
import { motion } from "framer-motion";

export default function MotionContainer({ children }) {
  return (
    <motion.div
      style={{
        // cursor: "pointer",
        border: "1px solid #262626",
        boxShadow:
          "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
        borderRadius: "10px",
        height: "100%",
        width: "100%",
        color: "#fafafa",
        background: "#141414",
      }}
      whileHover={{
        boxShadow:
          "rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px",
      }}
    >
      {children}
    </motion.div>
  );
}
