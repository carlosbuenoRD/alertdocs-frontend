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

  const handleOpenActivity = () => {
    dispatch(setActivity(props));
    setActivityModal(true);
  };

  return (
    <>
      <li
        className="card shadow-3 cursor-pointer relative"
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