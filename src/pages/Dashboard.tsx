import React from 'react'

// Components
import LineChart from '@/components/charts/LineChart'
import Card from '@/components/shared/Card'
import PercentageCard from '@/components/dashboard/PercentageCard'
import PercentageCircle from '@/components/shared/PercentageCircle'
import Powerbi from '@/components/dashboard/Powerbi'

function Dashboard() {
  return (
    <div>
      <div className='grid grid-col-3'>
        <PercentageCard color='blue' />
        <PercentageCard color='yellow' />
        <PercentageCard color='green' />
      </div>

      <div className='grid-3-1 mt-5'>
        <Card title='Ultimos 6 meses'>
          <LineChart />
        </Card>
        <Card title='Area del mes'>
          <PercentageCircle
            size={180}
            title='Viceministerio de economia y planificacion'
          />
          <a className='text-center w-full block underline cursor-pointer text-xs'>
            Ver todos
          </a>
        </Card>
      </div>

      {/* Documents Carousel */}

      {/* POWER BI */}
      <Powerbi />
    </div>
  )
}

export default Dashboard
