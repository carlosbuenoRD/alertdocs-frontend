import React, { useState, useEffect, memo } from 'react'

import {
  getResultByArea,
  getResultByUser,
  getResultByDepartment,
  getResultByDireccion,
} from '@/services/result'
import { useNavigate } from 'react-router-dom'
import { getUserEficiencia } from '@/utils/formula'
import { notifySocket } from '@/sockets'

const PercentageCircle = memo(function PercentageCircle(props: Props) {
  const navigate = useNavigate()
  const [result, setResult] = useState<any>(0)

  const getByArea = async () => setResult(await getResultByArea(props.area))
  const getByDireccion = async () =>
    setResult(await getResultByDireccion(props.area))
  const getByDepartment = async () =>
    setResult(await getResultByDepartment(props.area))
  const getByUser = async () =>
    setResult(await getUserEficiencia(props.user || ''))

  useEffect(() => {
    handleGetResult()
  }, [props.section, props.area, props.user])

  useEffect(() => {
    notifySocket.on('loaded data', () => handleGetResult())
  }, [])

  const handleGetResult = () => {
    if (!props.value && props.area && props.section) {
      if (props.section === 'area') getByArea()
      if (props.section === 'direcciones') getByDireccion()
      if (props.section === 'department') getByDepartment()
    }
    props.user && getByUser()
  }

  return (
    <div className='grid-center'>
      <div
        className={`c100 p${
          Math.floor(result / 2) || Math.floor((props.value || 0) / 2) || 0
        } ${props.color} cursor-pointer m-0`}
        style={{ fontSize: props.size ? `${props.size}px` : '220px' }}
        onClick={() =>
          !props.user &&
          !props.notClick &&
          navigate(`/${props.section || 'area'}/${props.area}`)
        }
      >
        <span>{Math.round(result) || Math.round(props.value || 0) || 0}%</span>
        <div className='slice'>
          <div className='bar'></div>
          <div className='fill'></div>
        </div>
      </div>
      {props.title && <h6 className='text-center'>{props.title}</h6>}
    </div>
  )
})

interface Props {
  title?: string
  color?: string
  size?: number
  area?: string
  user?: string
  section?: string
  notClick?: boolean
  value?: number
}

export default PercentageCircle
