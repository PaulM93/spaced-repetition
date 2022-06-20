import React from "react";
//Components
import Buttons from "./CollectionCard/Buttons";
import CustomTooltip from "../Util/CustomTooltip";
import MotionContainer from "./CollectionCard/MotionContainer";
import TitleDisplay from "./CollectionCard/TitleDisplay";
import LastStudied from "./CollectionCard/LastStudied";
import {
  Button,
  Box,
  Flex,
  Icon,
  GridItem,
  IconButton,
} from "@chakra-ui/react";
import { FiMoreVertical } from "react-icons/fi";

interface CardProp {
  setOrderDisplay: (val: boolean) => void;
}

export default function Card({ setOrderDisplay }) {
  return (
    <GridItem h="200px" width="100%">
      <MotionContainer>
        <Flex
          flexDir={"column"}
          justifyContent="space-between"
          minHeight="100%"
          p={"25px"}
        >
          <Flex flexDir={"column"}>
            <Flex justify={"space-between"} align="flex-start">
              <TitleDisplay title={"Spanish"} cardCount={14} />
              <Box>
                <CustomTooltip label={"Change Order"}>
                  <IconButton
                    onClick={() => setOrderDisplay(true)}
                    size="sm"
                    cursor={"move"}
                    colorScheme={"grey"}
                    aria-label="Change Order"
                    icon={<Icon mt={1} as={FiMoreVertical} />}
                  />
                </CustomTooltip>
              </Box>
            </Flex>
          </Flex>
          <Flex>
            <LastStudied lastStudied={"1 day ago"} />
          </Flex>
          <Flex justify={"space-between"}>
            <Buttons />
            <Button colorScheme={"blackAlpha"} size="sm">
              Study
            </Button>
          </Flex>
        </Flex>
      </MotionContainer>
    </GridItem>
  );
}
