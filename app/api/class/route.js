import {db} from"@/utils";
import { CLASS } from "@/utils/schema";
import { NextResponse } from "next/server";
export async function GET(req){
    const result=await db.select().from(CLASS);
    return NextResponse.json(result);  //api creation 

}