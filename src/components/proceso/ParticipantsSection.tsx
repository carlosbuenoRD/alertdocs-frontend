import React from "react";
import Card from "@/components/shared/Card";
import ParticipantsTable from "./ParticipantsTable";

function ParticipantsSection() {
  return (
    <div className="grid-1-3">
      <Card title="Areas" height="fit">
        <ul className="m-0">
          <li className="card shadow-1 p-2 flex align-items-center justify-content-between mb-1 cursor-pointer">
            <p className="m-0">Recursos Humano</p>
            <div className="bg-green-400 p-2 border-round-md text-white">
              160
            </div>
          </li>
          <li className="card shadow-1 p-2 flex align-items-center justify-content-between mb-1 cursor-pointer">
            <p className="m-0">Recursos Humano</p>
            <div className="bg-green-400 p-2 border-round-md text-white">
              160
            </div>
          </li>
          <li className="card shadow-1 p-2 flex align-items-center justify-content-between mb-1 cursor-pointer">
            <p className="m-0">Recursos Humano</p>
            <div className="bg-green-400 p-2 border-round-md text-white">
              160
            </div>
          </li>
        </ul>
      </Card>
      <Card title="Usuarios" height="">
        <ParticipantsTable />
      </Card>
    </div>
  );
}

export default ParticipantsSection;
