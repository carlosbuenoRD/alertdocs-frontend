import { useAppSelector } from "@/redux/store";
import React from "react";

// Components
import ParticipantCard from "./ParticipantCard";

function ParticipantSection() {
  const { document } = useAppSelector((state) => state.document);

  return (
    <div
      className="grid-col-3 scroll-hidden"
      style={{
        height: "500px",
        overflow: "scroll",
      }}
    >
      {document.participants.map((p: any) => (
        <ParticipantCard user={p} />
      ))}
    </div>
  );
}

export default ParticipantSection;
