import React from "react";
import { useTheme } from "../ThemeContext";
import { motion } from "framer-motion";

interface ProgressBarProps {
  progressVal: number;
}

export default function ProgressBar({ progressVal }: ProgressBarProps) {
  const { theme } = useTheme();
  return (
    <>
      <motion.div style={theme.studyCard.progressBarVisible}>
        <motion.div
          style={theme.studyCard.progressBarHidden}
          initial={{ width: "0%" }}
          animate={{
            width: `${progressVal}%`,
            transition: { duration: 1 },
          }}
        />
      </motion.div>
    </>
  );
}
