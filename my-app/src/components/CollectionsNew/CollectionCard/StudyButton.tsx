import React from "react";
import { Button, Tooltip, Box } from "@chakra-ui/react";
import dayjs from "dayjs";
import Navbutton from "../../Navbar/NavButton";

interface StudyButtonProps {
  handleStudyMode: (val: {}) => void;
  collectionData: {
    title: string;
    description: string;
    category: string;
    cards: [];
    id: number;
  };
  cardsDue: number;
  nextStudyDate: string;
}

export default function StudyButton({
  handleStudyMode,
  collectionData,
  cardsDue,
  nextStudyDate,
}: StudyButtonProps) {
  const date = dayjs(nextStudyDate).toDate().toString();
  // const cardsDueVal = cardsDue
  //   console.log("date", date);
  return (
    //Next time due -- if no cards in collection we say "no cards in collection"
    <Tooltip label={cardsDue === 0 ? `Next study date: ${date}` : ""}>
      {/* <Box onClick={() => handleStudyMode(collectionData)}> */}
      {/* <Navbutton title={"Study"} url={""} /> */}
      <Button
        isDisabled={cardsDue === 0}
        onClick={() => handleStudyMode(collectionData)}
        colorScheme={"gray"}
        variant="outline"
        size="sm"
      >
        Study
      </Button>
      {/* </Box> */}
    </Tooltip>
  );
}
