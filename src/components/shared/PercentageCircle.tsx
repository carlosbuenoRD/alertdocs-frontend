import React from "react";

function PercentageCircle(props: Props) {
  return (
    <div className="grid-center">
      <div
        className={`c100 p${Math.round(props.value / 2) || 0} ${
          props.color
        } cursor-pointer m-0`}
        style={{ fontSize: props.size ? `${props.size}px` : "220px" }}
        // onClick={() => !props.user && navigate(`/direcciones/${props.area}`)}
      >
        <span>{Math.round(props.value) || props.value || 0}%</span>
        <div className="slice">
          <div className="bar"></div>
          <div className="fill"></div>
        </div>
      </div>
      {props.title && <h6 className="text-center">{props.title}</h6>}
    </div>
  );
}

interface Props {
  title?: string;
  color?: string;
  value: number;
  size?: number;
  area?: string;
  user?: string;
}

export default PercentageCircle;
