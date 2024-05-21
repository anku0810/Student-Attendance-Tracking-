import { db } from "@/utils";
import { ATTENDANCE, STUDENTS } from "@/utils/schema";
import { and, eq, desc } from "drizzle-orm"; // Added desc import
import { NextResponse } from "next/server";

export async function GET(req) {
    const searchParams = req.nextUrl.searchParams;
    const date = searchParams.get('date');
    const grade = searchParams.get('class');

    const result = await db.select({
        day: ATTENDANCE.day,
        presentCount: sql`count(${ATTENDANCE.day})`
    })
        .from(ATTENDANCE)
        .leftJoin(STUDENTS, and(eq(ATTENDANCE.studentId, STUDENTS.id), eq(ATTENDANCE.date, date)))
        .groupBy(ATTENDANCE.day)
        .where(eq(STUDENTS.class, grade))
        .orderBy(desc(ATTENDANCE.day))
        .limit(7);

    return NextResponse.json(result);
}