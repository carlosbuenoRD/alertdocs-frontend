import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Models
import { Report } from "@/models/reports.model";

// Components
import LineChart from "@/components/charts/LineChart";
import Card from "@/components/shared/Card";
import PercentageCard from "@/components/dashboard/PercentageCard";
import PercentageCircle from "@/components/shared/PercentageCircle";
import Powerbi from "@/components/dashboard/Powerbi";
import DocumentCarousel from "@/components/documents/DocumentCarousel";
import { getReportOfTheMonth } from "@/services/reports.service";

function Dashboard() {
  const navigate = useNavigate();

  const [areaOfTheMonth, setAreaOfTheMonth] = useState<Report | any>({});

  useEffect(() => {
    handleGetAreaOfTheMonth();
  }, []);

  const handleGetAreaOfTheMonth = async () => {
    try {
      const report = await getReportOfTheMonth();
      setAreaOfTheMonth(report);
      console.log(areaOfTheMonth);
    } catch (error) {
      console.log(error, "HandleGetAreaOfTheMonth");
    }
  };

  return (
    <div>
      <div className="grid grid-col-3">
        <PercentageCard title="Recursos Humano" color="blue" />
        <PercentageCard title="Direccion financiera" color="yellow" />
        <PercentageCard title="Control Interno" color="green" />
      </div>

      <div className="grid-3-1 mt-5">
        <Card title="Ultimos 6 meses" height="fit">
          <LineChart />
        </Card>
        <Card title="Area del mes" height="">
          <PercentageCircle
            size={180}
            title={areaOfTheMonth?.areaId?.name || "LOADING"}
            value={
              areaOfTheMonth.activitiesEficiencia /
              areaOfTheMonth.activities?.length
            }
            area={areaOfTheMonth?.areaId?._id}
          />
          <a
            className="text-center w-full block underline cursor-pointer text-xs"
            onClick={() => navigate("/areas")}
          >
            Ver todos
          </a>
        </Card>
      </div>

      {/* Documents Carousel */}
      <DocumentCarousel />

      {/* POWER BI */}
      <Powerbi />
    </div>
  );
}

export default Dashboard;
