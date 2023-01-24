import React from "react";

// Components
import LineChart from "@/components/charts/LineChart";
import Card from "@/components/shared/Card";
import PercentageCard from "@/components/dashboard/PercentageCard";
import PercentageCircle from "@/components/shared/PercentageCircle";
import Powerbi from "@/components/dashboard/Powerbi";
import DocumentCarousel from "@/components/documents/DocumentCarousel";

function Dashboard() {
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
            title="Viceministerio de economia y planificacion"
          />
          <a className="text-center w-full block underline cursor-pointer text-xs">
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
