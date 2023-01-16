import React, { useState } from "react";

// Components
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import CreateModal from "./CreateModal";

function ProcessHeader() {
  const [createModal, setCreateModal] = useState(false);

  return (
    <>
      <div className="area_header justify-content-between shadow-1">
        <div className="flex align-items-center cursor-pointer mr-5 px-4">
          <span className="p-input-icon-left p-float-label mr-2">
            <i className="pi pi-search" />
            <InputText id="search" className="w-28rem" />
            <label htmlFor="search">Buscar...</label>
          </span>

          <Dropdown
            options={["Direcciones", "Departamentos"]}
            placeholder="Categorias"
            className="w-20rem mr-2"
          />

          <Dropdown
            options={["Direcciones", "Departamentos"]}
            placeholder="Filtros"
            className="w-20rem"
          />
        </div>

        {/* Buttons */}
        <Button
          icon="pi pi-plus"
          className="p-button-rounded p-button-success text-700 hover:text-white"
          aria-label="Añadir"
          onClick={() => setCreateModal(true)}
        />
      </div>
      <CreateModal visible={createModal} onHide={() => setCreateModal(false)} />
    </>
  );
}

export default ProcessHeader;
