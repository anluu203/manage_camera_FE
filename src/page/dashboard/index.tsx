import React from 'react'
import EventChart from '@/component/chart/EventChart'
import TotalChart from '@/component/chart/TotalChart';
const DashBoard = () => {
  return (
    <div className='flex flex-col lg:flex-row lg:justify-between gap-4 '>
        <div className="w-full md:w-[600px] border rounded-xl shadow-lg p-3 bg-white">
          <EventChart/>
        </div>
        <div className="w-full md:w-[300px] border rounded-xl shadow-lg p-3 bg-white">
          <TotalChart/>
        </div>

    </div>
  )
}

export default DashBoard;
