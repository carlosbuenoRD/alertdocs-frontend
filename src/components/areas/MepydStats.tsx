import { getMepydStats } from "@/services/reports.service";
import React, { useEffect, useState } from "react";

// Components
import Card from "../shared/Card";

function MepydStats() {
  const [eficiencia, setEficiencia] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [devoluciones, setDevoluciones] = useState(0);

  useEffect(() => {
    setState();
  }, []);

  const setState = async () => {
    try {
      const data = await getMepydStats();
      setEficiencia(data.eficiencia);
      setDevoluciones(data.devoluciones);
      setCompleted(data.completed);
    } catch (error) {}
  };

  return (
    <Card title="MEPYD Estadisticas">
      <div className="grid-col-4">
        <div className="card bg-teal-300 shadow-1 h-full grid-center w-full text-white p-5 mb-0">
          <h1 className="text-7xl lh-2 m-0 mb-3 font-light">
            {Math.floor(eficiencia)}%
          </h1>
          <p className="text-lg uppercase lh-2">Eficiencia</p>
        </div>
        <div className="card bg-indigo-200 shadow-1 w-full p-5 mb-0 text-white text-center">
          <h1 className="text-7xl lh-2 m-0 mb-3 font-light">0</h1>
          <p className="text-lg uppercase lh-2">Activos</p>
        </div>
        <div className="card bg-blue-300 shadow-1 w-full p-5 mb-0 text-white text-center">
          <h1 className="text-7xl lh-2 m-0 mb-3 font-light">{completed}</h1>
          <p className="text-lg uppercase lh-2">Completados</p>
        </div>
        <div className="card bg-yellow-300 shadow-1 w-full p-5 mb-0 text-center">
          <h1 className="text-7xl lh-2 m-0 mb-3 font-light">{devoluciones}</h1>
          <p className="text-lg uppercase lh-2">Devoluciones</p>
        </div>
      </div>
    </Card>
  );
}

export default MepydStats;
