import React, { useState } from "react";
import { useTheme } from "../ThemeContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Box } from "@chakra-ui/react";

interface SignupButtonProps {
  type: "landing" | "nav";
}

export default function SignupButton({ type }: SignupButtonProps) {
  const [whileHover, setWhileHover] = useState<boolean>(false);
  //ColorMode
  const { theme } = useTheme();
  console.log("Theme", theme);

  return (
    // <h1>hello</h1>
    <Link to="/signup">
      <motion.div
        onHoverStart={() => setWhileHover(true)}
        onHoverEnd={() => setWhileHover(false)}
      >
        <Box position={"relative"}>
          <motion.button
            style={
              type === "nav"
                ? theme.buttons.signupButtonNav.initial
                : theme.buttons.signupButtonLanding.initial
            }
            initial={{ opacity: 1 }}
            animate={{
              opacity: whileHover ? 0 : 1,
              transition: { duration: 0.5 },
            }}
            aria-label={"Sign up"}
          >
            Train your Brain 🧠
          </motion.button>
          <motion.button
            style={
              type === "nav"
                ? theme.buttons.signupButtonNav.hover
                : theme.buttons.signupButtonLanding.hover
            }
            initial={{ opacity: 0 }}
            animate={{
              opacity: whileHover ? 1 : 0,
              transition: { duration: 0.5 },
            }}
          >
            Train your Brain 🧠
          </motion.button>
        </Box>
      </motion.div>
    </Link>
  );
}
