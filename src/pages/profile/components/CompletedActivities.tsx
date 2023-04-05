import React from "react";

// State
import { ProfileState } from "../context/ProfileContext";

// Utils
import { checkColor } from "@/utils/checkColor";
import { getEficiencia } from "@/utils/formula";

// Components
import Card from "@/components/shared/Card";

export interface CompletedActivitiesProps {
  handleSelectActivity: (param: any) => void;
  setActivitiesModal: (i: boolean) => void;
}

const CompletedActivities: React.FC<CompletedActivitiesProps> = ({
  handleSelectActivity,
  setActivitiesModal,
}) => {
  const { activities } = ProfileState();

  let completed = activities
    ?.filter((i: any) => i.state === "revision" || i.state === "completed")
    .slice(0, 3);

  return (
    <Card title="Realizados - top 3" height="" className="flex-1">
      {completed.length > 0 && (
        <div>
          {completed.map((i: any) => (
            <div
              key={i._id}
              onClick={() => handleSelectActivity(i)}
              className="w-full bg-red shadow-1 mb-2 flex align-items-center justify-content-between p-2 cursor-pointer"
            >
              <p className="ready_task m-0 text-overflow-ellipsis w-10 white-space-nowrap overflow-hidden">
                {i.description}
              </p>
              <p
                className={`${checkColor(
                  Math.floor(getEficiencia([i]))
                )} bg-green-400 shadow-2 p-2 border-round-md`}
              >
                {Math.floor(getEficiencia([i]))}
              </p>
            </div>
          ))}
        </div>
      )}

      <a
        onClick={() => setActivitiesModal(true)}
        className="text-center w-full block underline cursor-pointer text-xs"
      >
        Ver todos
      </a>
    </Card>
  );
};

export default CompletedActivities;
