import React, { useState } from "react";
import { Chart } from "primereact/chart";
import { barData } from "./../../utils/data";

function BarVertical(props: any) {
  const getLightTheme = () => {
    let basicOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
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

    let horizontalOptions = {
      indexAxis: "y",
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: "#495057",
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: "#495057",
          },
          grid: {
            color: "transparent",
          },
        },
        y: {
          ticks: {
            color: "#495057",
          },
          grid: {
            color: "transparent",
          },
        },
      },
    };

    let stackedOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        tooltips: {
          mode: "index",
          intersect: false,
        },
        legend: {
          labels: {
            color: "#495057",
          },
        },
      },
      scales: {
        x: {
          stacked: true,
          ticks: {
            color: "#495057",
          },
          grid: {
            color: "#ebedef",
          },
        },
        y: {
          stacked: true,
          ticks: {
            color: "#495057",
          },
          grid: {
            color: "#ebedef",
          },
        },
      },
    };

    let multiAxisOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: "#495057",
          },
        },
        tooltips: {
          mode: "index",
          intersect: true,
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
          type: "linear",
          display: true,
          position: "left",
          ticks: {
            min: 0,
            max: 100,
            color: "#495057",
          },
          grid: {
            color: "#ebedef",
          },
        },
        y1: {
          type: "linear",
          display: true,
          position: "right",
          grid: {
            drawOnChartArea: false,
            color: "#ebedef",
          },
          ticks: {
            min: 0,
            max: 100,
            color: "#495057",
          },
        },
      },
    };

    return {
      basicOptions,
      horizontalOptions,
      stackedOptions,
      multiAxisOptions,
    };
  };

  const { basicOptions, horizontalOptions, multiAxisOptions, stackedOptions } =
    getLightTheme();
  return (
    <div className="card-dark">
      <h5>{props.title}</h5>
      <Chart type="bar" data={barData} options={basicOptions} />
    </div>
  );
}

export default BarVertical;
