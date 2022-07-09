import React, { useState } from "react";
import { useTheme } from "../ThemeContext";
import { motion } from "framer-motion";
import { Box } from "@chakra-ui/react";

interface AuthButtonProps {
  handleSubmit: any;
  ariaLabel: string;
  buttonText: string;
  loading: boolean;
}

export default function AuthButton({
  handleSubmit,
  ariaLabel,
  buttonText,
  loading,
}: AuthButtonProps) {
  const { theme } = useTheme();
  const [whileHover, setWhileHover] = useState<boolean>(false);

  console.log("Themsde", theme);

  return (
    <Box position={"relative"} width="100%" onClick={(e) => handleSubmit(e)}>
      <motion.button
        style={theme.buttons.authButton.initial}
        initial={{ opacity: 1 }}
        animate={{
          opacity: whileHover ? 0 : 1,
          transition: { duration: 0.5 },
        }}
        aria-label={ariaLabel}
      >
        {!loading ? buttonText : "Loading..."}
      </motion.button>
      <motion.button
        onHoverStart={() => setWhileHover(true)}
        onHoverEnd={() => setWhileHover(false)}
        style={theme.buttons.authButton.hover}
        aria-label={ariaLabel}
        initial={{ opacity: 0 }}
        animate={{
          opacity: whileHover ? 1 : 0,
          transition: { duration: 0.5 },
        }}
      >
        {!loading ? buttonText : "Loading..."}
      </motion.button>
    </Box>
  );
}
