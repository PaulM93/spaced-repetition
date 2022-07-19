import React, { useState } from "react";
import { motion } from "framer-motion";
import CustomTooltip from "./CustomTooltip";
import { Box } from "@chakra-ui/react";
import { FiEdit2, FiPlus, FiTrash } from "react-icons/fi";

interface MotionIconButtonProps {
  iconType: string;
  label: string;
}

export default function MotionIconButton({
  iconType,
  label,
}: MotionIconButtonProps) {
  const [whileHover, setWhileHover] = useState<boolean>(false);

  let icon: any;
  switch (iconType) {
    case "edit":
      icon = <FiEdit2 />;
      break;
    case "add":
      icon = <FiPlus />;
      break;
    case "delete":
      icon = <FiTrash />;
      break;
    default:
  }

  return (
    <>
      <CustomTooltip label={label}>
        <motion.div
          onHoverStart={() => setWhileHover(true)}
          onHoverEnd={() => setWhileHover(false)}
        >
          <Box position={"relative"}>
            <motion.button
              style={{
                position: "absolute",
                padding: "5px",
              }}
              initial={{ opacity: 1 }}
              animate={{
                scale: whileHover ? 1.2 : 1,
                opacity: whileHover ? 0 : 1,
                transition: { duration: 0.3 },
              }}
            >
              {icon}
            </motion.button>
            <motion.button
              style={{ color: "#805AD5", padding: "5px" }}
              initial={{ opacity: 0 }}
              animate={{
                y: whileHover ? -2 : 0,
                scale: whileHover ? 1.2 : 1,
                opacity: whileHover ? 1 : 0,
                transition: { duration: 0.3 },
              }}
            >
              {icon}
            </motion.button>
          </Box>
        </motion.div>
      </CustomTooltip>
    </>
  );
}
