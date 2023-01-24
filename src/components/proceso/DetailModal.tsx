import React, { useState, useEffect } from "react";

// Components
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import FlujosTable from "./FlujoTable";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchOneFlujo, updateFlujo } from "@/redux/reducers/flujos";

function DetailModal(props: any) {
  const dispatch = useAppDispatch();
  const { flujo, loadingFlujo } = useAppSelector((state) => state.flujos);

  const [edit, setEdit] = useState(false);
  const [flujoState, setFlujo] = useState({
    id: "",
    description: "",
    activitiesSchema: [],
  });

  useEffect(() => {
    dispatch(fetchOneFlujo(props.id));
  }, []);

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
    props.onHide();
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
          style={{ width: "70vw" }}
        >
          <div className="my-4">
            <div className="flex justify-content-between align-items-center">
              <h5>Descripcion</h5>
              <i
                className="pi pi-file-edit cursor-pointer text-2xl"
                onClick={() => setEdit(true)}
              ></i>
            </div>
            <input
              className="font-bold border-none outline-none bg-transparent"
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
          {loadingFlujo ? "" : <FlujosTable flujo={flujo} />}
        </Dialog>
      )}
    </>
  );
}

export default DetailModal;
