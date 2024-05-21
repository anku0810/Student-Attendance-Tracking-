"use client"
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import GlobalApi from "@/app/_services/GlobalApi";
import { toast } from "sonner";
import { LoaderIcon } from "lucide-react";
function AddNewStudent({refreshData}) {
    const[open,setOpen]=useState(false);
    const[classes,setClasses]=useState([]);
    const[loading,setLoading]=useState(false);
    const {
      register,
      handleSubmit,
      watch,
      reset,
      formState: { errors },
    } = useForm()

    useEffect(()=>{
      GetAllClassList();
    },[])

    const GetAllClassList=()=>{
      GlobalApi.GetAllClass().then(resp=>{
        setClasses(resp.data);
      })
    }
    const onSubmit=(data)=>{
      setLoading(true) 
      GlobalApi.CreatenewStudent(data).then(resp=>{
        console.log("--",resp);
        if(resp.data)
          {
            reset();
            refreshData();
            setOpen(false);
            toast('New Student Added !!')
          }
          setLoading(false);
      })
    }
  return (
    <div>
      <Button onClick={()=>setOpen(true)}>Add New Student</Button>
      <Dialog open={open}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
            <DialogDescription>
              <form onSubmit={handleSubmit(onSubmit)}>
              <div className="py-3">
                <label className="p-1 ">Full Name</label>
                <Input placeholder="Ex: Steve Jobs" {...register('name',{required:true})}/>
              </div>
              <div className="flex flex-col py-2" >
                <label>Select Class </label>
                  <select className="p-3 border rounded-lg" {...register('class',{required:true})}>
                    {classes.map((item,index)=>(
                       <option key={index} value={item.class}>{item.class}</option>
                    ))}
                  </select>
              </div>
              <div className="py-3">
                <label className="p-1 " >Contact Number</label>
                <Input type="number" placeholder="Ex: +91 7377372728" {...register('contact',{required:true})}/>
              </div>
              <div className="py-3">
                <label className="p-1 ">Address</label>
                <Input placeholder="Ex: #42/2,Delhi" {...register('address',{required:true})}/>
              </div>
              <div className=" flex flex-col py-3">
                <label className="p-1 ">Blood Group</label>
                <select className="p-3 border rounded-lg" {...register('blood',{required:true})}>
                    <option value={'O+ve'}>O+ve</option>
                    <option value={'O-ve'}>O-ve</option>
                    <option value={'A+'}>A+</option>
                    <option value={'A-'}>A-</option>
                    <option value={'B+'}>B+</option>
                    <option value={'AB+'}>AB+</option>
                    <option value={'AB-'}>AB-</option>
                  </select>
              </div>
              <div className="flex gap-3 items-center justify-end mt-5 ">
                <Button type="button" 
                onClick={()=>setOpen(false)} variant="ghost"> Cancel</Button>
                <Button  type="submit"
                disable={loading}>
                  {loading? <LoaderIcon className="animated-spin" />:
                  'Save'}</Button>
              </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewStudent;
