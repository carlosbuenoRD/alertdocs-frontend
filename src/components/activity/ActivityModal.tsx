import React, { useState, useEffect } from "react";

// Components
import { Dialog } from "primereact/dialog";

import FilesSection from "../shared/FilesSection";
import CommentSection from "../shared/CommentSection";
import DevolucionSection from "./DevolucionSection";
import ActivityHeader from "./ActivityHeader";
import HistorySection from "./HistorySection";
import SectionPicker from "./SectionPicker";

function ActivityModal(props: any) {
  const [activeIndex, setActiveIndex] = useState(0);

  let activity: any = {
    description: "Ok",
    state: "completed",
    startedAt: Date.now(),
    hours: 3,
    usersId: {
      id: 1,
      name: "Carlos Antonio Bueno Tavares",
    },
    step: 2,
  };

  return (
    <Dialog
      header={`#${activity.step} ---  ${activity.usersId.name} ---  ${activity.description}`}
      headerStyle={{ fontSize: "4rem" }}
      visible={props.visible}
      onHide={props.onHide}
      style={{ width: "70vw" }}
    >
      <ActivityHeader active={activeIndex} setActive={setActiveIndex} />

      <SectionPicker active={activeIndex} />
    </Dialog>
  );
}

export default ActivityModal;
