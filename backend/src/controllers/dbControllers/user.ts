import { prisma } from './prismaClient';

export function addUserToDB(login: string, password: string) {
  return prisma.user.create({
    data: {
      login: login,
      password: password,
    },
  });
}

export function getUserFromDB(login: string, password: string) {
  return prisma.user.findFirst({
    where: {
      login: login,
      password: password,
    },
  });
}
