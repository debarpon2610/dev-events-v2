import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { returnTags, parseToDateTime, slugGen } from "./methods";


/*
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
// Step 1: Define the singleton function
const prismaClientSingleton = () => {
  const ExtendedClient = new PrismaClient({ adapter }).$extends({
    query: {
      event: {
        async create({ model, args, query }: any) {

          const generatedSlug = slugGen(args.data.title);
          const dateTime = parseToDateTime(args.data.date, args.data.time);
          const tagObjs=await returnTags(args.data.tags)



          const {tags, date, time, ...newData } = args.data
          newData.slug=generatedSlug;
          newData.date=dateTime;
          newData.tags=tagObjs

          console.log(newData)
          console.log('going to query successfully. No error before this')
          return query(...args, { data: newData })
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
*/


//CLEAN SLATE
const pool = new PrismaPg({ connectionString: process.env.DATABASE_URL! , idleTimeoutMillis: 60000,})
const prisma = new PrismaClient({ adapter: pool })

const globalForPrisma = global as unknown as { prisma: typeof prisma }

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma