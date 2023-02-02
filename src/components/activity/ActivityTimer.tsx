import React from "react";

import StopWatch from "../stopWatch/StopWatch";
import Countdown from "react-countdown";
import { useAppSelector } from "@/redux/store";
import activity from "@/redux/reducers/activity";

function ActivityTimer(props: any) {
  const { user } = useAppSelector((state) => state.auth);

  const toMilliseconds = (hrs: number) => hrs * 60 * 60 * 1000;

  const getTimeWithDevolucion = (activity: any) => {
    return (
      activity.startedAt +
      (activity.continueByDevolucion - activity.pauseByDevolucion)
    );
  };

  console.log(getTimeWithDevolucion(props.activity), "ree");

  console.log(Date.now());

  return (
    <div className="col-4 m-0 align-self-center text-center w-full">
      {props.activity.state === "progress" &&
        !props.activity.pauseByDevolucion &&
        !props.activity.continueByDevolucion && (
          <>
            <div className="text-4xl m-0">
              {props.activity.startedAt +
                toMilliseconds(props.activity.hours) <=
              Date.now() ? (
                <div className="flex">
                  -
                  <StopWatch
                    time={
                      Date.now() -
                      (props.activity.startedAt +
                        toMilliseconds(props.activity.hours))
                    }
                  />
                </div>
              ) : (
                <Countdown
                  date={
                    props.activity.startedAt +
                    toMilliseconds(props.activity.hours)
                  }
                />
              )}
            </div>
          </>
        )}
      {props.activity.state === "progress" &&
        props.activity.pauseByDevolucion &&
        props.activity.continueByDevolucion && (
          <>
            <div className="text-4xl m-0">
              {getTimeWithDevolucion(props.activity) +
                toMilliseconds(props.activity.hours) <=
              Date.now() +
                (props.activity.continueByDevolucion -
                  props.activity.pauseByDevolucion) ? (
                <div className="flex">
                  -
                  <StopWatch
                    time={
                      Date.now() -
                      (getTimeWithDevolucion(props.activity) +
                        toMilliseconds(props.activity.hours))
                    }
                  />
                </div>
              ) : (
                <Countdown
                  date={
                    getTimeWithDevolucion(props.activity) +
                    toMilliseconds(props.activity.hours)
                  }
                />
              )}
            </div>
          </>
        )}
      {props.activity.state === "completed" && (
        <h4 className="m-0">completado</h4>
      )}
      {props.activity.state === "revision" &&
        !props.activity.pauseByDevolucion &&
        !props.activity.continueByDevolucion && (
          <>
            <h4 className="m-0">
              <StopWatch
                time={props.activity.endedAt - props.activity.startedAt}
                pause
              />
            </h4>
          </>
        )}
      {props.activity.state === "revision" &&
        props.activity.pauseByDevolucion &&
        props.activity.continueByDevolucion && (
          <>
            <h4 className="m-0">
              <StopWatch
                time={
                  props.activity.endedAt - getTimeWithDevolucion(props.activity)
                }
                pause
              />
            </h4>
          </>
        )}
      {props.activity.state === "pending" && <h4 className="m-0">En espera</h4>}
      {props.activity.pauseByDevolucion &&
        !props.activity.continueByDevolucion && (
          <>
            <h4 className="m-0">
              <StopWatch
                time={
                  props.activity.pauseByDevolucion - props.activity.startedAt
                }
                pause
              />
            </h4>
            <h6 className="m-0 uppercase text-sm mt-1">
              Pausado por devolucion
            </h6>
          </>
        )}
    </div>
  );
}

export default ActivityTimer;
