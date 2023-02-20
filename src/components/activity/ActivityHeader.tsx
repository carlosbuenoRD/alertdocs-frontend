import { useState } from "react";
// Redux
import { changeActivity } from "@/redux/reducers/activity";
import { useAppDispatch } from "@/redux/store";

// Components
import MyConfirmPopup from "@/components/shared/MyConfirmPopup";
import { Button } from "primereact/button";
import { TabMenu } from "primereact/tabmenu";
import { Toolbar } from "primereact/toolbar";
import ActivityTimer from "./ActivityTimer";
import CommentModal from "./CommentModal";
import FilesModal from "./FilesModal";
import ReturnActivity from "./ReturnActivity";

const tabs = [
  { label: "Historial", icon: "pi pi-clock" },
  { label: "Comentarios", icon: "pi pi-clock" },
  { label: "Adjuntos", icon: "pi pi-check-circle" },
  { label: "Devoluciones", icon: "pi pi-check-circle" },
];

function ActivityHeader(props: any) {
  const dispatch = useAppDispatch();

  const [commentModal, setCommentModal] = useState(false);
  const [fileModal, setFileModal] = useState(false);
  const [returnActivity, setReturnActivity] = useState(false);

  const onHideComment = () => setCommentModal(false);
  const onHideFile = () => setFileModal(false);
  const onHideReturn = () => setReturnActivity(false);

  const handleStartActivity = () => {
    dispatch(
      changeActivity({ id: props.activity._id, state: { state: "progress" } })
    );
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
      {props.activity.usersId._id && (
        <Button
          icon="pi pi-sign-out"
          className="p-button-danger mx-2"
          tooltip="Devolver documento"
          onClick={() => setReturnActivity(true)}
        />
      )}
      {props.activity.state === "progress" && (
        <MyConfirmPopup
          message="Estas seguro de terminar la actividad?"
          tooltip="Terminar tarea"
          iconButton="pi pi-send"
          className="p-button-danger"
          accept={() =>
            dispatch(
              changeActivity({
                id: props.activity._id,
                state: { state: "revision" },
              })
            )
          }
        />
      )}
      {props.activity.step === 1 && props.activity.state === "pending" && (
        <MyConfirmPopup
          tooltip="Empezar tarea"
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
        // right={user?._id === props.activity.userId ? right : ""}
        className="p-2"
      />
      <div className="greenGlow m-0 mt-2 mb-3 border-round-md p-2 grid-col-3 w-full">
        <div className="col-5 w-full">
          <p className="m-0 mb-2 font-bold">Descripcion:</p>
          <label>{props.activity.description}</label>
        </div>
        <div className="col-4 w-full">
          <p className="m-0 mb-2 font-bold">Tiempo estimado:</p>
          <label>{Math.floor(props.activity.hours * 60)} Minutos</label>
        </div>
        <ActivityTimer activity={props.activity} />
      </div>

      <CommentModal visible={commentModal} onHide={onHideComment} />
      <FilesModal visible={fileModal} onHide={onHideFile} />
      <ReturnActivity visible={returnActivity} onHide={onHideReturn} />
    </>
  );
}

export default ActivityHeader;
