import React, { useState, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/redux/store";

// Components
import { MultiSelect } from "primereact/multiselect";
import { Dropdown } from "primereact/dropdown";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Chip } from "primereact/chip";
import Card from "@/components/shared/Card";
import {
  getAreas,
  getDirecciones,
  getDepartments,
} from "@/redux/reducers/area";
import { Button } from "primereact/button";

interface AreaSelectionProps {
  visible: boolean;
  onHide: () => void;
  selectedAreas: any[];
  setSelectedAreas: Function;
}

const AreaSelection: React.FC<AreaSelectionProps> = ({
  visible,
  onHide,
  selectedAreas,
  setSelectedAreas,
}) => {
  const dispatch = useAppDispatch();

  const { areas, direcciones, departments } = useAppSelector(
    (state) => state.area
  );

  const [section, setSection] = useState("area");
  const [area, setArea] = useState("");
  const [direccion, setDireccion] = useState("");

  useEffect(() => {
    dispatch(getAreas());
  }, []);

  const renderHeader = () => {
    return (
      <div className="card flex justify-content-between align-items-center my-2 shadow-1">
        <div className="flex justify-content-between align-items-center w-full">
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText
              value=""
              placeholder="Keyword Search"
              className="w-18rem"
            />
          </span>
          <div className="p-float-label ml-1">
            <Dropdown
              optionLabel="name"
              optionValue="_id"
              value={area}
              options={areas || []}
              onChange={(e) => setArea(e.value)}
              className="w-24rem"
            />
            <label htmlFor="search">Filtro areas </label>
          </div>
          <div className="p-float-label ml-1">
            <Dropdown
              optionLabel="name"
              optionValue="_id"
              value={direccion}
              options={direcciones || []}
              onChange={(e) => setDireccion(e.value)}
              className="w-24rem"
            />
            <label htmlFor="search">Filtro direcciones </label>
          </div>
          <Button icon="pi pi-refresh" onClick={clearSearch} />
        </div>
      </div>
    );
  };

  const clearSearch = () => {
    setSection("area");
    setDireccion("");
    setArea("");
  };

  const header = renderHeader();

  useEffect(() => {
    if (area) {
      dispatch(getDirecciones(area));
      setSection("direcciones");
      return;
    }
  }, [area]);

  useEffect(() => {
    if (direccion) {
      dispatch(getDepartments(direccion));
      setSection("departments");
    }
  }, [direccion]);

  const listedAreas =
    section === "area"
      ? areas
      : section === "direcciones"
      ? direcciones
      : departments;

  return (
    <>
      <Dialog
        header={"Seleccione areas a ver"}
        visible={visible}
        style={{ padding: 0 }}
        onHide={onHide}
      >
        {header}

        {selectedAreas.length > 0 && (
          <Card>
            {selectedAreas.map((i) => (
              <Chip
                className="m-1"
                label={i.name}
                removable
                onRemove={() => {
                  setSelectedAreas((prev: any) =>
                    prev.filter((item: any) => item.name !== i.name)
                  );
                  localStorage.setItem(
                    "dashboard_areas",
                    JSON.stringify(selectedAreas)
                  );
                }}
              />
            ))}
          </Card>
        )}

        <Card>
          <DataTable
            value={listedAreas || []}
            selection={selectedAreas}
            onSelectionChange={(e) => {
              if (e.value.length > 3) return;
              setSelectedAreas(e.value);
              localStorage.setItem("dashboard_areas", JSON.stringify(e.value));
            }}
            dataKey="_id"
            size="large"
            tableStyle={{ minWidth: "50rem", width: "60vw" }}
          >
            <Column
              selectionMode={"multiple"}
              headerStyle={{ width: "3rem" }}
            ></Column>
            <Column field="name" header="Area"></Column>
          </DataTable>
        </Card>
      </Dialog>
    </>
  );
};

export default AreaSelection;
