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
import { setDepartments } from "@/redux/reducers/area";
import SectionStep from "../shared/SectionStep";
import Card from "../shared/Card";

function CreateModal(props: any) {
  const dispatch = useAppDispatch();
  const { flujos, flujo: flujoState } = useAppSelector((state) => state.flujos);

  const [transcode, setTranscode] = useState("");
  const [libramiento, setLibramiento] = useState("");
  const [description, setDescription] = useState("");
  const [filteredCountries, setFilteredCountries] = useState<any>(null);
  const [flujo, setFlujo] = useState<any>("");

  const [participants, setParticipants] = useState<any>([]);
  const [areas, setAreas] = useState<any>([]);
  const [direcciones, setDirecciones] = useState<any>([]);
  const [departments, setDepartments] = useState<any>([]);

  const onHide = () => {
    clearInputs();
    props.onHide();
  };

  useEffect(() => {
    dispatch(fetchAllFlujos());
    setTranscode(`MEPYD-${new Date().getFullYear()}-`);
  }, []);

  useEffect(() => {
    if (flujoState) {
      setParticipants([]);
      setAreas([]);

      let areas = new Set();
      let participants = new Set();
      let direcciones = new Set();
      let departments = new Set();

      flujoState.activitiesSchema?.map((p: any) => {
        participants.add(p.usersId[0]._id);
        areas.add(p.areaId);
        if (p.direccionId) direcciones.add(p.direccionId);
        if (p.departmentId) departments.add(p.departmentId);
      }) || [];

      setParticipants(Array.from(participants));
      setAreas(Array.from(areas));
      setDirecciones(Array.from(direcciones));
      setDepartments(Array.from(departments));
    }
  }, [flujoState]);

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
        direcciones,
        departments,
      })
    );
    clearInputs();
    onHide();
  };

  const footer = (
    <div className="flex w-full">
      <Button
        className="btn-red mr-1 w-14rem"
        label="Cerrar"
        icon="pi pi-times"
        onClick={onHide}
      />
      <Button
        className="flex-1"
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
    setTranscode(`MEPYD-${new Date().getFullYear()}-`);
  };

  return (
    <Dialog
      header="Agregar documento"
      headerStyle={{ fontSize: "4rem" }}
      footer={footer}
      visible={props.visible}
      onHide={onHide}
      style={{ width: "70vw" }}
    >
      <div className="p-fluid mt-4  relative">
        <div className="grid-col-2">
          <Card title="Codigo transdoc" height="" className="relative">
            <SectionStep number="1" />
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
          </Card>

          <Card title="Descripcion" height="" className="relative">
            <SectionStep number="2" />
            <InputText
              id="email2"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Card>
        </div>
      </div>
      <Card title="Seleccione el flujo" height="" className="relative p-fluid">
        <SectionStep number="3" />
        <div className="formgrid grid">
          <div className="field col">
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
      </Card>
      <Card height="" title="Proceso seleccionado">
        <FlujosTable flujo={flujo} />
      </Card>
    </Dialog>
  );
}

export default CreateModal;
