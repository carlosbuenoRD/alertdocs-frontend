import React, { useState } from "react";
import { ProfileState } from "../context/ProfileContext";
import { useAppDispatch, useAppSelector } from "@/redux/store";

// Components
import {
  AccordionDevolucionBody,
  AccordionDevolucionHeader,
} from "@/components/shared/AccordionDevolucion";
import ActivityCard from "@/components/activity/ActivityCard";
import { Button } from "primereact/button";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Badge } from "primereact/badge";
import { endDevoluciones } from "@/redux/reducers/devolucion";

export interface PendingActivitiesProps {
  handleSelectActivity: (param: any) => void;
}

const PendingActivities: React.FC<PendingActivitiesProps> = ({
  handleSelectActivity,
}) => {
  const dispatch = useAppDispatch();

  const { activities } = ProfileState();
  const { userDevoluciones } = useAppSelector((state) => state.devolucion);

  const [section, setSection] = useState(0);

  let pending = activities?.filter(
    (i: any) =>
      i.state === "pending" || i.state === "ready" || i.state === "proximo"
  );

  const handleEndDevolucion = (id: string) => {
    dispatch(endDevoluciones(id));
  };

  return (
    <div className="card w-full h-full shadow-1 flex-1">
      <div className="border-bottom-1 pb-1 border-100 w-full mb-2">
        <Button
          onClick={() => setSection(0)}
          className="mr-2 p-overlay-badge border-none overflow-visible"
          label="Actividades"
        >
          {pending?.length > 0 && (
            <Badge
              value={pending?.length || 0}
              severity="danger"
              className="text-xs"
            ></Badge>
          )}
        </Button>
        <Button
          onClick={() => setSection(1)}
          className="p-overlay-badge bg-orange-400 border-none overflow-visible"
          label="Devoluciones"
        >
          {userDevoluciones?.length > 0 && (
            <Badge
              value={userDevoluciones?.length || 0}
              severity="danger"
              className="text-xs"
            ></Badge>
          )}
        </Button>
      </div>
      {section === 0 ? (
        <>
          {pending.length > 0 ? (
            <div>
              <div className="grid-col-2 w-full">
                {pending?.map((p: any) => (
                  <ActivityCard
                    key={p._id}
                    onClick={() => handleSelectActivity(p)}
                    {...p}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className=" bg-red-400 w-full p-4 grid-center">
              No tienes actividades pendientes
            </div>
          )}
        </>
      ) : (
        <>
          {userDevoluciones?.length > 0 ? (
            <Accordion className="card shadow-1">
              {userDevoluciones?.map((i: any) => (
                <AccordionTab
                  key={i._id}
                  header={<AccordionDevolucionHeader {...i} />}
                  headerClassName={`w-full ${
                    i.endedAt ? "bg-green-100" : "bg-pink-100"
                  }`}
                >
                  <AccordionDevolucionBody {...i} />
                  {!i.endedAt && (
                    <div className="w-full flex justify-content-end">
                      <button
                        className="p-button"
                        onClick={() => handleEndDevolucion(i._id)}
                      >
                        Terminar devolucion
                      </button>
                    </div>
                  )}
                </AccordionTab>
              ))}
            </Accordion>
          ) : (
            <div className=" bg-red-400 w-full p-4 grid-center">
              No tienes devoluciones pendientes
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PendingActivities;
