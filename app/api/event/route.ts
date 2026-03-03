import { NextRequest, NextResponse } from 'next/server';
import { prismaExtend } from '@/lib/prisma';
import {parseTags, parseAgenda} from '@/lib/methods';
import {Mode} from '@/generated/prisma/client';


export async function POST(req: NextRequest) {
    try {
        const data = await req.formData();
        let eventData: Record<string, string> = {};
        try{
            eventData=Object.fromEntries(data.entries()) as Record<string, string>;
        }catch(e){
            const errorMsg = e instanceof Error ? e.message : 'Unknown form data error';
            return NextResponse.json({message:'Invalid form data', error: errorMsg}, {status: 400});
        }
        

        let parsedTags: string[] = [];
        let parsedAgendas: string[] = [];
        if (eventData.tags) {
            parsedTags=parseTags(eventData.tags);
        }
        if (eventData.agendas) {
            parsedAgendas=parseAgenda(eventData.agendas);
        }

        const {tags, agendas, ...eventDataWithoutTagsAndAgendas} = eventData;
        

        const createdEvent = await prismaExtend.event.create({data:{...eventDataWithoutTagsAndAgendas, tags:parsedTags, agendas:parsedAgendas} }as any);
        return NextResponse.json({message:'Event created successfully', event:createdEvent}, {status: 201});
    
    } catch (e: unknown) {
        const errorMsg = e instanceof Error ? e.message : 'Unknown error';
        return NextResponse.json({message:'Something went wrong', error: errorMsg}, {status: 500});
    }
}