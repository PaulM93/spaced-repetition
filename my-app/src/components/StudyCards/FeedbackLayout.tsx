import React from "react";
import { useTheme } from "../ThemeContext";
import { motion } from "framer-motion";
import { Box, transition } from "@chakra-ui/react";

interface FeedbackLayoutProps {
  children: JSX.Element;
  answerShadow: {
    shadowColor: string;
    val: boolean;
  };
}

export default function FeedbackLayout({
  children,
  answerShadow,
}: FeedbackLayoutProps) {
  const { theme } = useTheme();

  console.log("Box shadow", answerShadow.shadowColor);

  return (
    <Box w="100%" position="relative" zIndex={0} minH={"80vh"}>
      <motion.div style={theme.studyCard.visible}>{children}</motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: answerShadow.val ? 1 : 0,
          transition: { duration: 0.3 },
        }}
        style={{
          zIndex: -1,
          position: "absolute",
          width: "100%",
          minHeight: "100%",
          // minHeight: "75vh",
          boxShadow: `${answerShadow.shadowColor}`,
          // boxShadow: `5px 5px 11px 10px ${answerShadow.shadowColor}`,
          borderRadius: "10px",
        }}
      />
    </Box>
  );
}
