import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { fetchOneReport, fetchReportByArea } from "@/redux/reducers/reports";
import { useAppDispatch, useAppSelector } from "@/redux/store";

// Components
import BarChart from "@/components/charts/BarVertical";
import Card from "@/components/shared/Card";
import {
  CardInfo,
  PieChart,
  ProcesosChart,
  ReportHeader,
  UserDeficitTable,
  UserTable,
} from "./components";

function Report() {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const { report } = useAppSelector((state) => state.reports);

  const REPORT_ID = location.pathname.split("/")[2];
  const TYPE = location.search.split("=")[1];

  useEffect(() => {
    if (TYPE) {
      dispatch(fetchReportByArea(REPORT_ID));
    } else {
      dispatch(fetchOneReport(REPORT_ID));
    }
  }, [REPORT_ID, TYPE]);

  console.log(report);

  return (
    <div className="relative">
      <ReportHeader title={report.areaId?.name} />

      <main className="pt-7">
        <div className="grid-col-3">
          <CardInfo
            title="Eficiencia"
            qty={report?.activitiesEficiencia / report.activities?.length}
          />
          <CardInfo
            title="Completados"
            time={report.activitiesTime}
            qty={report.activities?.length}
          />
          <CardInfo
            title="Devoluciones"
            time={report.devolucionesTime}
            qty={report.devoluciones?.length}
          />
        </div>
        <div className="grid-3-1">
          <Card title="Procesos involucrados">
            <ProcesosChart />
          </Card>

          <Card title="Cantidad de tipos">
            <PieChart
              aspectRatio={1}
              goodActivities={report.goodActivities?.length}
              mediumActivities={report.mediumActivities?.length}
              badActivities={report.badActivities?.length}
            />
          </Card>
        </div>

        <div className="grid-1-3">
          <Card title="Deficit de usuarios">
            <UserDeficitTable />
          </Card>
          <Card title="Usuarios">
            <UserTable />
          </Card>
        </div>
      </main>

      {/* <section className="pt-7 grid-col-2">
        {reports.map((report) => (
          <>
            <ReportsCard
              title={report.areaId.name}
              activities={report.activities}
              devoluciones={report.devoluciones}
              activitiesTime={report.activitiesTime}
              devolucionesTime={report.devolucionesTime}
            />
          </>
        ))}
      </section> */}
    </div>
  );
}

export default Report;
