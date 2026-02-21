
async function returnTags(tags:string[]){
    const { prismaExtend } = await import("./prisma");
    console.log('got to returnTags function')
    const tagObjs = [];
    for (let tag of tags){
        let tagObj=await prismaExtend.tags.findUnique({where:{name:tag}})
        if (tagObj===null){
            tagObj=await prismaExtend.tags.create({data:{name:tag}})
            console.log(`Created new tag: ${tagObj}`)
        }
        tagObjs.push(tagObj);
    }
    console.log('Returning tag objects:', tagObjs);
    return tagObjs;
}

function parseTags(tagsStr:string):string[]{
                
                const tags=JSON.parse(tagsStr);
                return tags as string[];
}

function parseAgenda(agendasStr:string):string[]{
                
                const agendas=JSON.parse(agendasStr);
                return agendas as string[];
}

function slugGen(title:string):string{
                const slug= title
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, '') // Remove non-alphanumeric, non-space, non-hyphen characters
                .replace(/\s+/g, '-') // Replace spaces with hyphens
                .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
                .replace(/^-+|-+$/g, ''); // Remove hyphens at start and end
                
                if (!slug)
                    throw new Error("Invalid event title for slug generation!");
                
                return slug;
                
}

// Convert dd:mm:yy and hh:mm strings to DateTime object
           function parseToDateTime(dateStr: string, timeStr: string): Date {
                const [day, month, year] = dateStr.split('/').map(Number);
                const [hours, minutes] = timeStr.split(':').map(Number);
                
                
                const date=new Date(year, month - 1, day, hours, minutes)
                console.log('Parsed DateTime:', date);
                return date;
}

// Convert DateTime object to formatted string "date month, year | hh:mm am/pm"
            function formatDateTime(date: Date): string {
                const months = ['January', 'February', 'March', 'April', 'May', 'June','July', 'August', 'September', 'October', 'November', 'December'];
                
                const day = date.getDate();
                const month = months[date.getMonth()];
                const year = date.getFullYear();
                
                let hours = date.getHours();
                const mins = date.getMinutes().toString().padStart(2, '0');
                const ampm = hours >= 12 ? 'pm' : 'am';
                hours = hours % 12 || 12; // Convert to 12-hour format
                
                const dateFormatted = `${day} ${month}, ${year}`;
                const timeFormatted = `${hours.toString().padStart(2, '0')}:${mins} ${ampm}`;
                
                return `${dateFormatted} | ${timeFormatted}`;
            }


export {returnTags, parseTags, parseAgenda, slugGen, parseToDateTime, formatDateTime}


