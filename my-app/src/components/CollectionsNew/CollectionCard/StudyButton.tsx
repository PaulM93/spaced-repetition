import React from "react";
import { Button, Tooltip, Box } from "@chakra-ui/react";
import dayjs from "dayjs";

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
      <Box>
        <Button
          isDisabled={cardsDue === 0}
          onClick={() => handleStudyMode(collectionData)}
          colorScheme={"blackAlpha"}
          size="sm"
        >
          Study
        </Button>
      </Box>
    </Tooltip>
  );
}
