import { PrismaClient } from '@prisma/client';

// Prisma Client global caching for serverless environments
const globalForPrisma = globalThis;

const prisma = globalForPrisma.prisma || new PrismaClient();
if (!globalForPrisma.prisma) globalForPrisma.prisma = prisma;

export default prisma;
