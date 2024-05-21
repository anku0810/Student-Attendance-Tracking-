"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { GraduationCap, Hand, LayoutIcon, Settings } from "lucide-react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
function SideNav() {
  const { user } = useKindeBrowserClient();
  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutIcon, // importing the icons from lucide react icons
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Students",
      icon: GraduationCap,
      path: "/dashboard/students",
    },
    {
      id: 3,
      name: "Attendance",
      icon: Hand,
      path: "/dashboard/attendance",
    },
    {
      id: 4,
      name: "Settings",
      icon: Settings,
      path: "/dashboard/settings",
    },
  ];

  const path=usePathname();
  useEffect(()=>{
    console.log(path);
  },[path])
  return (
    <div className="border shadow-md h-screen p-2">
      <Image src={"/logo.png"} width={250} height={30} alt="logo" />

      <hr className="my-5"></hr>
      {menuList.map((menu, index) => (
        <Link href={menu.path}>
          <h2 className={`flex items-center gap-3 text-md p-4 text-slate-900 hover:bg-emerald-500 hover:text-white cursor-pointer rounded-r-lg my-2 ${path==menu.path && 'bg-purple-500 text-white'}`}>
            <menu.icon />
            {menu.name}
          </h2>
        </Link>
      ))}
      <div className="flex gap-2 items-center bottom-3 fixed p-2 ">
        <Image
          src={user?.picture}
          width={35}
          height={35}
          alt="user"
          className="rounded-full"
        />
        <div>
          <h2 className="text-sm font-bold">
            {" "}
            {user?.given_name} {user?.family_name}
          </h2>
          <h2 className="text-xs text-slate-400"> {user?.email}</h2>
        </div>
      </div>
    </div>
  );
}

export default SideNav;
