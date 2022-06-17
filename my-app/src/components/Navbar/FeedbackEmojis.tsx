import React from "react";
import { motion } from "framer-motion";

import { HStack } from "@chakra-ui/react";

interface FeebackEmojiProps {
  setRating: (val: number) => void;
  rating: number;
}

export default function FeedbackEmojis({
  setRating,
  rating,
}: FeebackEmojiProps) {
  const emojiarr = [
    { emoji: "🤩", val: 4 },
    { emoji: "😀", val: 3 },
    { emoji: "😕", val: 2 },
    { emoji: "😭", val: 1 },
  ];

  const buttonArr = emojiarr.map((i) => (
    <motion.button
      onClick={() => setRating(i.val)}
      whileHover={{
        y: -3,
        transition: {
          duration: 0.2,
          type: "spring",
        },
      }}
      style={{
        height: "30px",
        width: "30px",
        borderRadius: "10px",
        background: rating === i.val ? "#2F855A" : "#262626",
      }}
    >
      {i.emoji}
    </motion.button>
  ));

  return <HStack>{buttonArr}</HStack>;
}
