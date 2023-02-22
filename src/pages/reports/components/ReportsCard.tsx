import React from "react";
import { useNavigate } from "react-router-dom";

// Components
import LineChart from "@/components/charts/LineChart";
import Card from "@/components/shared/Card";
import StopWatch from "@/components/stopWatch/StopWatch";
import PieChart from "./charts/PieChart";
import { Report } from "@/models/reports.model";

export interface ReportsCardInterface {
  report: Report;
}

const ReportsCard: React.FC<ReportsCardInterface> = ({ report }) => {
  const navigate = useNavigate();

  let title = report?.areaId?.name;

  return (
    <Card
      title={title}
      hover
      onClick={() => navigate(`/reports/${report._id}`)}
    >
      <div className="grid-col-2 w-full mb-3 text-center">
        <div className="mb-0 lh-1 w-full p-2 border-right-1 border-100">
          <p className="mb-2">Completados</p>
          <h6 className="m-0">{report.activities.length}</h6>
        </div>
        <div className="mb-0 lh-1 w-full  p-2">
          <p className="mb-2">Devoluciones</p>
          <h6 className="m-0">{report.devoluciones.length}</h6>
        </div>
      </div>

      <hr />

      {/* <LineChart aspectRatio={2} short /> */}
      <PieChart
        aspectRatio={1.5}
        goodActivities={report.goodActivities.length}
        badActivities={report.badActivities.length}
        mediumActivities={report.mediumActivities.length}
      />

      <hr />

      <div className="grid-col-2 text-center mt-4">
        <div className="border-right-1 border-100">
          <p className="mb-2">Tiempo en actividades</p>
          <StopWatch time={report.activitiesTime} pause />
        </div>
        <div>
          <p className="mb-2">Tiempo en devoluciones</p>
          <StopWatch time={report.devolucionesTime} pause />
        </div>
      </div>
    </Card>
  );
};

export default ReportsCard;
