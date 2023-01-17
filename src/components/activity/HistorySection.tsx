import React from "react";
import { Accordion } from "primereact/accordion";
import { AccordionTab } from "primereact/accordion";
import { Timeline } from "primereact/timeline";
import { dateFormat } from "@/utils/dateFormat";

let histories: any[] = [];

let handleEvents = (history: any): any[] => {
  return history?.map((h: any) => ({
    status: h.action,
    date: `${dateFormat(h.createdAt, "date")} ${dateFormat(
      h.createdAt,
      "time"
    )}`,
  }));
};

function HistorySection() {
  return (
    <>
      {histories.length > 0 ? (
        <Accordion>
          {histories?.map((h: any) => (
            <AccordionTab
              key={h.step}
              //   header={
              //     h.activityId === activity._id
              //       ? "Historial actual"
              //       : `Paso ${h.step}`
              //   }
            >
              <Timeline
                className="p-0"
                value={handleEvents(h.actions)}
                opposite={(item) => item.status}
                content={(item) => (
                  <small className="p-text-secondary">{item.date}</small>
                )}
              />
            </AccordionTab>
          ))}
        </Accordion>
      ) : (
        // <NoResult text="La actividad no tiene historia" />
        <p>No tienes </p>
      )}
    </>
  );
}

export default HistorySection;
