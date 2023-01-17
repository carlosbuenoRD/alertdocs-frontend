import React from "react";

// Components
import CommentSection from "../shared/CommentSection";
import KanbaContainer from "./kanba/Container";
import FilesSection from "../shared/FilesSection";
import ParticipantSection from "./participants/ParticipantSection";

function SectionPicker(props: any) {
  return (
    <div>
      {props.index === 0 && <KanbaContainer />}
      {props.index === 1 && <CommentSection />}
      {props.index === 2 && <FilesSection />}
      {props.index === 3 && <ParticipantSection />}
    </div>
  );
}

export default SectionPicker;
