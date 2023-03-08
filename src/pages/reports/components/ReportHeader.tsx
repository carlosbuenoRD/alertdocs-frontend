import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/store";

// Components
import { Calendar, CalendarProps } from "primereact/calendar";
import { fetchReportByAreaAndDate } from "@/redux/reducers/reports";

export interface ReportHeaderProps {
  title: string;
}

const ReportHeader: React.FC<ReportHeaderProps> = ({ title }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { report } = useAppSelector((state) => state.reports);

  const [date, setDate] = useState<any>("");

  useEffect(() => {
    if (date) {
      dispatch(
        fetchReportByAreaAndDate({
          area: report.areaId?._id,
          month: new Date(date).getMonth(),
          year: new Date(date).getFullYear(),
        })
      );
    }
  }, [date]);

  return (
    <div className="area_header justify-content-between shadow-1">
      <div
        className="flex align-items-center cursor-pointer mr-5"
        onClick={() => navigate(-1)}
      >
        <i className="pi pi-arrow-left text-xl m-0 mr-3" />
        <h5 className="uppercase m-0">{title || report.areaId?.name}</h5>
      </div>

      <div>
        <Calendar
          value={date}
          onChange={(e: CalendarProps) => setDate(e.value)}
          view="month"
          dateFormat="mm/yy"
          placeholder="Fecha"
        />
      </div>
    </div>
  );
};

export default ReportHeader;
