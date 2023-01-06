import React from 'react'

function PercentageCard(props: any) {
  return (
    <div className='percentage_card shadow-1'>
      <div
        className={`percentage_card_bar w-3rem bg-${props.color}-300 shadow-4 border-right-1 border-200`}
      >
        <h1
          className={`percentage_card_value bg-${props.color}-100 text-600 sm:text-sm md:text-lg lg:text-2xl xl:text-4xl`}
        >
          100%
        </h1>
      </div>
      <div className='ml-2 my-2 w-full'>
        <h6 className='mb-4 border-bottom-1 border-100 pb-2 w-full uppercase text-sm'>
          Recursos Humano
        </h6>

        <div
          className='grid-col-2 grid-center card shadow-1 p-1'
          style={{ width: '60%' }}
        >
          <div className='w-full text-center p-1 border-right-1 border-100'>
            <p className='m-0 mb-1 uppercase sm:text-xs md:text-xs'>
              Completados
            </p>
            <h6 className='m-0'>16</h6>
          </div>
          <div className='w-full text-center p-1'>
            <p className='m-0 mb-1 uppercase sm:text-xs md:text-xs'>
              Retrasados
            </p>
            <h6 className='m-0'>2</h6>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PercentageCard
