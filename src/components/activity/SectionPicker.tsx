import React from "react";

// Components
import CommentSection from "../shared/CommentSection";
import FilesSection from "../shared/FilesSection";
import HistorySection from "./HistorySection";
import DevolucionSection from "./DevolucionSection";

function SectionPicker(props: any) {
  return (
    <div>
      {props.active === 0 && <HistorySection />}
      {props.active === 1 && <CommentSection />}
      {props.active === 2 && <FilesSection />}
      {props.active === 3 && <DevolucionSection />}
    </div>
  );
}

export default SectionPicker;
