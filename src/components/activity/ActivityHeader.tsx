import React, { useState } from "react";

// Components
import Countdown from "react-countdown";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import { TabMenu } from "primereact/tabmenu";
import MyConfirmPopup from "@/components/shared/MyConfirmPopup";
import CommentModal from "./CommentModal";
import FilesModal from "./FilesModal";
import ReturnActivity from "./ReturnActivity";

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
function ActivityHeader(props: any) {
  const tabs = [
    { label: "Historial", icon: "pi pi-clock" },
    { label: "Comentarios", icon: "pi pi-clock" },
    { label: "Adjuntos", icon: "pi pi-check-circle" },
    { label: "Devoluciones", icon: "pi pi-check-circle" },
  ];

  const [commentModal, setCommentModal] = useState(false);
  const [fileModal, setFileModal] = useState(false);
  const [returnActivity, setReturnActivity] = useState(false);

  const onHideComment = () => setCommentModal(false);
  const onHideFile = () => setFileModal(false);
  const onHideReturn = () => setReturnActivity(false);

  const toMilliseconds = (hrs: number) => hrs * 60 * 60 * 1000;

  const handleStartActivity = () => {
    // dispatch(
    //   changeActivity({ id: activity._id, state: { state: "progress" } })
    // );
  };

  const left = () => (
    <>
      <Button
        icon="pi pi-comment"
        className="p-button-raised p-button-rounded"
        tooltip="Comentar"
        onClick={() => setCommentModal(true)}
      />

      <Button
        icon="pi pi-file-export"
        className="p-button-raised p-button-rounded mx-2"
        tooltip="Subir archivo"
        onClick={() => setFileModal(true)}
      />
      {/* {activity.usersId === user?.id && ( */}
      <Button
        icon="pi pi-sign-out"
        className="p-button-danger"
        tooltip="Devolver documento"
        onClick={() => setReturnActivity(true)}
      />
      {/* )} */}
      <TabMenu
        model={tabs}
        activeIndex={props.active}
        onTabChange={(e) => props.setActive(e.index)}
        className="ml-3 w-fit"
        style={{ fontSize: "1rem" }}
      />
    </>
  );

  const right = () => (
    <>
      {activity.state === "progress" && (
        <MyConfirmPopup
          message="Estas seguro de terminar la actividad?"
          iconButton="pi pi-send"
          className="p-button-danger"
          accept={() => console.log("ok")}
        />
      )}
      {activity.step === 1 && activity.state === "pending" && (
        <MyConfirmPopup
          message="Estas seguro de empezar la actividad?"
          iconButton="pi pi-play"
          accept={handleStartActivity}
        />
      )}
    </>
  );

  return (
    <>
      <Toolbar
        left={left}
        right={right}
        // right={user?._id === activity.userId ? right : ""}
        className="p-2"
      />
      <div className="greenGlow m-0 mt-2 mb-3 border-round-md p-2 grid w-full">
        <div className="col-5 m-auto">
          <p className="m-0 mb-2 font-bold">Descripcion:</p>
          <label>{activity.description}</label>
        </div>
        <div className="col-4">
          <p className="m-0 mb-2 font-bold">Tiempo estimado:</p>
          <label>{Math.floor(activity.hours * 60)} Minutos</label>
        </div>
        <div className="col-3 m-0 align-self-center text-center">
          {activity.state === "progress" && (
            <>
              <div className="text-4xl m-0">
                {activity.startedAt + toMilliseconds(activity.hours) <=
                Date.now() ? (
                  <div className="flex">
                    -
                    {/* <StopWatch
                      time={
                        Date.now() - (activity.startedAt + toMilliseconds(1))
                      }
                    /> */}
                  </div>
                ) : (
                  <Countdown
                    date={activity.startedAt + toMilliseconds(activity.hours)}
                  />
                )}
              </div>
            </>
          )}
          {activity.state === "completed" && (
            <h4 className="m-0">completado</h4>
          )}
          {activity.state === "revision" && (
            <h4 className="m-0">En revision</h4>
          )}
          {activity.state === "pending" && <h4 className="m-0">En espera</h4>}
        </div>
      </div>

      <CommentModal visible={commentModal} onHide={onHideComment} />
      <FilesModal visible={fileModal} onHide={onHideFile} />
      <ReturnActivity visible={returnActivity} onHide={onHideReturn} />
    </>
  );
}

export default ActivityHeader;
