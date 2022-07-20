import React from "react";
import { Button, Box } from "@chakra-ui/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import CustomTooltip from "../../Util/CustomTooltip";

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
  dayjs.extend(relativeTime);

  return (
    //Next time due -- if no cards in collection we say "no cards in collection"
    <CustomTooltip
      label={
        collectionData.cards.length !== 0
          ? cardsDue === 0
            ? `Next study session ${dayjs(nextStudyDate).fromNow()}`
            : ""
          : "There are no study cards in this collection."
      }
    >
      <Box>
        <Button
          isDisabled={cardsDue === 0}
          onClick={() => handleStudyMode(collectionData)}
          colorScheme={"gray"}
          variant="outline"
          size="sm"
        >
          Study
        </Button>
      </Box>

      {/* </Box> */}
    </CustomTooltip>
  );
}
