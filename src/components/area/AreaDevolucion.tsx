import React from "react";

// Components
import Card from "../shared/Card";

function AreaDevolucion() {
  return (
    <Card
      title="Tiempo de Devoluciones"
      height="fit"
      className="bg-yellow-50"
      hover
    >
      <h1 className="text-8xl lh-2 font-bold text-orange-300 text-center">
        2:25:12
      </h1>
      <a className="text-center w-full block underline cursor-pointer text-xs">
        Ver detalles
      </a>
    </Card>
  );
}

export default AreaDevolucion;
