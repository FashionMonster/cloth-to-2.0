import { Prisma, PrismaClient } from '@prisma/client';

//Prismaトランザクションの型定義
type PrismaTransaction = Omit<
  PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'
>;

export type { PrismaTransaction };
