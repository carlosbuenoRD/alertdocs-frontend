import React, { useState, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/redux/store";

// Components
import { MultiSelect } from "primereact/multiselect";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import Card from "../../../components/shared/Card";
import { dateFormat } from "@/utils/dateFormat";
import StopWatch from "../../../components/stopWatch/StopWatch";
import { getEficiencia } from "@/utils/formula";
import { Calendar } from "primereact/calendar";
import { CalendarProps } from "primereact/calendar";
import ActivitiesTable from "./ActivitiesTable";
import { ProfileState } from "../context/ProfileContext";

function ActivitiesModal(props: any) {
  const { activities } = ProfileState();

  const [date, setDate] = useState<any>("");

  const renderHeader = () => {
    return (
      <div className="card flex justify-content-between align-items-center my-2 shadow-1">
        <div className="flex align-items-center">
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText
              value=""
              placeholder="Keyword Search"
              className="w-20rem"
            />
          </span>
          <div className="p-float-label mx-2">
            <MultiSelect
              display="chip"
              optionLabel="name"
              // value={selectedCities}
              // options={cities}
              // onChange={(e) => setSelectedCities(e.value)}
              className="w-24rem"
            />
            <label htmlFor="search">Filtro de procesos</label>
          </div>
          <div className="p-input-icon-right p-float-label w-10">
            <i className="pi pi-calendar" />
            <Calendar
              id="range"
              value={date}
              onChange={(e: CalendarProps) => setDate(e.value)}
              selectionMode="range"
              readOnlyInput
              className="w-20rem"
            />
            <label htmlFor="search">Filtrar por fecha</label>
          </div>
        </div>
      </div>
    );
  };

  const header = renderHeader();

  return (
    <>
      <Dialog
        header={"Actividades"}
        visible={props.visible}
        style={{ width: "80vw", padding: 0 }}
        onHide={props.onHide}
      >
        {header}

        <div className="grid-3-1">
          <div className="card shadow-1 h-fit py-2">
            <ActivitiesTable activities={activities} />
          </div>
          <div>
            {/* <Card title="Tiempo de devoluciones" height=""></Card> */}
            <Card title="Record" height="">
              <ul className="grid-col-3 text-700">
                <li className="text-center bg-green-200 w-full p-2 border-round-md shadow-1">
                  <h5 className="m-0 mb-2">8</h5>
                  <h5 className="m-0 uppercase">Good</h5>
                </li>
                <li className="text-center bg-yellow-200 w-full p-2 border-round-md shadow-1">
                  <h5 className="m-0 mb-2">8</h5>
                  <h5 className="m-0 uppercase">Warn</h5>
                </li>
                <li className="text-center bg-pink-200 w-full p-2 border-round-md shadow-1">
                  <h5 className="m-0 mb-2">8</h5>
                  <h5 className="m-0 uppercase ">Bad</h5>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default ActivitiesModal;
