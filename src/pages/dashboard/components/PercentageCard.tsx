import { Report } from "@/models";
import { getReportByArea } from "@/services/reports.service";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PercentageCardInfo = (props: Report) => {
  return (
    <div
      className="grid-col-2 grid-center card shadow-1 p-1"
      style={{ width: "60%" }}
    >
      <div className="w-full text-center p-1 border-right-1 border-100">
        <p className="m-0 mb-1 uppercase sm:text-xs md:text-xs">Completados</p>
        <h6 className="m-0">{props.activities?.length || 0}</h6>
      </div>
      <div className="w-full text-center p-1">
        <p className="m-0 mb-1 uppercase sm:text-xs md:text-xs">Retrasados</p>
        <h6 className="m-0">{props.badActivities?.length || 0}</h6>
      </div>
    </div>
  );
};

function PercentageCard(props: any) {
  const navigate = useNavigate();

  const [report, setReport] = useState<Report | any>();

  useEffect(() => {
    getReport();
  }, []);

  const getReport = async () => {
    const data = await getReportByArea(props.area);
    setReport(data);
  };

  return (
    <div
      className="percentage_card shadow-1"
      onClick={() => !props.notClick && navigate(`/area/${props.area}`)}
    >
      <div
        className={`percentage_card_bar w-3rem bg-${
          props.color ? props.color : "blue"
        }-300 shadow-4 border-right-1 border-200`}
      >
        <h1
          className={`percentage_card_value bg-${props.color}-100 text-600 sm:text-sm md:text-lg lg:text-2xl xl:text-4xl`}
        >
          {Math.floor(
            report?.activitiesEficiencia / report?.activities?.length
          ) || 0}
        </h1>
      </div>
      <div className="ml-2 my-2 w-full">
        <h6 className="mb-4 border-bottom-1 border-100 pb-2 w-full uppercase text-sm">
          {props.title}
        </h6>
        {props.notInfo ? null : <PercentageCardInfo {...report} />}
      </div>
    </div>
  );
}

export default PercentageCard;
