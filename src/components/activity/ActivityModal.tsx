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
      contentClassName="pb-3"
      onHide={props.onHide}
      style={{ width: "70vw" }}
      footer={
        !props.noDocument ? (
          <div className="flex justify-content-center w-full border-top-1 border-100">
            <button
              onClick={() => setWorkSpace(true)}
              className="p-button w-full flex justify-content-center"
            >
              Ver documento
            </button>
          </div>
        ) : null
      }
    >
      <div className="card shadow-1 mb-2">
        <ActivityHeader
          active={activeIndex}
          setActive={setActiveIndex}
          activity={activity}
        />
      </div>

      <div className="card shadow-1 mb-0">
        <SectionPicker active={activeIndex} />
      </div>
      <WorkSpaceModal visible={workSpace} onHide={() => setWorkSpace(false)} />
    </Dialog>
  );
}

export default ActivityModal;
