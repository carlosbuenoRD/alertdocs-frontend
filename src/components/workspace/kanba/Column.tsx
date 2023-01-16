import React from "react";

// Components
import Item from "./Item";

function Column(props: any) {
  return (
    <div className="col-3 card">
      <h6 className="border-bottom-1 text-center pb-2 mb-2 uppercase">
        {props.header}
      </h6>
      <ul className="characters">
        {props?.items?.map((item: any, index: number) => {
          return <Item key={item._id} {...item} index={index} />;
        })}
      </ul>
    </div>
  );
}

export default Column;
