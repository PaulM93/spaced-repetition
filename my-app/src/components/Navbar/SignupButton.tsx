import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Box } from "@chakra-ui/react";

export default function SignupButton() {
  const [whileHover, setWhileHover] = useState<boolean>(false);
  //title
  //location

  return (
    <Link to="/signup">
      <motion.div
        onHoverStart={() => setWhileHover(true)}
        onHoverEnd={() => setWhileHover(false)}
      >
        <Box position={"relative"}>
          <motion.button
            style={{
              borderRadius: "7px",
              padding: "5px 10px 5px 10px",
              color: "white",
              fontSize: "12px",
              background: "#7928CA",
              border: "1px solid #7928CA",
              position: "absolute",
            }}
            initial={{ opacity: 1 }}
            animate={{
              opacity: whileHover ? 0 : 1,
              transition: { duration: 0.5 },
            }}
            aria-label={"Sign up"}
          >
            Train your Brain
          </motion.button>
          <motion.button
            style={{
              borderRadius: "7px",
              padding: "5px 10px 5px 10px",
              color: "#ffffffb3",
              fontSize: "12px",
              border: "1px solid #ffffffb3",
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: whileHover ? 1 : 0,
              transition: { duration: 0.5 },
            }}
          >
            Train your Brain
          </motion.button>
        </Box>
      </motion.div>
    </Link>
  );
}
