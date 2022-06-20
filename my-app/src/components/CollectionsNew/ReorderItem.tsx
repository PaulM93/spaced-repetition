import React from "react";
//Components
import MotionContainer from "./CollectionCard/MotionContainer";
import TitleDisplay from "./CollectionCard/TitleDisplay";
import { Reorder, useDragControls } from "framer-motion";
import { Flex, Heading, Icon } from "@chakra-ui/react";
import { DragHandleIcon } from "@chakra-ui/icons";

interface Props {
  item: { title: string; cardCount: number };
  position: number;
}

export default function ReorderItem({ item, position }: Props) {
  const controls = useDragControls();

  //Depending on the number of items we set the number of the square

  return (
    <>
      <Flex w="100%" height="100px" mb={2}>
        <Flex
          boxShadow={
            "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px"
          }
          border="1px solid #262626"
          borderRadius={"10px"}
          width={"10%"}
          bg="#141414"
          height="100px"
          align={"center"}
          justify="center"
          padding="25px"
          mr={2}
        >
          <Heading size="md" color="#ffffff">
            #{position + 1}
          </Heading>
        </Flex>
        <Reorder.Item
          style={{
            width: "100%",
            display: "flex",
          }}
          value={item}
          id={item.title}
          dragListener={false}
          dragControls={controls}
        >
          <MotionContainer>
            <Flex
              p={"25px"}
              h="100%"
              w="100%"
              justify={"space-between"}
              align="center"
            >
              <Flex flexDir={"column"}>
                <TitleDisplay title={"Spanish"} cardCount={14} />
              </Flex>
              <Icon
                color="#ffffffb3"
                as={DragHandleIcon}
                onPointerDown={(e) => controls.start(e)}
                cursor="grab"
              />
            </Flex>
          </MotionContainer>
        </Reorder.Item>
      </Flex>
    </>
  );
}
