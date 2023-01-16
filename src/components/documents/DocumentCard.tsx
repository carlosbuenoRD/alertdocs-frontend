import React, { useEffect, useState } from "react";

// Components
import { Avatar } from "primereact/avatar";
import { AvatarGroup } from "primereact/avatargroup";
import { ProgressBar } from "primereact/progressbar";
// import Steps from "./Steps";
// import KanbanModal from "./../kanba/KanbanModal";

function DocumentCard(props: any) {
  const colors = ["red", "yellow", "green"];

  const [color, setColor] = useState("");

  useEffect(() => {
    setColor(colors[Math.floor(Math.random() * 3)]);
  }, []);

  const header = () => (
    <div className="flex justify-content-between align-items-center pt-2 pb-4">
      <h6 className="mb-0 mr-3">{props.transcode || "MEPYD-INT-2022-00740"}</h6>
      {/* <Steps color={color} /> */}
    </div>
  );

  return (
    <div
      className={`relative col card cursor-pointer shadow-2 ${
        props.border && "border-1 border-100"
      }`}
      onClick={props.open}
    >
      {header()}
      <div className="mb-4">
        <strong>Descripcion:</strong>
        <p className="mt-2 text-sm">
          {props.description ||
            "NOMINA ADICIONAL DIFERENCIAL REGALIA INTERINATO 2021"}
        </p>
      </div>

      <strong>Participantes:</strong>
      <AvatarGroup className="mb-3 mt-2 participants">
        {props.participants?.map((p: any, i: number) => (
          <Avatar
            key={i}
            image="assets/demo/images/avatar/amyelsner.png"
            size="large"
            shape="circle"
          />
        ))}
        <Avatar
          label="+2"
          shape="circle"
          size="large"
          style={{ backgroundColor: "#9c27b0", color: "#ffffff" }}
        />
        <div className="participants_hover card shadow-1 bg-white">
          <ul className="">
            <li>Carlos A Bueno Tavares</li>
            <li>Anatolio Lozano Mejia</li>
            <li>Ceferino Núñez Rodriguez</li>
            <li>Guadalupe Montero Mejia</li>
            <li>Clara Vicente Toreto</li>
            <li>Anatolio Lozano Mejia</li>
            <li>Ceferino Núñez Rodriguez</li>
            <li>Guadalupe Montero Mejia</li>
            <li>Clara Vicente Toreto</li>
          </ul>
        </div>
      </AvatarGroup>

      {/* <div className="mb-4">
            <label>Descripcion:</label>
            <p className="mt-2">
              NOMINA ADICIONAL DIFERENCIAL REGALIA INTERINATO 2022
            </p>
          </div> */}

      {!props.notProgress && (
        <ProgressBar
          value={Math.floor(Math.random() * 99)}
          className={"h-1rem absolute bottom-0 left-0 w-full"}
        />
      )}
      {/* {kanba && <KanbanModal visible={kanba} onHide={onHideKanba} />} */}
    </div>
  );
}

export default DocumentCard;
