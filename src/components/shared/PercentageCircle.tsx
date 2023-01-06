import React from 'react'

function PercentageCircle(props: Props) {
  let result = 50

  return (
    <div className='grid-center'>
      <div
        className={`c100 p${Math.round(result / 2) || 0} ${
          props.color
        } cursor-pointer m-0`}
        style={{ fontSize: props.size ? `${props.size}px` : '220px' }}
        // onClick={() => !props.user && navigate(`/direcciones/${props.area}`)}
      >
        <span>{Math.round(result) || props.value || 0}%</span>
        <div className='slice'>
          <div className='bar'></div>
          <div className='fill'></div>
        </div>
      </div>
      <h6 className='text-center'>{props.title}</h6>
    </div>
  )
}

interface Props {
  title?: string
  color?: string
  value?: number
  size?: number
  area?: string
  user?: string
}

export default PercentageCircle
