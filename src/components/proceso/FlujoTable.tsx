import React, { useState, useEffect } from "react";

// Services
// import FlujoService from "@/services/FlujoService";

// Components
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { fetchOneFlujo } from "@/redux/reducers/flujos";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { getAreas } from "@/redux/reducers/area";

const cities = [
  { name: "Carlos A Bueno Tavares", code: "NY" },
  { name: "Marcos manuel Mejia cepeda", code: "RM" },
  { name: "London", code: "LDN" },
  { name: "Istanbul", code: "IST" },
  { name: "Paris", code: "PRS" },
];

function FlujosTable(props: any) {
  const dispatch = useAppDispatch();

  const { flujo } = useAppSelector((state) => state.flujos);
  const { areas } = useAppSelector((state) => state.area);
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

  useEffect(() => {
    dispatch(getAreas());
  }, []);

  useEffect(() => {
    if (props.flujo) {
      dispatch(fetchOneFlujo(props.flujo));
    }
  }, [props.flujo]);

  return (
    <div>
      <DataTable
        value={flujo?.activitiesSchema || props.activities}
        paginator
        className="p-datatable-gridlines"
        showGridlines
        rows={10}
        dataKey="_id"
        responsiveLayout="scroll"
        emptyMessage="No customers found."
      >
        <Column header="Paso" field="step" style={{ minWidth: "2rem" }} />
        <Column
          header="Area"
          field="areaId"
          style={{ minWidth: "12rem" }}
          body={(data) => {
            return <p>{areas.find((i: any) => i._id == data.areaId)?.name}</p>;
          }}
        />
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
        <Column
          header="Horas"
          field="hours"
          body={(data) => data.hours.toFixed(2)}
        />
      </DataTable>
    </div>
  );
}

export default FlujosTable;
