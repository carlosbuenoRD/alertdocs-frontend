import React, { useEffect, useState } from "react";

// Components
import { AutoComplete } from "primereact/autocomplete";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import FlujosTable from "../proceso/FlujoTable";
import { useAppSelector, useAppDispatch } from "@/redux/store";
import { fetchAllFlujos } from "@/redux/reducers/flujos";
import { createdocument } from "@/redux/reducers/documents";

function CreateModal(props: any) {
  const dispatch = useAppDispatch();
  const { flujos, flujo: flujoState } = useAppSelector((state) => state.flujos);

  const [transcode, setTranscode] = useState(
    `MEPYD-${new Date().getFullYear()}-`
  );
  const [libramiento, setLibramiento] = useState("");
  const [participants, setParticipants] = useState<any>([]);
  const [areas, setAreas] = useState<any>([]);
  const [description, setDescription] = useState("");
  const [filteredCountries, setFilteredCountries] = useState<any>(null);
  const [flujo, setFlujo] = useState<any>("");

  const onHide = () => {
    clearInputs();
    props.onHide();
  };

  const handleCreateDocument = async () => {
    dispatch(
      createdocument({
        transcode,
        libramiento,
        participants,
        description,
        flujoId: flujoState._id,
        activities: flujoState.activitiesSchema,
        areas,
      })
    );
    clearInputs();
    onHide();
  };

  const footer = (
    <div>
      <Button
        className="btn-red"
        label="Cerrar"
        icon="pi pi-times"
        onClick={onHide}
      />
      <Button
        label="Guardar"
        icon="pi pi-check"
        onClick={handleCreateDocument}
      />
    </div>
  );

  const clearInputs = () => {
    setDescription("");
    setFlujo("");
    setLibramiento("");
    setParticipants("");
    setTranscode("");
  };

  useEffect(() => {
    dispatch(fetchAllFlujos());
  }, []);

  return (
    <Dialog
      header="Agregar Documento"
      headerStyle={{ fontSize: "4rem" }}
      footer={footer}
      visible={props.visible}
      onHide={onHide}
      style={{ width: "70vw" }}
    >
      <div className="p-fluid mt-4">
        <div className="formgrid grid">
          <div className="field col">
            <label htmlFor="name2">Codigo documento transdoc</label>
            <AutoComplete
              suggestions={filteredCountries}
              field="name"
              value={transcode}
              onChange={(e) =>
                setTranscode((prev: string) => {
                  console.log(e.target.value.length);

                  if (e.target.value.length < 11) return prev;
                  else return e.target.value;
                })
              }
              aria-label="Countries"
            />
          </div>
          <div className="field col">
            <label htmlFor="name2">Numero de libramiento</label>
            <InputText
              id="name2"
              type="text"
              value={libramiento}
              onChange={(e) => setLibramiento(e.target.value)}
            />
          </div>
          <div className="field col">
            <label htmlFor="email2">Descripcion*</label>
            <InputText
              id="email2"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <hr />
      </div>
      <div className="p-fluid">
        <div className="formgrid grid">
          <div className="field col">
            <label htmlFor="email2">Flujos de procesos*</label>
            <Dropdown
              filter
              value={flujo}
              onChange={(e: any) => setFlujo(e.target.value)}
              options={flujos}
              optionLabel="description"
              optionValue="_id"
            />
          </div>
        </div>
      </div>
      <FlujosTable flujo={flujo} />
    </Dialog>
  );
}

export default CreateModal;
