import React from "react";
//Components
import Navbar from "./Navbar/Index";
import {
  Button,
  Box,
  Flex,
  Divider,
  Text,
  Heading,
  HStack,
  Grid,
  Icon,
  Tooltip,
  GridItem,
  IconButton,
  Avatar,
} from "@chakra-ui/react";

export default function Layout({ children }) {
  return (
    <Flex>
      <Navbar />
      {children}
    </Flex>
  );
}
