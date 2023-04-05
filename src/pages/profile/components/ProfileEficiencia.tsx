import React from "react";

// State
import { ProfileState } from "../context/ProfileContext";

// Components
import Card from "@/components/shared/Card";
import PercentageCircle from "@/components/shared/PercentageCircle";
import Countdown from "react-countdown";

export interface ProfileEficienciaProps {
  user: any;
  handleSelectActivity: (param: any) => void;
}

const ProfileEficiencia: React.FC<ProfileEficienciaProps> = ({
  handleSelectActivity,
  user,
}) => {
  const { activities } = ProfileState();

  let progress: any = activities?.filter((i: any) => i.state === "progress")[0];

  const toMilliseconds = (hrs: number) => hrs * 60 * 60 * 1000;

  return (
    <Card title="Eficiencia" height="fit">
      <PercentageCircle user={user?._id} size={180} />
      {progress && (
        <div className="text-center fixed z-5 w-24rem bottom-0 right-0 ">
          <div
            className="card border-2 border-blue-400"
            onClick={() => handleSelectActivity(progress)}
          >
            <h5>En proceso</h5>
            <div className="text-3xl shadow-2 p-2 border-round-sm cursor-pointer">
              <Countdown
                date={progress?.startedAt + toMilliseconds(progress?.hours)}
              />
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default ProfileEficiencia;
