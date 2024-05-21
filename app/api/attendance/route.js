import { db } from "@/utils";
import { ATTENDANCE, STUDENTS } from "@/utils/schema";
import { eq, isNull, or } from "drizzle-orm";
import { NextResponse } from "next/server";


export async function GET(req){

    const searchParams=req.nextUrl.searchParams;
    const grade= searchParams.get('class');
    const month =searchParams.get('month');

    const result = await db.select({
        name:STUDENTS.name,
        present:ATTENDANCE.present,
        day:ATTENDANCE.day,
        date:ATTENDANCE.date,
        grade:STUDENTS.class,
        studentId:STUDENTS.id,
        atttendanceId:ATTENDANCE.id
    }).from(STUDENTS)
    .leftJoin(ATTENDANCE,eq(STUDENTS.id,ATTENDANCE.studentId))
    .where(eq(STUDENTS.class,grade))
    .where(
        or(
            eq(ATTENDANCE.date,month),
            isNull(ATTENDANCE.date)   
        )
       )

    return NextResponse.json(result);
}


export async function POST(req,res){
    const data=await req.json();
    const result=await db.insert(ATTENDANCE)
    .values({
        studentId:data.studentId,
        present:data.present,
        day:data.day,
        date:data.date
    })
    return NextResponse.json(result);
}

export async function DELETE(req){
    const searchParams=req.nextUrl.searchParams;
    const studentId=searchParams.get('studentId');
    const date=searchParams.get('date');
    const day=searchParams.get('day');

    const result=await db.delete(ATTENDANCE)
    .where(
        and(
        eq(ATTENDANCE.studentId,studentId),
        eq(ATTENDANCE.day,day),
        eq(ATTENDANCE.date,date)
    )
)
    return NextResponse.json(result);
}