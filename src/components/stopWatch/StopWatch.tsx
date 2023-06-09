import React, { useState } from "react";
// import "./StopWatch.css";
import Timer from "./Timer";

export interface StopWatchProps {
  time: number;
  pause?: boolean;
  className?: string;
}

const StopWatch: React.FC<StopWatchProps> = (props) => {
  const [time, setTime] = useState(0);

  React.useEffect(() => {
    setTime(props.time);
  }, [props.time]);

  React.useEffect(() => {
    if (!props.pause) {
      let interval: any = null;
      interval = setInterval(() => {
        setTime((time: number) => time + 10);
      }, 10);

      return () => {
        clearInterval(interval);
      };
    }
  }, [props.pause]);

  return (
    <div
      className={`stop-watch ${props.className ? props.className : "text-3xl"}`}
    >
      <Timer time={time} />
    </div>
  );
};

export default StopWatch;
