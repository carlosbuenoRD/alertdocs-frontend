import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Components
import { Button } from "primereact/button";
import CreateModal from "../documents/CreateModal";

function AreaHeader(props: any) {
  const navigate = useNavigate();

  const [createModal, setCreateModal] = useState<boolean>(false);

  return (
    <div className="area_header justify-content-between shadow-1">
      <div
        className="flex align-items-center cursor-pointer mr-5"
        onClick={() => navigate(-1)}
      >
        <i className="pi pi-arrow-left text-xl m-0 mr-3" />
        <h5 className="uppercase m-0">{props.title}</h5>
      </div>

      <Button
        icon="pi pi-plus"
        className="p-button-rounded p-button-success text-700 hover:text-white"
        aria-label="Añadir"
        onClick={() => setCreateModal(true)}
      />

      <CreateModal visible={createModal} onHide={() => setCreateModal(false)} />
    </div>
  );
}

export default AreaHeader;
