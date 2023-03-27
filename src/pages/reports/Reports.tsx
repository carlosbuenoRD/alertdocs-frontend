import React, { useEffect } from "react";

// Components
import { ReportsCard, ReportsHeader } from "./components";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchReports } from "@/redux/reducers/reports";
import Card from "@/components/shared/Card";
import { notifySocket } from "@/sockets";

function Reports() {
  const dispatch = useAppDispatch();

  const { reports } = useAppSelector((state) => state.reports);

  useEffect(() => {
    dispatch(fetchReports());
  }, []);

  useEffect(() => {
    notifySocket.on("loaded data", () => dispatch(fetchReports()));
  }, []);

  return (
    <div className="relative">
      <ReportsHeader />
      {reports.length > 0 ? (
        <section className="pt-7 grid-col-2">
          {reports?.map((report) => (
            <ReportsCard key={report._id} report={report} />
          ))}
        </section>
      ) : (
        <div className="pt-7">
          <Card className="w-full text-center ">
            <img
              src="/assets/svg/empty_reports.svg"
              width={300}
              className="mb-2"
            />
            <h5 className="font-italic">
              No tienes reportes del mes de febrero del 2023
            </h5>
          </Card>
        </div>
      )}
    </div>
  );
}

export default Reports;
