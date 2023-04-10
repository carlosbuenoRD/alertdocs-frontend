import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
// Components
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { toastConfig } from "@/utils/data";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { createFlujo } from "@/redux/reducers/flujos";
import {
  getAreas,
  getDirecciones,
  getDepartments,
} from "@/redux/reducers/area";
import {
  getUsersByArea,
  getUsersByDireccion,
  getUsersByDepartment,
} from "@/redux/reducers/users";
import { Chip } from "primereact/chip";
import DetailTable from "./DetailTable";
import SectionStep from "../shared/SectionStep";
import Card from "@/components/shared/Card";

function CreateModal(props: any) {
  const dispatch = useAppDispatch();

  const { areas, users, direcciones, departments } = useAppSelector(
    (state) => ({
      ...state.area,
      ...state.user,
    })
  );

  const [hours, setHours] = useState<any>(0);
  const [step, setStep] = useState<any>(1);
  const [owner, setOwner] = useState<boolean>(false);
  const [description, setDescription] = useState("");
  const [descriptions, setDescriptions] = useState<string[]>([]);
  const [subprocess, setSubprocess] = useState<string>("");
  const [area, setArea] = useState("");
  const [department, setDepartment] = useState("");
  const [direccion, setDireccion] = useState("");
  const [user, setUser] = useState<any>([]);
  const [activitieDescription, setActivitieDescription] = useState("");
  const [activities, setActivities] = useState<any[]>([]);

  const [participants, setParticipants] = useState<any>([]);
  const [activitiesAreas, setActivitiesAreas] = useState<any>([]);

  useEffect(() => {
    let areasSet = new Set();
    let participantsSet = new Set();

    activities?.map((p: any) => {
      p.usersId.map((i: any) => participantsSet.add(i._id));
      areasSet.add(p.areaId);
    });

    setParticipants(Array.from(participantsSet));
    setActivitiesAreas(Array.from(areasSet));
  }, [activities]);

  const addActivitie = () => {
    if (area && user && activitieDescription) {
      setActivities((prev: any[]) => {
        return [
          ...prev,
          {
            step,
            areaId: area,
            departmentId: department,
            direccionId: direccion,
            usersId: user.map((u: any) => ({ _id: u._id, name: u.name })),
            description: activitieDescription,
            hours: hours / 60,
          },
        ];
      });
      setStep(step + 1);
      clearInputs();
    } else {
      toast.warn("Llena todos los campos", toastConfig);
    }
  };

  const handleAddFlujo = async () => {
    if (!activities) {
      return toast.warn("Necesitas tener actividades!", toastConfig);
    } else if (!description) {
      return toast.warn("Llena toda la informacion!", toastConfig);
    }

    dispatch(
      createFlujo({
        description,
        descriptions,
        activitiesSchema: activities.map((i: any) => ({
          ...i,
          usersId: i.usersId.map((u: any) => u._id),
        })),
        participants,
        areas: activitiesAreas,
      })
    );
    props.onHide();
  };

  const clearInputs = () => {
    setArea("");
    setDireccion("");
    setDepartment("");
    setUser("");
    setActivitieDescription("");
    setHours(1);
  };

  const footer = (
    <div className="flex w-full">
      <Button
        className="btn-red mr-1 w-14rem"
        label="Cerrar"
        icon="pi pi-times"
        onClick={props.onHide}
      />
      <Button
        className="flex-1"
        label="Guardar"
        icon="pi pi-check"
        onClick={handleAddFlujo}
      />
    </div>
  );

  useEffect(() => {
    dispatch(getAreas());
  }, []);

  useEffect(() => {
    if (area) {
      dispatch(getUsersByArea(area));
      dispatch(getDirecciones(area));
      setDireccion("");
      setDepartment("");
    }
  }, [area]);

  useEffect(() => {
    if (direccion) {
      dispatch(getUsersByDireccion(direccion));
      dispatch(getDepartments(direccion));
      setDepartment("");
    }
  }, [direccion]);

  useEffect(() => {
    if (department) {
      dispatch(getUsersByDepartment(department));
    }
  }, [department]);

  const handleAddDescription = () => {
    setDescriptions([...descriptions, subprocess]);
    setSubprocess("");
  };

  return (
    <Dialog
      header="Crear nuevo flujo"
      footer={footer}
      visible={props.visible}
      onHide={props.onHide}
      style={{ width: "70vw" }}
    >
      {/* <Toast ref={toast} /> */}
      <Card title="General" height="" className="relative mt-4">
        <SectionStep number={1} />
        <div className="p-fluid">
          <div className="formgrid grid">
            <div className="field col-6">
              <label htmlFor="name2">Nombre de flujo</label>
              <InputText
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                aria-label="Countries"
              />
            </div>
            <div className="field col-6">
              <label htmlFor="email2">Dueño del proceso</label>
              <Dropdown
                options={areas || []}
                optionLabel="name"
                optionValue="_id"
                value={owner}
                onChange={(e: any) => setOwner(e.target.value)}
                filter
              />
            </div>
          </div>
          <div className="p-fluid">
            <div className="formgrid grid">
              <div className="field col-10">
                <label htmlFor="name2">Descripciones del flujo</label>
                <InputText
                  value={subprocess}
                  onChange={(e) => setSubprocess(e.target.value)}
                  aria-label="Countries"
                />
              </div>
              <div className="field col-2 align-self-end">
                <Button className="inline" onClick={handleAddDescription}>
                  Añadir
                </Button>
              </div>
            </div>
          </div>
          <div className="text-center p-3 bg-white shadow-1 border-round-lg mt-2">
            {descriptions.length === 0 ? (
              <p className="text-sm uppercase font-medium">
                Agrega un subproceso del flujo
              </p>
            ) : (
              <>
                {descriptions.map((d) => (
                  <Chip
                    className="m-1"
                    label={d}
                    removable
                    onRemove={() => {
                      setDescriptions((prev: any) =>
                        prev.filter((item: any) => item !== d)
                      );
                    }}
                  />
                ))}
              </>
            )}
          </div>
        </div>
      </Card>
      <Card title={"Actividad"} height="" className="relative">
        <SectionStep number={3} />
        <div className="p-fluid">
          <div className="formgrid grid">
            <div className="field col">
              <label htmlFor="email2">Area</label>
              <Dropdown
                options={areas || []}
                optionLabel="name"
                optionValue="_id"
                value={area}
                onChange={(e: any) => setArea(e.target.value)}
                filter
              />
            </div>
            <div className="field col">
              <label htmlFor="email2">Direcciones</label>
              <Dropdown
                options={direcciones || []}
                optionLabel="name"
                optionValue="_id"
                value={direccion}
                onChange={(e: any) => setDireccion(e.target.value)}
                filter
              />
            </div>
            <div className="field col">
              <label htmlFor="email2">Departamentos</label>
              <Dropdown
                options={departments || []}
                optionLabel="name"
                optionValue="_id"
                value={department}
                onChange={(e: any) => setDepartment(e.target.value)}
                filter
              />
            </div>
          </div>
          <div className="formgrid grid">
            <div className="field col">
              <label htmlFor="email2">Empleado responsable</label>
              <MultiSelect
                value={user}
                options={users || []}
                onChange={(e: any) => setUser(e.target.value)}
                optionLabel="name"
                display="chip"
                placeholder={"Seleccione un usuario"}
                filter
                className="multiselect-custom w-full"
                // panelFooterTemplate={panelFooterTemplate}
              />
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
                min={1}
              />
            </div>
            <div className="field col-2 mt-4">
              <Button label="Agregar" onClick={() => addActivitie()} />
            </div>
          </div>
        </div>
      </Card>
      <Card title="Revision" height="" className="relative">
        <SectionStep number={4} />
        <DetailTable activities={activities} />
      </Card>
    </Dialog>
  );
}

export default CreateModal;
