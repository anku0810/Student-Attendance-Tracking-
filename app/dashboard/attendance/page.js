"use client"
import ClassSelect from '@/app/_components/ClassSelect'
import MonthSelection from '@/app/_components/MonthSelection'
import GlobalApi from '@/app/_services/GlobalApi'
import { Button } from '@/components/ui/button'
import moment from 'moment'
import React, { useState } from 'react'
import AttendanceGrid from './_components/AttendanceGrid'

function Attendance() {

  const[selectedMonth,setSelectedMonth]=useState();
  const[selectedClass,setSelectedClass]=useState();
  const[attendanceList,setAttendanceList]=useState();

  const OnSearchHandler=()=>{
    const month=moment(selectedMonth).format('MM/YYYY');
    GlobalApi.GetAttendanceList(selectedClass,month).then(resp=>{
      setAttendanceList(resp.data);
    })

  }
  return (
    <div className='p-10'>
      <h2 className='text-2xl font-bold'>Attendance</h2>
      {/*search option*/}
      <div className='flex gap-5 my-5 shadow-sm p-5 border rounded-lg shadow-sm'>
        <div className='flex gap-2 items-center'>
        <label> Select Month:</label>
        <MonthSelection  selectedMonth={(value)=>setSelectedMonth(value)}/>
        </div>
        <div className='flex gap-2 items-center'>
        <label>Select Class:</label>
        <ClassSelect  selectedClass={(v)=>setSelectedClass(v)}/>
        </div>
        <Button 
        onClick={()=>OnSearchHandler()}>Search </Button>
      </div>
      <AttendanceGrid attendanceList={attendanceList}
      selectedMonth={selectedMonth} />
    </div>
  )
}

export default Attendance
