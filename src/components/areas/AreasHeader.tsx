import React from "react";

// Components
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";

function AreasHeader() {
  return (
    <div className="area_header shadow-1">
      <div className="flex align-items-center cursor-pointer mr-5 px-4">
        <span className="p-input-icon-left p-float-label mr-2">
          <i className="pi pi-search" />
          <InputText id="search" className="w-28rem" />
          <label htmlFor="search">Buscar...</label>
        </span>

        <Dropdown
          options={["Direcciones", "Departamentos"]}
          placeholder="Categorias"
          className="w-22rem mr-2"
        />

        <Dropdown
          options={["Direcciones", "Departamentos"]}
          placeholder="Filtros"
          className="w-22rem"
        />
      </div>
    </div>
  );
}

export default AreasHeader;
