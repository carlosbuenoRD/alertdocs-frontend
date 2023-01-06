import React from 'react'

function Card(props: any) {
  return (
    <div className='card w-full h-24rem shadow-1'>
      <h6 className='uppercase text-sm'>{props.title}</h6>
      <hr />
      {props.children}
    </div>
  )
}

export default Card
