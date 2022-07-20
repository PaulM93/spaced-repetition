import React, { useState, useEffect } from "react";
import { useTheme } from "../ThemeContext";
import { useColorMode, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FiSun, FiMoon } from "react-icons/fi";

export default function ColorMode() {
  const { setTheme, themes } = useTheme();
  const [whileHover, setWhileHover] = useState<boolean>(false);
  const { colorMode, toggleColorMode } = useColorMode();
  const color = useColorModeValue("white", "gray.800");

  const handleColorMode = () => {
    toggleColorMode();
  };

  useEffect(() => {
    setTheme(themes[colorMode === "dark" ? "dark" : "light"]);
  }, [colorMode]);

  return (
    <motion.div
      onClick={() => handleColorMode()}
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        marginLeft: "15px",
      }}
      onHoverStart={() => setWhileHover(true)}
      onHoverEnd={() => setWhileHover(false)}
    >
      <motion.button
        initial={{ opacity: 1 }}
        animate={{
          opacity: whileHover ? 0 : 1,
          rotate: whileHover ? 360 : 0,
          transition: { duration: 1 },
        }}
        style={{
          position: "absolute",
          color: color,
        }}
      >
        <FiSun />
      </motion.button>
      <motion.button
        initial={{ opacity: 0 }}
        animate={{
          opacity: whileHover ? 1 : colorMode === "light" ? 1 : 0,
          rotate: whileHover ? 360 : 0,
          transition: { duration: 1 },
        }}
        style={{
          zIndex: 10,
          color: colorMode === "light" ? "#805AD5" : "white",
        }}
      >
        <FiMoon />
      </motion.button>
    </motion.div>
  );
}
