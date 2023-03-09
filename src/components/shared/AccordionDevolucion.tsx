import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { dateFormat, formatTime } from "@/utils/dateFormat";
import ActivityModal from "../activity/ActivityModal";
import StopWatch from "../stopWatch/StopWatch";
import WorkSpaceModal from "../workspace/WorkSpaceModal";
import Card from "./Card";

export function AccordionDevolucionBody(props: any) {
  const navigate = useNavigate();

  const [activityId, setActivityId] = useState("");
  const [documentId, setDocumentId] = useState("");
  const [activityModal, setActivityModal] = useState(false);
  const [workSpace, setWorkSpace] = useState(false);

  return (
    <>
      <Card title="Informacion de devolucion del enviante">
        <div className="flex justify-content-between">
          <p className="m-0">
            <strong>Usuario:</strong> {props.userFrom.name}
          </p>
          <p className="m-0">
            <strong>Actividad:</strong> {props.activityFrom.description}
          </p>
        </div>
      </Card>
      <Card title="Comentario">
        <p>{props.comment}</p>
      </Card>
      {props.missing.length > 0 && (
        <Card title="Lista de pendientes">
          <ol>
            {props.missing?.map((item: string) => (
              <li key={item} className="col-12 m-0">
                <label htmlFor="cb1" className="p-checkbox-label ml-2">
                  {item}
                </label>
              </li>
            ))}
          </ol>
        </Card>
      )}
      {props.buttons && (
        <div className="flex">
          <Button
            label="Ver Documento"
            className="w-full bg-orange-300 border-none"
            onClick={() => {
              setDocumentId(props.activityFrom.documentId);
              setWorkSpace(true);
            }}
          />
          <Button
            label="Ver Actividad"
            className="w-full mx-2"
            onClick={() => {
              setActivityId(props.activityTo._id);
              setActivityModal(true);
            }}
          />
          <Button
            label="Ver Usuario"
            className="w-full"
            onClick={() => navigate(`/perfil/${props.userTo._id}`)}
          />
        </div>
      )}

      {/* MODALS */}
      {activityModal && (
        <ActivityModal
          visible={activityModal}
          onHide={() => setActivityModal(false)}
          _id={activityId}
        />
      )}

      {workSpace && (
        <WorkSpaceModal
          visible={workSpace}
          onHide={() => setWorkSpace(false)}
          fromActivity={documentId}
        />
      )}
    </>
  );
}

export function AccordionDevolucionHeader(props: any) {
  return (
    <div className="flex align-items-center justify-content-between w-full">
      <p className="m-0 text-sm">
        #{props.activityTo?.step}--
        {props.userTo?.name} ----- {dateFormat(props.createdAt, "date")} |{" "}
        {dateFormat(props.createdAt, "time")}
      </p>
      <p className="" style={{ marginLeft: "auto" }}>
        <StopWatch
          time={props ? formatTime([props]) : 0}
          pause={props.endedAt ? true : false}
        />
      </p>
    </div>
  );
}
