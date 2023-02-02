import React from "react";
import { AccordionTab } from "primereact/accordion";
import { dateFormat, formatTime } from "@/utils/dateFormat";
import StopWatch from "../stopWatch/StopWatch";
import { Checkbox } from "primereact/checkbox";

export function AccordionDevolucionBody(props: any) {
  return (
    <>
      <p>{props.comment}</p>
      <ol>
        {props.missing?.map((item: string) => (
          <li className="col-12 m-0">
            <label htmlFor="cb1" className="p-checkbox-label ml-2">
              {item}
            </label>
          </li>
        ))}
      </ol>
    </>
  );
}

export function AccordionDevolucionHeader(props: any) {
  return (
    <div className="flex align-items-center justify-content-between w-full">
      <p className="m-0 text-sm">
        #{props.activityFrom.step}--
        {props.userFrom.name} ----- {dateFormat(props.createdAt, "date")} |{" "}
        {dateFormat(props.createdAt, "time")}
      </p>
      <p className="" style={{ marginLeft: "auto" }}>
        <StopWatch
          time={props ? formatTime([props]) : 0}
          pause={props.endedAt ? true : false}
        />
      </p>
    </div>
  );
}
