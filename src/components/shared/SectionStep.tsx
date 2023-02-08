import React from "react";

function SectionStep({ number: number }: any) {
  return (
    <div
      className="bg-blue-400 absolute  text-white w-2rem h-2rem border-circle grid-center"
      style={{ left: "-12px", top: "-5px" }}
    >
      {number}
    </div>
  );
}

export default SectionStep;
