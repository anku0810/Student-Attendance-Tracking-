"use client"
import { useTheme } from 'next-themes'
import React, { useEffect, useState } from 'react'
import MonthSelection from '../_components/MonthSelection'
import ClassSelect from '../_components/ClassSelect'
import GlobalApi from '../_services/GlobalApi'
import moment from 'moment'
import StatusList from './_components/StatusList'
import Barchart from './_components/Barchart'

function Dashboard() {
    const {setTheme}= useTheme()
    const[selectedMonth,setSelectedMonth]=useState();
    const[selectedClass,setSelectedClass]=useState();
    const [attendanceList,setAttendanceList]=useState();
    const[TotalPresentData,setTotalPresentData]=useState();

    useEffect(()=>{
        setTheme('light');
        GetTotalPresentCountByDay();
        getStudentAttendance();

          // used to change the background theme
    },[selectedMonth || selectedClass])


    const getStudentAttendance=()=>{
      GlobalApi.GetAttendanceList(selectedClass,moment(selectedMonth).format('MM/yyyy'))
      .then(resp=>{
       setAttendanceList(resp.data);
      })
    }

    const GetTotalPresentCountByDay=()=>{
      GlobalApi.TotalPresentCountByDay(moment(selectedMonth).format('MM/yyyy'),selectedClass)
      .then(resp=>{
        setTotalPresentData(resp.data);
      })
    }
  return (
  
    <div className='p-10'>
      <div className='flex items-center justify-between'>
      <h2 className='font-bold text-2xl'>Dashboard</h2>
      <div className='flex items-center gap-4'>
        <MonthSelection selectedMonth={setSelectedMonth}/>
        <ClassSelect selectedClass={(v)=>setSelectedClass(v)}/>
      </div>
      </div>
      <StatusList  attendanceList={attendanceList} />
      <div className='grid grid-cols-1 md:grid-cols-3'>
      <div className='md:col-span-2'>
        <Barchart  attendanceList={attendanceList}
        TotalPresentData={TotalPresentData}/>
      </div>
      </div>
    </div>
  )
}

export default Dashboard
