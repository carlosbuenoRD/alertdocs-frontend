import React from "react";

// Components
import { Avatar } from "primereact/avatar";
import { AvatarGroup } from "primereact/avatargroup";
import { ProgressBar } from "primereact/progressbar";

function ParticipantCard(props: any) {
  const header = () => (
    <div className="flex justify-content-center align-items-center pt-2 pb-2">
      <Avatar icon="pi pi-user" shape="circle" />
      <h6 className="m-0 ml-3">Carlos Antonio Bueno Tavares</h6>
    </div>
  );

  return (
    <div
      className={`relative card mb-0 col-4 w-full cursor-pointer shadow-2 ${
        props.border && "border-1 border-100"
      }`}
      onClick={props.open}
    >
      {header()}
      <div className="mb-4 px-4">
        <progress value={20} className="w-full" />
      </div>
      <div className="grid px-4 text-center">
        <div className="col">
          <p>Pendientes</p>
          <p className="font-bold">2</p>
        </div>
        <div className="col">
          <p>Con retraso</p>
          <p className="font-bold">0</p>
        </div>
      </div>
      {/* <div className="mb-4">
        <label>Descripcion:</label>
        <p className="mt-2">
          NOMINA ADICIONAL DIFERENCIAL REGALIA INTERINATO 2022
        </p>
      </div> */}
    </div>
  );
}

export default ParticipantCard;
