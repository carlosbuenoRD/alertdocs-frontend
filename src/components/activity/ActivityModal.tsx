import React, { useState, useEffect } from "react";

// Components
import { Dialog } from "primereact/dialog";

import ActivityHeader from "./ActivityHeader";
import SectionPicker from "./SectionPicker";
import { useAppSelector } from "@/redux/store";
import Countdown from "react-countdown";
import WorkSpaceModal from "../workspace/WorkSpaceModal";
import StopWatch from "../stopWatch/StopWatch";

function ActivityModal(props: any) {
  const [workSpace, setWorkSpace] = useState(false);

  const [activeIndex, setActiveIndex] = useState(0);
  const { activity } = useAppSelector((state) => state.activity);

  return (
    <Dialog
      header={`#${activity?.step} ---  ${activity?.usersId?.name} ---  ${activity?.description}`}
      headerStyle={{ fontSize: "4rem" }}
      visible={props.visible}
      onHide={props.onHide}
      style={{ width: "70vw" }}
      footer={
        <div className="flex pb-0 justify-content-center w-full border-top-1 border-100">
          {!props.noDocument && (
            <button onClick={() => setWorkSpace(true)} className="p-button">
              Ver documento
            </button>
          )}
        </div>
      }
    >
      <ActivityHeader
        active={activeIndex}
        setActive={setActiveIndex}
        activity={activity}
      />

      <SectionPicker active={activeIndex} />
      <WorkSpaceModal visible={workSpace} onHide={() => setWorkSpace(false)} />
    </Dialog>
  );
}

export default ActivityModal;
