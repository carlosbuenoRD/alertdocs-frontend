import React, { useState } from "react";

// REDUX
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setActivity } from "@/redux/reducers/activity";

// Components
import ActivityModal from "@/components/activity/ActivityModal";

function Item(props: any) {
  const dispatch = useAppDispatch();

  const [activityModal, setActivityModal] = useState<boolean>(false);
  const { user } = useAppSelector((state) => state.auth);

  console.log(props, "ACTIVI PROPD");

  const handleOpenActivity = () => {
    dispatch(setActivity(props));
    setActivityModal(true);
  };

  const setColor = (state: string): string => {
    if (state === "pending") return "bg-teal-200";
    if (state === "ready") return "bg-green-100";
    if (state === "progress") return "bg-indigo-100";
    if (state === "revision") return "bg-yellow-300";
    if (state === "completed") return "bg-green-300";
    return "";
  };

  return (
    <>
      <li
        className={`card shadow-3 cursor-pointer relative ${setColor(
          props.state
        )}`}
        onClick={handleOpenActivity}
      >
        <div
          className={`absolute left-50 text-center w-2rem h-2rem border-circle grid justify-content-center align-items-center ${
            user?._id === props.usersId?._id
              ? "greenGlow text-gray "
              : "gray text-white "
          }`}
          style={{ top: -5 }}
        >
          {props.step}
        </div>
        <h6 className="m-0 mb-1 text-sm">{props.usersId?.name}</h6>
        <hr className="my-2" />
        <div>
          {/* <label className="mb-1 text-xs">Descripcion</label> */}
          <p className="mt-2 text-sm">
            {props.description || "Revisar las opciones de compra y venta"}
          </p>
        </div>
      </li>

      {activityModal && (
        <ActivityModal
          noDocument
          visible={activityModal}
          onHide={() => setActivityModal(false)}
        />
      )}
    </>
  );
}

export default Item;
