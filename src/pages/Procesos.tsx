import AreasHeader from '@/components/areas/AreasHeader'
import PieChart from '@/components/charts/PieChart'
import Card from '@/components/shared/Card'
import React from 'react'

function Procesos() {
  return (
    <div className='relative'>
      <AreasHeader />
      <div className='pt-7 grid-3-1'>
        <Card title='Lista de procesos' height=''></Card>
        <Card title='Mas usados' height=''>
          <PieChart />
        </Card>
      </div>
    </div>
  )
}

export default Procesos
