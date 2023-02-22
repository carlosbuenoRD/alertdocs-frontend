import React, { useState, memo } from "react";
import { Chart } from "primereact/chart";

export interface ProcesosChartProps {
  procesos: [
    {
      proceso: any;
      qty: number;
    }
  ];
}

const ProcesosChart: React.FC<ProcesosChartProps> = memo(function BarVertical({
  procesos,
}) {
  const getLightTheme = () => {
    let basicOptions = {
      maintainAspectRatio: false,
      aspectRatio: 1,
      plugins: {
        legend: {
          labels: {
            color: "#000",
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: "#000",
          },
          grid: {
            color: "transparent",
          },
        },
        y: {
          ticks: {
            color: "#000",
          },
          grid: {
            color: "transparent",
          },
        },
      },
    };

    return {
      basicOptions,
    };
  };

  const barData = {
    labels: procesos?.map((i) => i.proceso?.description),
    datasets: [
      // {
      //   label: "Eficiencia",
      //   backgroundColor: "rgb(255, 99, 132)",
      //   borderColor: "rgb(255, 99, 132)",
      //   data: [65, 59, 80, 81, 56, 55, 40],
      // },
      {
        label: "Cantidad usadas",
        backgroundColor: "#eab676",
        borderColor: "#eab676",
        data: procesos?.map((i) => i.qty),
      },
    ],
  };

  const { basicOptions } = getLightTheme();
  return (
    <div className="card-dark">
      <Chart type="bar" data={barData} options={basicOptions} />
    </div>
  );
});

export default ProcesosChart;
