import React, { useState, useEffect } from "react";

// Services
// import FlujoService from "@/services/FlujoService";

// Components
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { MultiSelect } from "primereact/multiselect";
import { Dropdown } from "primereact/dropdown";

const cities = [
  { name: "Carlos A Bueno Tavares", code: "NY" },
  { name: "Marcos manuel Mejia cepeda", code: "RM" },
  { name: "London", code: "LDN" },
  { name: "Istanbul", code: "IST" },
  { name: "Paris", code: "PRS" },
];

function DetailTable(props: any) {
  const [selectedCities, setSelectedCities] = useState([]);

  const panelFooterTemplate = () => {
    const selectedItems = selectedCities;
    const length = selectedItems ? selectedItems.length : 0;
    return (
      <div className="py-2 px-3">
        <b>{length}</b> item{length > 1 ? "s" : ""} selected.
      </div>
    );
  };

  return (
    <div>
      <DataTable
        value={props.flujo?.activitiesSchema || props.activities || []}
        paginator
        className="p-datatable-gridlines"
        showGridlines
        rows={10}
        dataKey="id"
        responsiveLayout="scroll"
        emptyMessage="No customers found."
      >
        <Column header="Paso" field="step" style={{ minWidth: "2rem" }} />
        <Column header="Area" field="areaId" style={{ minWidth: "12rem" }} />
        <Column
          header="Empleado Responsable"
          field="usersId"
          style={{ minWidth: "14rem" }}
          body={(data: any) => {
            return (
              <Dropdown
                className="w-full m-0"
                options={data.usersId.map((i: any) => i.name)}
                filter
                placeholder={data.usersId[0].name}
              />
            );
          }}
        />
        <Column
          header="Descripcion"
          field="description"
          style={{ minWidth: "10rem" }}
        />
        <Column header="Horas" field="hours" body={(data: any) => 15} />
      </DataTable>
    </div>
  );
}

export default DetailTable;
