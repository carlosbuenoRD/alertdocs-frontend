import React from "react";

function padTo2Digits(num: number) {
  return num.toString().padStart(2, "0");
}

export default function Timer(props: any) {
  let seconds = Math.floor(props.time / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  seconds = seconds % 60;
  minutes = minutes % 60;
  hours = hours % 24;

  return (
    <div className="text-3xl">
      <span className="digits">{padTo2Digits(hours === -1 ? 0 : hours)}:</span>
      <span className="digits">{padTo2Digits(minutes)}:</span>
      <span className="digits">{padTo2Digits(seconds)}</span>
      {/* <span className="digits mili-sec">
        {("0" + ((props.time / 10) % 100)).slice(-2)}
      </span> */}
    </div>
  );
}
