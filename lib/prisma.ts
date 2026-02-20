import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";


const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaPg(pool);
// Step 1: Define the singleton function
const prismaClientSingleton = () => {
  const ExtendedClient = new PrismaClient({adapter}).$extends({
    query: {
      $allModels: {
        async create({ model, args, query }) {
          return query(args);
        },
      },
    },
  });
  return ExtendedClient;
};

// Step 2: Tell TypeScript about the global variable
declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}
// TypeScript now knows: globalThis.prisma exists and has this type!

// Step 3: Implement the singleton pattern
export const prisma =
  globalThis.prisma ?? // If it exists, reuse it
  prismaClientSingleton(); // Otherwise, create new instance

// Step 4: Store it in development (hot-reload safe)
if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}