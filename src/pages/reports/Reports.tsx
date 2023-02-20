import React, { useEffect } from "react";

// Components
import { ReportsCard, ReportsHeader } from "./components";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchReports } from "@/redux/reducers/reports";

function Reports() {
  const dispatch = useAppDispatch();

  const { reports } = useAppSelector((state) => state.reports);

  useEffect(() => {
    dispatch(fetchReports());
  }, []);

  return (
    <div className="relative">
      <ReportsHeader />
      <section className="pt-7 grid-col-2">
        {reports.map((report) => (
          <>
            <ReportsCard report={report} />
          </>
        ))}
      </section>
    </div>
  );
}

export default Reports;
