import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
//Components
import AuthNavbar from "./AuthNavbar";
import NavWithoutUser from "./NavWithoutUser";
////////
import { Flex, Text, HStack, Icon, IconButton, Avatar } from "@chakra-ui/react";
import { DragHandleIcon } from "@chakra-ui/icons";
import { FiCircle } from "react-icons/fi";

export default function Index() {
  const user = false;
  return user ? <AuthNavbar /> : <NavWithoutUser />;
}
