import React from 'react'

// Components
import AreaHeader from '@/components/area/AreaHeader'
import Card from '@/components/shared/Card'
import PercentageCircle from '@/components/shared/PercentageCircle'

function Area() {
  const newLocal =
    'card h-15rem shadow-1 hover:shadow-5 transition-all transition-duration-300'
  return (
    <div className='relative'>
      <AreaHeader />
      <div className='area_body grid-col-2'>
        <Card
          title='Documentos'
          height='h-31rem'
          className='cursor-pointer'
          hover
        >
          <div></div>
        </Card>
        <div>
          <Card
            title='Eficiencia'
            height='fit'
            className='cursor-pointer'
            hover
          >
            <div className=''>
              <PercentageCircle value={110} size={150} />
              <div className='flex-1 grid-col-3 mt-6'>
                <div className='text-center'>
                  <h4 className='mb-0'>52</h4>
                  <h6 className='uppercase text-sm mt-2'>Completados</h6>
                </div>
                <div className='text-center w-full border-x-1'>
                  <h4 className='mb-0'>13</h4>
                  <h6 className='uppercase text-sm mt-2'>Retrasados</h6>
                </div>
                <div className='text-center'>
                  <h4 className='mb-0'>2</h4>
                  <h6 className='uppercase text-sm mt-2'>Devoluciones</h6>
                </div>
              </div>
            </div>
          </Card>
          <Card
            title='Usuarios - Top 5'
            height='fit'
            className='cursor-pointer'
            hover
          >
            <ul>
              <li className='card p-2 shadow-1 flex justify-content-between align-items-center bg-blue-100 mb-2'>
                <p className='uppercase font-medium text-sm m-0'>
                  Carlos Antonio Bueno Tavares
                </p>
                <h3 className='m-0 lh-1'>178%</h3>
              </li>
              <li className='card p-2 shadow-1 flex justify-content-between align-items-center bg-blue-100 mb-2'>
                <p className='uppercase font-medium text-sm m-0'>
                  Carlos Antonio Bueno Tavares
                </p>
                <h3 className='m-0'>151%</h3>
              </li>
              <li className='card p-2 shadow-1 flex justify-content-between align-items-center bg-blue-100 mb-2'>
                <p className='uppercase font-medium text-sm m-0'>
                  Carlos Antonio Bueno Tavares
                </p>
                <h3 className='m-0'>149%</h3>
              </li>
              <li className='card p-2 shadow-1 flex justify-content-between align-items-center bg-blue-100 mb-2'>
                <p className='uppercase font-medium text-sm m-0'>
                  Carlos Antonio Bueno Tavares
                </p>
                <h3 className='m-0'>136%</h3>
              </li>
              <li className='card p-2 shadow-1 flex justify-content-between align-items-center bg-blue-100 mb-2'>
                <p className='uppercase font-medium text-sm m-0'>
                  Carlos Antonio Bueno Tavares
                </p>
                <h3 className='m-0'>129%</h3>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Area
