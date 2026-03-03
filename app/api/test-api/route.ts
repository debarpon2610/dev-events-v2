import { prismaExtend } from "@/lib/prisma";
import {Mode, PrismaClient} from '@/generated/prisma/client'
import { NextResponse } from "next/server";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";


export async function POST(req: Request) {
        
    try{

        const reqData = await req.formData();
        let eventData: Record<string, string> = {};
        try{
            eventData=Object.fromEntries(reqData.entries()) as Record<string, string>;
        }catch(e){
            const errorMsg = e instanceof Error ? e.message : 'Unknown form data error';
            return NextResponse.json({message:'Invalid form data', error: errorMsg}, {status: 400});
        }

        if (reqData && eventData && eventData.dev===process.env.DEV_KEY){
            const pool=new Pool({connectionString: process.env.DATABASE_URL})
            const adapter = new PrismaPg(pool);
            const client=new PrismaClient({adapter})



            const data={
                title:'Test Event 1',
                slug:'test-event-manual-slug',
                venue:'Test Venue',
                location:'Test Location',
                date:new Date(2026,2,15,18,0),
                mode: Mode.OFFLINE,
                agendas:['Agenda 1', 'Agenda 2'],
                audience:'Test Audience',
                organizers:'Prisma Fuck you',
                tags: {
                    connectOrCreate: [
                        {where: {name: 'Security'}, create: {name: 'Security'}},
                        {where: {name: 'General Ragebait'}, create: {name: 'General Ragebait'}}
                    ]
                }   
            }

            const event = await client.event.create({
                data
            })
            console.log(event)
            return NextResponse.json({message:"THIS WORKS", event})
        }else{
            return NextResponse.json({message:"Unauthorised developer"}, {status:401})
        }

        
}catch(error:any){
    console.error(error)
    return NextResponse.json({message:"Server side error", errorMsg:error.message}, {status:500})
}
}

