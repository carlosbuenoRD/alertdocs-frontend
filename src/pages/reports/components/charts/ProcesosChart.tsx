import React, { useState, memo } from "react";
import { Chart } from "primereact/chart";
import { barData } from "@/utils/data";

const ProcesosChart = memo(function BarVertical(props: any) {
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

  const { basicOptions } = getLightTheme();
  return (
    <div className="card-dark">
      <h5>{props.title}</h5>
      <Chart type="bar" data={barData} options={basicOptions} />
    </div>
  );
});

export default ProcesosChart;
