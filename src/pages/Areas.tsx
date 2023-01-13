import React from "react";

// COMPONENTS
import PercentageCard from "@/components/dashboard/PercentageCard";
import Card from "@/components/shared/Card";
import PercentageCircle from "@/components/shared/PercentageCircle";
import PieChart from "@/components/charts/PieChart";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import AreasHeader from "@/components/areas/AreasHeader";

const areas = ["p", "p", "p", "p", "p", "p", "p", "p", "p", "p", "p", "p", "p"];

let colors = [
  "blue",
  "green",
  "yellow",
  "cyan",
  "pink",
  "indigo",
  "teal",
  "orange",
  "bluegray",
  "purple",
  "blue",
  "gray",
  "yellow",
];

function Areas() {
  return (
    <div className="relative">
      <AreasHeader />
      <div className="grid-1-3 gap-3 pt-7">
        <div>
          <Card title="Viceministerios" height="fit">
            {Array.from(Array(5)).map((item, i) => (
              <div className="mb-3">
                <PercentageCard color={colors[i]} notInfo />
              </div>
            ))}
          </Card>
          <Card title="Estadisticas" height="fit">
            <PieChart />
            <a className="text-center w-full block underline cursor-pointer text-xs mt-3">
              Ver detalles
            </a>
          </Card>
        </div>
        <Card title="Todos" height="">
          <div className="grid-col-2">
            {areas.map((item, i) => (
              <div className="card shadow-1">
                <PercentageCircle
                  color={"blue"}
                  value={100}
                  size={150}
                  title="Recursos Humanos"
                />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Areas;
