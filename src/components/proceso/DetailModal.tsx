import React, { useState, useEffect } from "react";

// Components
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import FlujosTable from "./FlujoTable";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchOneFlujo, updateFlujo } from "@/redux/reducers/flujos";
import { Toolbar } from "primereact/toolbar";
import { TabMenu } from "primereact/tabmenu";
import SectionPicker from "./SectionPicker";

const tabs = [
  { label: "Flujo", icon: "pi pi-clock" },
  { label: "Participantes", icon: "pi pi-user" },
  // { label: "Estadisticas", icon: "pi pi-check-circle" },
];

function DetailModal(props: any) {
  const dispatch = useAppDispatch();
  const { flujo, loadingFlujo } = useAppSelector((state) => state.flujos);

  const [edit, setEdit] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [flujoState, setFlujo] = useState<any>({
    id: "",
    description: "",
    activitiesSchema: [],
  });

  useEffect(() => {
    if (props.id) {
      dispatch(fetchOneFlujo(props.id));
    }
  }, [props.id]);

  useEffect(() => {
    if (flujo) {
      setFlujo({
        id: flujo._id || "",
        description: flujo.description || "",
        activitiesSchema: flujo.activitiesSchema || [],
      });
    }
  }, [flujo]);

  const handleUpdateFlujo = () => {
    dispatch(updateFlujo(flujoState));
    setEdit(false);
  };

  const handleChange = (value: string, item: any) => {
    let copy = flujoState.activitiesSchema.map((i: any) =>
      i.step === item.step ? { ...item, hours: Number(value) / 60 } : i
    );

    setFlujo({ ...flujoState, activitiesSchema: [...copy] });
  };

  const footer = (
    <div>
      <Button
        className="btn-red"
        label={edit ? "Cancelar" : "Cerrar"}
        icon="pi pi-times"
        onClick={edit ? () => setEdit(false) : props.onHide}
      />
      {edit && (
        <Button
          className="btn-blue"
          label="Guardar cambios"
          icon="pi pi-times"
          onClick={handleUpdateFlujo}
        />
      )}
    </div>
  );

  return (
    <>
      {flujo && (
        <Dialog
          header={`Detalle de flujo #${props.id}`}
          headerStyle={{ fontSize: "4rem" }}
          footer={footer}
          visible={props.visible}
          onHide={props.onHide}
          style={{ width: "90vw" }}
        >
          <div className="mt-4 mb-2 card shadow-1">
            <div className="flex justify-content-between align-items-center mb-0">
              <h5>Descripcion</h5>
              <i
                className="pi pi-file-edit cursor-pointer text-2xl"
                onClick={() => setEdit(true)}
              ></i>
            </div>
            <input
              className="font-bold border-none outline-none bg-transparent w-full m-0"
              disabled={!edit}
              value={flujoState.description}
              onChange={(e) =>
                setFlujo((prev: any) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
          </div>
          <div className="card shadow-1">
            <Toolbar
              left={
                <TabMenu
                  model={tabs}
                  activeIndex={activeIndex}
                  onTabChange={(e) => setActiveIndex(e.index)}
                  className=""
                  style={{ fontSize: "1rem" }}
                />
              }
              className="p-2 mb-3"
            />
            <SectionPicker
              active={activeIndex}
              edit={edit}
              activities={flujoState.activitiesSchema}
              onChangeActivity={handleChange}
            />
          </div>
        </Dialog>
      )}
    </>
  );
}

export default DetailModal;
