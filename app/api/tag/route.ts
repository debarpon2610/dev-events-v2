import  prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const data = await req.formData();
    let eventData: Record<string, string> = {};
    try{
        eventData=Object.fromEntries(data.entries()) as Record<string, string>;
    }catch(e){
       const errorMsg = e instanceof Error ? e.message : 'Unknown form data error';
        return NextResponse.json({message:'Invalid form data', error: errorMsg}, {status: 400});
    }
    const name=eventData.name
    let tag
    try{
        tag=await prisma.tags.create({data:{name:name}})
    }catch(e){
        const errorMsg = e instanceof Error ? e.message : 'Unknown database error';
        return NextResponse.json({message:'Failed to create tag', error: errorMsg}, {status: 500});
    }
    return NextResponse.json({message:'Tag created successfully', tag}, {status: 201});
}

export async function GET(){

    const tags=await prisma.tags.findMany()
    return NextResponse.json({message:'GET request received at /api/tag', tags}, {status: 200});



}

