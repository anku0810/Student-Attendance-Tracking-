"use client"
import React, { useEffect, useState } from "react";
import GlobalApi from "../_services/GlobalApi";

function ClassSelect({selectedClass}) {
    const[classes,setClasses]=useState([]);

    useEffect(()=>{
        GetAllClassList();
      },[])

      const GetAllClassList=()=>{
        GlobalApi.GetAllClass().then(resp=>{
          setClasses(resp.data);
        })
      }
  return (
    <div>
      <select
        className="p-2 border rounded-lg"
        onChange={(e)=>selectedClass(e.target.value)}
      >
        {classes.map((item, index) => (
          <option key={index} value={item.class}>
            {item.class}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ClassSelect;
