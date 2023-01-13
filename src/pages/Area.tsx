import React from "react";

// Components
import AreaHeader from "@/components/area/AreaHeader";
import Card from "@/components/shared/Card";
import PercentageCircle from "@/components/shared/PercentageCircle";
import LineChart from "@/components/charts/LineChart";
import AreaDocuments from "@/components/area/AreaDocuments";
import AreaEficiencia from "@/components/area/AreaEficiencia";
import AreaUsers from "@/components/area/AreaUsers";
import AreaDevolucion from "@/components/area/AreaDevolucion";

function Area() {
  return (
    <div className="relative">
      <AreaHeader />
      <div className="area_body grid-col-2">
        <div className="flex flex-column">
          <AreaDocuments />
          <AreaDevolucion />
        </div>

        <div>
          <AreaEficiencia />
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

export default Area;
