import React, { useState, useEffect } from "react";

// Components
import { Dialog } from "primereact/dialog";
import PieChart from "../charts/PieChart";
import BarVertical from "../charts/BarVertical";

function EstadisticasModal(props: any) {
  return (
    <Dialog
      header={"Estadistcas"}
      maximized
      visible={props.visible}
      style={{ width: "80vw", padding: 0 }}
      onHide={props.onHide}
    >
      <div className="card">
        <h5>Tiempos de eficiencia</h5>
        <hr />
        <BarVertical />
      </div>

      <div className="grid-3-1">
        <div className="card">
          <h5>Deficit de rendimiento</h5>
          <hr />
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
        </div>
        <div className="card">
          <h5>Resumen de status</h5>
          <hr />
          <PieChart />
        </div>
      </div>
    </Dialog>
  );
}

export default EstadisticasModal;
