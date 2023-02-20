import React from "react";
import FlujosTable from "./FlujoTable";
import ParticipantsSection from "./ParticipantsSection";

// Components

function SectionPicker(props: any) {
  return (
    <div>
      {props.active === 0 && (
        <FlujosTable
          edit={props.edit}
          handleChange={props.onChangeActivity}
          activities={props.activities}
        />
      )}
      {props.active === 1 && <ParticipantsSection />}
      {/* {props.active === 2 && <FilesSection />}
      {props.active === 3 && <DevolucionSection />} */}
    </div>
  );
}

export default SectionPicker;
