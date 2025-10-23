import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient({
  log: ["error", "warn", "query"], // Para debugging
});

export default prisma;