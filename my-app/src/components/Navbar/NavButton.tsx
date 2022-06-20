import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Box } from "@chakra-ui/react";

interface NavButton {
  title: string;
  url: string;
}

export default function NavButton({ title, url }: NavButton) {
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
            style={{
              borderRadius: "7px",
              padding: "5px 10px 5px 10px",
              color: "#ffffffb3",
              fontSize: "12px",
              border: "1px solid #262626",
              position: "absolute",
            }}
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
            {title}
          </motion.button>
        </Box>
      </Link>
    </motion.div>
  );
}
