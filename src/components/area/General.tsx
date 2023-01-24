import React from "react";

// Components
import Card from "../shared/Card";
import AreaDevolucion from "./AreaDevolucion";
import AreaDocuments from "./AreaDocuments";
import AreaEficiencia from "./AreaEficiencia";
import AreaHeader from "./AreaHeader";
import AreaUsers from "./AreaUsers";
import LineChart from "../charts/LineChart";

function General(props: any) {
  return (
    <div className="relative">
      <AreaHeader title={props.title} />
      <div className="area_body grid-col-2">
        <div className="flex flex-column">
          <AreaDocuments />
          <AreaDevolucion />
        </div>

        <div>
          <AreaEficiencia area={props.eficiencia} />
          <AreaUsers />
        </div>
      </div>

      {/* Estadisticas */}
      <Card title="Estadisticas" height="fit" hover>
        <LineChart />
      </Card>
    </div>
  );
}

export default General;
