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

function FlujosTable(props: any) {
  const dispatch = useAppDispatch();

  const { flujo } = useAppSelector((state) => state.flujos);
  const { areas } = useAppSelector((state) => state.area);
  const [selectedCities, setSelectedCities] = useState([]);

  // let activities: any[] = props.activities || flujo?.activitiesSchema;

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
        value={props.activities || flujo?.activitiesSchema}
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
          header="Minutos"
          field="hours"
          body={(data) => (
            <input
              type={"number"}
              min={2}
              value={data.hours * 60}
              disabled={!props.edit}
              className="w-5rem font-bold border-none outline-none bg-transparent  m-0"
              onChange={(e) => props.handleChange(e.target.value, data)}
            />
          )}
        />
      </DataTable>
    </div>
  );
}

export default FlujosTable;
