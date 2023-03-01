import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Models
import { Report } from "@/models/reports.model";

// Components
import LineChart from "@/components/charts/LineChart";
import Card from "@/components/shared/Card";
import PercentageCard from "@/pages/dashboard/components/PercentageCard";
import PercentageCircle from "@/components/shared/PercentageCircle";
import { AreaSelection, Powerbi } from "./components";
import DocumentCarousel from "@/components/documents/DocumentCarousel";
import { getReportOfTheMonth } from "@/services/reports.service";
import { Button } from "primereact/button";

function Dashboard() {
  const navigate = useNavigate();

  const [areaOfTheMonth, setAreaOfTheMonth] = useState<Report | any>({});
  const [selectModal, setSelectModal] = useState(false);

  const [selectedAreas, setSelectedAreas] = useState<any[]>(
    localStorage.getItem("dashboard_areas")
      ? JSON.parse(localStorage.getItem("dashboard_areas") || "")
      : []
  );

  const COLORS = ["blue", "yellow", "green"];

  useEffect(() => {
    handleGetAreaOfTheMonth();
  }, []);

  const handleGetAreaOfTheMonth = async () => {
    try {
      const report = await getReportOfTheMonth();
      setAreaOfTheMonth(report);
    } catch (error) {
      console.log(error, "HandleGetAreaOfTheMonth");
    }
  };

  return (
    <div>
      <div className="relative">
        <Button
          className="border-circle absolute right-0 bg-green-400 border-none"
          icon="pi pi-pencil"
          aria-label="Search"
          style={{ top: -35 }}
          onClick={() => setSelectModal(true)}
        />
        <div className="grid grid-col-3 my-4">
          {selectedAreas.map((a, i) => (
            <PercentageCard title={a.name} color={COLORS[i]} area={a._id} />
          ))}
        </div>
      </div>

      <div className="grid-3-1 mt-4">
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

      {/* Modal */}
      <AreaSelection
        visible={selectModal}
        onHide={() => setSelectModal(false)}
        selectedAreas={selectedAreas}
        setSelectedAreas={setSelectedAreas}
      />
    </div>
  );
}

export default Dashboard;
