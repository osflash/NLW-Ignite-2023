import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient | undefined
}

console.log(process.env.DATABASE_URL_BACKUP)

export const prisma = globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma
