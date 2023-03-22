import { useState, useEffect } from 'react'

// Components
import { Dialog } from 'primereact/dialog'

import { useAppDispatch, useAppSelector } from '@/redux/store'
import WorkSpaceModal from '../workspace/WorkSpaceModal'
import ActivityHeader from './ActivityHeader'
import SectionPicker from './SectionPicker'
import { fetchActivityById } from '@/redux/reducers/activity'
import { notifySocket } from '@/sockets'

function ActivityModal(props: any) {
  const dispatch = useAppDispatch()
  const [workSpace, setWorkSpace] = useState(false)

  const [activeIndex, setActiveIndex] = useState(0)
  const { activity } = useAppSelector((state) => state.activity)

  useEffect(() => {
    if (props._id) {
      dispatch(fetchActivityById(props._id))
    }
  }, [props._id])

  useEffect(() => {
    notifySocket.on('devolucion ended', () =>
      dispatch(fetchActivityById(props._id))
    )
  }, [])

  return (
    <Dialog
      header={`#${activity?.step} ---  ${activity?.usersId?.name} ---  ${activity?.description}`}
      headerStyle={{ fontSize: '4rem' }}
      visible={props.visible}
      contentClassName='pb-3'
      onHide={props.onHide}
      style={{ width: '70vw' }}
      footer={
        !props.noDocument ? (
          <div className='flex justify-content-center w-full border-top-1 border-100'>
            <button
              onClick={() => setWorkSpace(true)}
              className='p-button w-full flex justify-content-center'
            >
              Ver documento
            </button>
          </div>
        ) : null
      }
    >
      <div className='card shadow-1 mb-2'>
        <ActivityHeader
          active={activeIndex}
          setActive={setActiveIndex}
          activity={activity}
        />
      </div>

      <div className='card shadow-1 mb-0'>
        <SectionPicker active={activeIndex} />
      </div>
      {workSpace && (
        <WorkSpaceModal
          visible={workSpace}
          onHide={() => setWorkSpace(false)}
          fromActivity={activity.documentId}
        />
      )}
    </Dialog>
  )
}

export default ActivityModal
