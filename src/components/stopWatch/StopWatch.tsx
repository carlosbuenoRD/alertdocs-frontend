import React, { useState } from "react";
// import "./StopWatch.css";
import Timer from "./Timer";

function StopWatch(props: any) {
  const [time, setTime] = useState(props.time);

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
    <div className="stop-watch">
      <Timer time={time} />
    </div>
  );
}

export default StopWatch;
