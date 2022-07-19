import React, { useState } from "react";
import { useTheme } from "../ThemeContext";
import { motion } from "framer-motion";

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

  return (
    <motion.div
      onHoverStart={() => setWhileHover(true)}
      onHoverEnd={() => setWhileHover(false)}
      onClick={(e) => handleSubmit(e)}
      style={{
        position: "relative",
        width: "100%",
      }}
    >
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
    </motion.div>
  );
}
