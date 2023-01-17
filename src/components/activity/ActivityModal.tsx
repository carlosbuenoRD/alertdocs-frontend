import React, { useState, useEffect } from "react";

// Components
import { Dialog } from "primereact/dialog";

import FilesSection from "../shared/FilesSection";
import CommentSection from "../shared/CommentSection";
import DevolucionSection from "./DevolucionSection";
import ActivityHeader from "./ActivityHeader";
import HistorySection from "./HistorySection";
import SectionPicker from "./SectionPicker";
import { useAppSelector } from "./../../redux/store";

function ActivityModal(props: any) {
  const [activeIndex, setActiveIndex] = useState(0);
  const { activity } = useAppSelector((state) => state.activity);

  console.log(props);

  return (
    <Dialog
      header={`#${props.activity?.step} ---  ${props.activity?.usersId?.name} ---  ${props.activity?.description}`}
      headerStyle={{ fontSize: "4rem" }}
      visible={props.visible}
      onHide={props.onHide}
      style={{ width: "70vw" }}
    >
      <ActivityHeader
        active={activeIndex}
        setActive={setActiveIndex}
        activity={props.activity}
      />

      <SectionPicker active={activeIndex} />
    </Dialog>
  );
}

export default ActivityModal;
