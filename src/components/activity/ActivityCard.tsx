import React, { useState, useEffect } from "react";

function ActivityCard(props: any) {
  const colors = ["green", "yellow", "pink"];

  const [color, setColor] = useState("green");

  useEffect(() => {
    setColor(colors[Math.floor(Math.random() * 3)]);
  }, []);

  return (
    <div
      className={`card shadow-2 cursor-pointer w-full ${
        props.state !== "pending" && `border-2 border-${color}-400`
      } `}
      onClick={props.onClick}
    >
      <p>
        Documento: <label className="font-bold">MEPYD-INT-2022-00740</label>
      </p>
      <p>{props.description}</p>
      <div className="flex justify-content-between">
        <div className="flex">
          <p className="mr-2">Tiempo:</p>
          <p className="font-bold">{Math.floor(props.hours * 60)} Minutos</p>
        </div>
        <p className="font-bold textblue">{props.state}</p>
      </div>
    </div>
  );
}

export default ActivityCard;
