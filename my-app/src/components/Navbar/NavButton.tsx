import React, { useState } from "react";
import { useTheme } from "../ThemeContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Box } from "@chakra-ui/react";

interface NavButtonProps {
  title: string;
  url: string;
}

export default function NavButton({ title, url }: NavButtonProps) {
  //ColorMode
  const { theme } = useTheme();
  const [whileHover, setWhileHover] = useState<boolean>(false);
  //title
  //location

  return (
    <motion.div
      onHoverStart={() => setWhileHover(true)}
      onHoverEnd={() => setWhileHover(false)}
    >
      <Link to={url}>
        <Box position={"relative"}>
          <motion.button
            style={theme.buttons.navButton.initial}
            initial={{ opacity: 1 }}
            animate={{
              opacity: whileHover ? 0 : 1,
              transition: { duration: 0.5 },
            }}
            aria-label={title}
          >
            {title}
          </motion.button>
          <motion.button
            style={theme.buttons.navButton.hover}
            initial={{ opacity: 0 }}
            animate={{
              opacity: whileHover ? 1 : 0,
              transition: { duration: 0.5 },
            }}
          >
            {title}
          </motion.button>
        </Box>
      </Link>
    </motion.div>
  );
}
