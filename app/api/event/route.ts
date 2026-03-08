import {v2 as cloudinary} from 'cloudinary';

import { NextRequest, NextResponse } from 'next/server';
import { prismaExtend } from '@/lib/prisma';
import {parseTags, parseAgenda} from '@/lib/methods';

export async function DELETE() {
    const deleted = await prismaExtend.event.deleteMany({});
    return NextResponse.json({message: `Deleted ${deleted.count} events`}, {status: 200});
}

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

        let file=eventData.image as unknown as File;

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
                if (error) 
                    reject(error);
                resolve(result)
            }).end(buffer);
        });

        eventData.image=(uploadResult as {secure_url:string}).secure_url;


        const {tags, agendas, ...eventDataWithoutTagsAndAgendas} = eventData;
        

        const createdEvent = await prismaExtend.event.create({data:{...eventDataWithoutTagsAndAgendas, tags:parsedTags, agendas:parsedAgendas} }as any);
        return NextResponse.json({message:'Event created successfully', event:createdEvent}, {status: 201});
    
    } catch (e: unknown) {
        const errorMsg = e instanceof Error ? e.message : 'Unknown error';
        return NextResponse.json({message:'Something went wrong', error: errorMsg}, {status: 500});
    }
}