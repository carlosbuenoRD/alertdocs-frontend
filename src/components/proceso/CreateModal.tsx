import React, { useState } from "react";

// Components
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import DetailTable from "./DetailTable";

function CreateModal(props: any) {
  const [days, setDays] = useState<any>(1);
  const [hours, setHours] = useState<any>(0);
  const [step, setStep] = useState<any>(1);
  const [owner, setOwner] = useState<boolean>(false);
  const [endFlujo, setEndFlujo] = useState<boolean>(false);
  const [description, setDescription] = useState("");
  const [area, setArea] = useState("");
  const [user, setUser] = useState<any>([]);
  const [activitieDescription, setActivitieDescription] = useState("");
  const [activities, setActivities] = useState<any[]>([]);

  const footer = (
    <div>
      <Button
        className="btn-red"
        label="Cerrar"
        icon="pi pi-times"
        onClick={props.onHide}
      />
      <Button
        label="Guardar"
        icon="pi pi-check"
        onClick={() => console.log("ok")}
      />
    </div>
  );

  return (
    <Dialog
      header="Crear nuevo flujo"
      footer={footer}
      visible={props.visible}
      onHide={props.onHide}
      style={{ width: "70vw" }}
    >
      {/* <Toast ref={toast} /> */}
      <h5 className="mt-4">General</h5>
      <div className="p-fluid">
        <div className="formgrid grid">
          <div className="field col-6">
            <label htmlFor="name2">Descripcion de flujo</label>
            <InputText
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              aria-label="Countries"
            />
          </div>
          <div className="field col-6">
            <label htmlFor="email2">Dueño del proceso</label>
            <Dropdown
              options={[]}
              optionLabel="descripcion"
              optionValue="descripcion"
              value={owner}
              onChange={(e: any) => setOwner(e.target.value)}
              filter
            />
          </div>
        </div>
        <hr />
      </div>
      <h5>Actividad</h5>
      <div className="p-fluid">
        <div className="formgrid grid">
          <div className="field col">
            <label htmlFor="email2">Area</label>
            <Dropdown
              options={[]}
              optionLabel="descripcion"
              optionValue="descripcion"
              value={area}
              onChange={(e: any) => setArea(e.target.value)}
              filter
            />
          </div>
          <div className="field col">
            <label htmlFor="email2">Empleado responsable</label>
            <MultiSelect
              value={user}
              options={[]}
              onChange={(e: any) => setUser(e.target.value)}
              optionLabel="name"
              display="chip"
              placeholder={"Seleccione un usuario"}
              filter
              className="multiselect-custom w-full"
              // panelFooterTemplate={panelFooterTemplate}
            />
            {/* <Dropdown
              options={users?.users}
              filter
              optionLabel="name"
              value={user}
              optionValue="id"
              onChange={(e: any) => setUser(e.target.value)}
            /> */}
          </div>
          <div className="field col">
            <label htmlFor="name2">Descripcion de actividad</label>
            <InputText
              value={activitieDescription}
              onChange={(e) => setActivitieDescription(e.target.value)}
              aria-label="Countries"
            />
          </div>
        </div>
        <div className="grid">
          <div className="field col">
            <label htmlFor="vertical" style={{ display: "block" }}>
              Horas laborales
            </label>
            <InputNumber
              inputId="vertical"
              value={hours}
              onValueChange={(e) => setHours(Number(e.value))}
              mode="decimal"
              showButtons
              buttonLayout="horizontal"
              style={{ width: "5rem", textAlign: "center" }}
              decrementButtonClassName="p-button-secondary"
              incrementButtonClassName="p-button-secondary"
              incrementButtonIcon="pi pi-plus"
              decrementButtonIcon="pi pi-minus"
              inputClassName="w-3rem text-center"
              max={30}
              min={1}
            />
          </div>
          <div className="field col-2 mt-4">
            <Button label="Agregar" onClick={() => console.log("p")} />
          </div>
        </div>
      </div>
      <DetailTable />
    </Dialog>
  );
}

export default CreateModal;
