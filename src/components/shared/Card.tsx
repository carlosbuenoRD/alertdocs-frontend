import React from "react";

function Card(props: Props) {
  return (
    <div
      className={`card w-full h-${props.height} shadow-1 ${
        props.hover
          ? "hover:shadow-5 transition-all transition-duration-300 cursor-pointer"
          : ""
      } ${props.className ? props.className : ""}`}
      onClick={props.onClick}
    >
      <h6 className="uppercase text-sm">{props.title}</h6>
      <hr />
      {props.children}
    </div>
  );
}

interface Props {
  title: string;
  height: string;
  hover?: boolean;
  className?: string;
  children?: any;
  onClick?: any;
}

export default Card;
