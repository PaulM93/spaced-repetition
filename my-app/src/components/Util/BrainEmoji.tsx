import React from "react";
import { motion } from "framer-motion";

export default function BrainEmoji() {
  return (
    <motion.div
      initial={{ scale: 0.9 }}
      animate={{
        scale: 1.1,
        rotate: [0, 10, 0],
        transition: {
          duration: 1.2,
          yoyo: Infinity,
        },
      }}
      style={{ marginLeft: "7px" }}
    >
      🧠
    </motion.div>
  );
}
