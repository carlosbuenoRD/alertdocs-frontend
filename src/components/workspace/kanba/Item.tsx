import React, { useState } from 'react'
import { useAppSelector } from '@/redux/store'
import ActivityModal from '@/components/activity/ActivityModal'

// Components
// import ActivityModal from "../activity/ActivityModal";
// import { useAppSelector, useAppDispatch } from "@/app/store";
// import {
//   setActivity,
//   fetchDocumentActivities,
// } from "@/features/activity/activitySlice";

function Item(props: any) {
  // const dispatch = useAppDispatch();

  const [activityModal, setActivityModal] = useState<boolean>(false)
  const { user } = useAppSelector((state) => state.auth)

  const handleOpenActivity = () => {
    // dispatch(setActivity(props));
    setActivityModal(true)
  }

  return (
    <>
      <li
        className='card shadow-3 cursor-pointer relative'
        onClick={handleOpenActivity}
      >
        <div
          className={`absolute left-50 text-center w-2rem h-2rem border-circle grid justify-content-center align-items-center ${
            user?._id === props.usersId?._id
              ? 'greenGlow text-gray '
              : 'gray text-white '
          }`}
          style={{ top: -5 }}
        >
          {props.step}
        </div>
        <h6 className='m-0 mb-1 text-sm'>{props.usersId?.name}</h6>
        <hr className='my-2' />
        <div>
          {/* <label className="mb-1 text-xs">Descripcion</label> */}
          <p className='mt-2 text-sm'>
            {props.description || 'Revisar las opciones de compra y venta'}
          </p>
        </div>
      </li>

      {activityModal && (
        <ActivityModal
          visible={activityModal}
          activity={props}
          onHide={() => {
            setActivityModal(false)
            // dispatch(fetchDocumentActivities(props.documentId));
          }}
        />
      )}
    </>
  )
}

export default Item
