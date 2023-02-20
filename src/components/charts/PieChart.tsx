import React, { useState, memo } from "react";
import { Chart } from "primereact/chart";

const PieChart = memo(function PieChart(props: any) {
  const [pieOptions, setPieOptions] = useState<any>({
    maintainAspectRatio: false,
    aspectRatio: props.aspectRatio || 1.12,
    animation: true,
    plugins: {
      legend: {
        labels: {
          color: "#495057",
        },
      },
    },
  });

  const pieData = {
    labels: ["A tiempo", "Rayando", "Retrasado"],
    datasets: [
      {
        data: [540, 325, 702],
        backgroundColor: [
          "rgb(54, 162, 235)",
          "rgb(255, 99, 132)",
          "rgb(255, 205, 86)",
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
});

export default PieChart;
