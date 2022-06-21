import React, { useState } from "react";
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
  const [whileHover, setWhileHover] = useState<boolean>(false);

  return (
    <Box position={"relative"} width="100%" onClick={(e) => handleSubmit(e)}>
      <motion.button
        style={{
          borderRadius: "7px",
          padding: "10px 20px 10px 20px",
          color: "white",
          width: "100%",
          fontSize: "16px",
          background: "#7928CA",
          border: "1px solid #7928CA",
          position: "absolute",
        }}
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
        style={{
          borderRadius: "7px",
          width: "100%",
          padding: "10px 20px 10px 20px",
          color: "#ffffffb3",
          fontSize: "16px",
          border: "1px solid #ffffffb3",
        }}
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
