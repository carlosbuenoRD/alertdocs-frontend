import React, { useEffect } from "react";

// Components
import { Message } from "primereact/message";
import { Accordion } from "primereact/accordion";
import { AccordionTab } from "primereact/accordion";
import { Timeline } from "primereact/timeline";
import { dateFormat } from "@/utils/dateFormat";
import { useAppSelector } from "./../../redux/store";
import { fetchHistoryByActivities } from "@/redux/reducers/history";
import { useAppDispatch } from "@/redux/store";

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
  const dispatch = useAppDispatch();

  const { histories } = useAppSelector((state) => state.history);
  const { activity } = useAppSelector((state) => state.activity);

  useEffect(() => {
    dispatch(fetchHistoryByActivities());
  }, []);

  return (
    <>
      {histories?.length > 0 ? (
        <Accordion>
          {histories?.map((h: any) => (
            <AccordionTab
              key={h.step}
              header={
                h.activityId === activity._id
                  ? "Historial actual"
                  : `Paso ${h.step}`
              }
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
        <Message
          severity="error"
          text="La actividad no tiene historia"
          className="w-full h-3rem bg-pink-100"
        />
      )}
    </>
  );
}

export default HistorySection;
