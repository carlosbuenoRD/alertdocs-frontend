import React from "react";
import { useNavigate } from "react-router-dom";
import { Calendar } from "primereact/calendar";

export interface ReportHeaderProps {
  title: string;
}

const ReportHeader: React.FC<ReportHeaderProps> = ({ title }) => {
  const navigate = useNavigate();
  return (
    <div className="area_header justify-content-between shadow-1">
      <div
        className="flex align-items-center cursor-pointer mr-5"
        onClick={() => navigate(-1)}
      >
        <i className="pi pi-arrow-left text-xl m-0 mr-3" />
        <h5 className="uppercase m-0">{title}</h5>
      </div>

      <div>
        <Calendar
          // value={'date'}
          // onChange={(e: CalendarProps) => setDate(e.value)}
          view="month"
          dateFormat="mm/yy"
          placeholder="Fecha"
          selectionMode="multiple"
        />
      </div>
    </div>
  );
};

export default ReportHeader;
