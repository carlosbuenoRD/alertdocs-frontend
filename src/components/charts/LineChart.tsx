import React, { useState, memo } from "react";
import { Chart } from "primereact/chart";

const LineChart = memo(function LineChart() {
  console.log("p");

  const [basicData] = useState({
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: "#6184AA",
        tension: 0.4,
      },
      {
        label: "",
        data: [28, 48, 40, 19, 86, 27, 90],
        fill: false,
        borderColor: "#FDD87D",
        tension: 0.4,
      },

      {
        label: "",
        data: [10, 80, 40, 110, 69, 35, 29],
        fill: false,
        borderColor: "#90CD93",
        tension: 0.4,
      },
    ],
  });

  const getLightTheme = () => {
    let basicOptions = {
      maintainAspectRatio: false,
      aspectRatio: 1.12,
      animation: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          ticks: {
            color: "#495057",
          },
          grid: {
            color: "#ebedef",
          },
        },
        y: {
          ticks: {
            color: "#495057",
          },
          grid: {
            color: "#ebedef",
          },
        },
      },
    };

    return {
      basicOptions,
    };
  };

  const { basicOptions } = getLightTheme();
  return <Chart type="line" data={basicData} options={basicOptions} />;
});

export default LineChart;
