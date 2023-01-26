import React from "react";

function Steps(props: any) {
  return (
    <div className="flex justify-content-center">
      <div className={`${!props.color || props.color === 'green' ? 'greenGlow' : 'gray'} w-1rem h-1rem border-circle`}></div>
      <div className={`${props.color === 'yellow' ? 'yellowGlow' : 'gray'}  w-1rem h-1rem border-circle mx-1`}></div>
      <div className={`${props.color === 'red' ? 'redGlow' : 'gray'}  w-1rem h-1rem border-circle`}></div>
    </div>
  );
}

export default Steps;
