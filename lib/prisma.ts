import { Mode, PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { returnTags, parseToDateTime, slugGen } from "./methods";


const pool=new Pool({connectionString: process.env.DATABASE_URL})
const adapter = new PrismaPg(pool);
// Step 1: Define the singleton function
const prismaClientSingleton = () => {
  const ExtendedClient = new PrismaClient({ adapter }).$extends({
    query: {
      event: {
        async create({ model, args, query }: any) {

          const generatedSlug = slugGen(args.data.title);
          const dateTime = parseToDateTime(args.data.date, args.data.time);
          const tagsObj = await returnTags(args.data.tags);

          const { tags, date, time, ...newData } = args.data
          newData.slug=generatedSlug;
          newData.date=dateTime;
          
          const simplify=tagsObj.map((tag:{name:string})=>({where:tag, create:tag}))
          newData.tags={connectOrCreate:simplify}

          //DRY TESTS:
          /*console.log(typeof newData.mode)
          console.log('Data being sent to Prisma:', newData);
          console.log('going to query successfully. No error before this')*/
          
          const results= await query({ data: newData , include:{tags:true}})
          return results
        }
      },
    }
  });
  return ExtendedClient;
};

// Step 2: Tell TypeScript about the global variable
declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}
// TypeScript now knows: globalThis.prisma exists and has this type!

// Step 3: Implement the singleton pattern
const prismaExtend =
  globalThis.prisma ?? // If it exists, reuse it
  prismaClientSingleton(); // Otherwise, create new instance

// Step 4: Store it in development (hot-reload safe)
if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prismaExtend;
}

export { prismaExtend }



