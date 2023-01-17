import React from "react";

// Components
import ParticipantCard from "./ParticipantCard";

function ParticipantSection() {
  return (
    <div className="grid-col-3">
      <ParticipantCard />
      <ParticipantCard />
      <ParticipantCard />
      <ParticipantCard />
    </div>
  );
}

export default ParticipantSection;
