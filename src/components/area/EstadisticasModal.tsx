import React, { useState, useEffect } from "react";

// Components
import { Dialog } from "primereact/dialog";
import PieChart from "../charts/PieChart";
import BarVertical from "../charts/BarVertical";
import Card from "@/components/shared/Card";
import { InputText } from "primereact/inputtext";
import { MultiSelect } from "primereact/multiselect";
import StackedBarDemo from "../charts/StackedBar";

function EstadisticasModal(props: any) {
  return (
    <Dialog
      header={"Estadistcas"}
      maximized
      visible={props.visible}
      style={{ width: "80vw", padding: 0 }}
      onHide={props.onHide}
    >
      <div className="card flex justify-content-between align-items-center my-2 shadow-1">
        <div className="flex align-items-center">
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText value="" placeholder="Keyword Search" />
          </span>
          <div className="p-float-label ml-3">
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
        </div>
      </div>

      <Card title="Tiempos de eficiencia" height="">
        <StackedBarDemo />
        {/* <BarVertical /> */}
      </Card>

      <div className="grid-3-1">
        <Card title="Deficit de rendimiento" height="">
          <div className="worst_users">
            <ul>
              <li className="flex justify-content-between align-items-center">
                <div className="flex justify-content-between align-items-center">
                  <span>Baldomero Ferrer</span>
                </div>
                <span>25%</span>
              </li>
              <li className="flex justify-content-between align-items-center">
                <div className="flex justify-content-between align-items-center">
                  <span>Josefa Castillo</span>
                </div>
                <span>20%</span>
              </li>
              <li className="flex justify-content-between align-items-center">
                <div className="flex justify-content-between align-items-center">
                  <span>Abrahán González</span>
                </div>
                <span>17%</span>
              </li>
              <li className="flex justify-content-between align-items-center">
                <div className="flex justify-content-between align-items-center">
                  <span>Arcadio Muñoz</span>
                </div>
                <span>15%</span>
              </li>
              <li className="flex justify-content-between align-items-center">
                <div className="flex justify-content-between align-items-center">
                  <span>Roberto Ortega</span>
                </div>
                <span>10%</span>
              </li>
              <li className="flex justify-content-between align-items-center">
                <div className="flex justify-content-between align-items-center">
                  <span>Almudena Fuentes</span>
                </div>
                <span>8%</span>
              </li>
              <li className="flex justify-content-between align-items-center">
                <div className="flex justify-content-between align-items-center">
                  <span>Eduardo Reyes</span>
                </div>
                <span>5%</span>
              </li>
            </ul>
          </div>
        </Card>
        <Card title="Resumen de status" height="">
          <PieChart />
        </Card>
      </div>
    </Dialog>
  );
}

export default EstadisticasModal;
