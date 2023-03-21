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
import { getActivitiesByFlujo } from "@/services/activity";
import { getEficiencia } from "@/utils/formula";

const tabs = [
  { label: "Flujo", icon: "pi pi-clock" },
  { label: "Participantes", icon: "pi pi-user" },
  // { label: "Estadisticas", icon: "pi pi-check-circle" },
];

function DetailModal(props: any) {
  const dispatch = useAppDispatch();
  const { flujo, loadingFlujo } = useAppSelector((state) => state.flujos);

  const [eficiencia, setEficiencia] = useState(0);
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

  useEffect(() => {
    handleEficiencia();
  }, [flujo._id]);

  const handleEficiencia = async () => {
    let result = await getActivitiesByFlujo(flujo._id);
    if (result) setEficiencia(getEficiencia(result));
  };

  const handleUpdateFlujo = () => {
    dispatch(updateFlujo(flujoState));
    setEdit(false);
  };

  const handleChangeHours = (value: string, item: any) => {
    let copy = flujoState.activitiesSchema.map((i: any) =>
      i.step === item.step ? { ...i, hours: Number(value) / 60 } : i
    );

    setFlujo({ ...flujoState, activitiesSchema: [...copy] });
  };

  const handleChangeDescription = (value: string, item: any) => {
    let copy = flujoState.activitiesSchema.map((i: any) =>
      i.step === item.step ? { ...i, description: value } : i
    );

    setFlujo({ ...flujoState, activitiesSchema: [...copy] });
  };

  const handleChangeUsers = (value: string, item: any) => {
    console.log(value);

    let copy = flujoState.activitiesSchema.map((i: any) =>
      i.step === item.step ? { ...i, usersId: value } : i
    );

    console.log(flujoState, 1);
    setFlujo({ ...flujoState, activitiesSchema: [...copy] });
    console.log(flujoState, 2);
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
          onHide={() => {
            setEdit(false);
            props.onHide();
          }}
          style={{ width: "75vw" }}
        >
          <div className="card shadow-1 flex relative mt-4 mb-2 justify-content-between">
            <div className="pr-8">
              <div className="flex justify-content-between align-items-center mb-0">
                <h5>Descripcion</h5>
                <i
                  className="pi pi-file-edit cursor-pointer text-2xl absolute right-0 bg-white border-circle p-1 shadow-1"
                  style={{ top: -15 }}
                  onClick={() => setEdit(true)}
                ></i>
              </div>
              <input
                className="font-bold border-none outline-none bg-transparent w-30rem m-0"
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
            <div className="bg-green-400 p-3 h-fit border-round-lg">
              <h3 className="m-0">{Math.floor(eficiencia) || 0}</h3>
            </div>
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
              onChangeHours={handleChangeHours}
              onChangeDescription={handleChangeDescription}
              onChangeUsers={handleChangeUsers}
            />
          </div>
        </Dialog>
      )}
    </>
  );
}

export default DetailModal;
