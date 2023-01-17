import React, { useState } from "react";
import { Chart } from "primereact/chart";

function PieChart() {
  const [pieOptions, setPieOptions] = useState<any>({
    animation: false,
    plugins: {
      legend: {
        labels: {
          color: "#495057",
        },
      },
    },
  });

  const pieData = {
    labels: ["A", "B", "C", "D"],
    datasets: [
      {
        data: [540, 325, 702, 421],
        backgroundColor: [
          "rgb(54, 162, 235)",
          "rgb(255, 99, 132)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
        ],
      },
    ],
  };

  return (
    <div className="flex flex-column align-items-center">
      <Chart
        type="pie"
        data={pieData}
        options={pieOptions}
        style={{ width: "100%" }}
      />
    </div>
  );
}

export default PieChart;
