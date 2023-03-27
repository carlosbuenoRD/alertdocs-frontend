import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '@/redux/store'
import { fetchDocumentsByArea } from '@/redux/reducers/documents'
import {
  getUsersByArea,
  getUsersByDepartment,
  getUsersByDireccion,
} from '@/redux/reducers/users'
import { getArea } from '@/redux/reducers/area'

// Components
import General from '@/components/area/General'
import { notifySocket } from '@/sockets'

function Area() {
  const dispatch = useAppDispatch()
  const location = useLocation()

  const { area } = useAppSelector((state) => state.area)
  const areaId = location.pathname.split('/')[2]
  const section = location.pathname.split('/')[1]

  useEffect(() => {
    dispatch(getArea(areaId))
    dispatch(fetchDocumentsByArea(areaId))

    dispatch(getUsersByArea(areaId))
  }, [section, areaId, location.pathname])

  useEffect(() => {
    notifySocket.on('created document', () => {
      dispatch(fetchDocumentsByArea(areaId))
    })
  }, [])

  return (
    <>
      <General eficiencia={areaId} title={area?.name} />
    </>
  )
}

export default Area
