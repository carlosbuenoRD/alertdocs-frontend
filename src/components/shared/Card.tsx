import React, { ReactNode, ReactElement } from "react";

function Card(props: Props) {
  console.log(props.headerButtons && props.headerButtons);

  return (
    <div
      className={`card w-full h-${props.height} shadow-1  ${
        props.hover
          ? "hover:shadow-5 transition-all transition-duration-300 cursor-pointer"
          : ""
      } ${props.className ? props.className : ""}`}
      onClick={props.onClick}
    >
      {props.title && (
        <>
          <div className="flex justify-content-between align-items-center">
            <h6 className="uppercase text-sm text-overflow-ellipsis white-space-nowrap overflow-hidden w-full mb-0">
              {props.title}
            </h6>
            {props.headerButtons && props.headerButtons}
          </div>
          <hr />
        </>
      )}
      {props.children}
    </div>
  );
}

interface Props {
  title?: string;
  height?: string;
  hover?: boolean;
  className?: string;
  children?: any;
  headerButtons?: ReactElement;
  onClick?: any;
}

export default Card;
