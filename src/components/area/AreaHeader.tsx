import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Components
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { MultiSelect } from "primereact/multiselect";
import { Button } from "primereact/button";

const cities = [
  { name: "New York", code: "NY" },
  { name: "Rome", code: "RM" },
  { name: "London", code: "LDN" },
  { name: "Istanbul", code: "IST" },
  { name: "Paris", code: "PRS" },
];

function AreaHeader() {
  const navigate = useNavigate();

  const [selectedCities, setSelectedCities] = useState([]);
  const [dates2, setDates2] = useState<any>("");

  return (
    <div className="area_header justify-content-between shadow-1">
      <div
        className="flex align-items-center cursor-pointer mr-5"
        onClick={() => navigate(-1)}
      >
        <i className="pi pi-arrow-left text-xl m-0 mr-3" />
        <h5 className="uppercase m-0">Viceministerio Tecnico Administrativo</h5>
      </div>

      {/* <span className="p-input-icon-left p-float-label mr-2">
        <i className="pi pi-search" />
        <InputText id="search" />
        <label htmlFor="search">Buscar...</label>
      </span>

      <div className="p-float-label mr-2">
        <MultiSelect
          display="chip"
          optionLabel="name"
          value={selectedCities}
          options={cities}
          onChange={(e) => setSelectedCities(e.value)}
          className="w-12rem"
        />
        <label htmlFor="search">Filtro de Procesos</label>
      </div>

      <div className="p-input-icon-right p-float-label mr-2">
        <i className="pi pi-calendar" />
        <Calendar
          id="range"
          value={dates2}
          onChange={(e: any) => setDates2(e.value)}
          selectionMode="range"
          readOnlyInput
        />
        <label htmlFor="search">Filtrar por fecha</label>
      </div> */}
      <Button
        icon="pi pi-plus"
        className="p-button-rounded p-button-success text-700 hover:text-white"
        aria-label="Añadir"
        onClick={() => console.log("p")}
      />
    </div>
  );
}

export default AreaHeader;
