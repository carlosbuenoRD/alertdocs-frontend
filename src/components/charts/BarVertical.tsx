import React, { useState, memo } from "react";
import { Chart } from "primereact/chart";
import { barData } from "./../../utils/data";

const long = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "DIRECCIÓN FINANCIERA",
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: true,
      borderColor: "#6184AA",
      backgroundColor: "#6184AA",
      tension: 0.4,
    },
    {
      label: "DIRECCIÓN ADMINISTRATIVA",
      data: [28, 48, 40, 19, 86, 27, 90],
      fill: true,
      borderColor: "#FDD87D",
      backgroundColor: "#FDD87D",
      tension: 0.4,
    },

    {
      label: "RECURSOS HUMANO",
      data: [10, 80, 40, 110, 69, 35, 29],
      fill: true,
      borderColor: "#90CD93",
      backgroundColor: "#90CD93",
      tension: 0.4,
    },
  ],
};

const BarChart = memo(function BarVertical(props: any) {
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
  return <Chart type="bar" data={long} options={basicOptions} />;
});

export default BarChart;
