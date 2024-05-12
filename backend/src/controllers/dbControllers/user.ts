import { prisma } from './prismaClient';

export function addUserToDB(login: string, password: string) {
  return prisma.user.create({
    data: {
      login: login,
      password: password,
    },
  });
}

export function countUserByLoginInDB(login: string) {
  return prisma.user.count({
    where: {
      login: login,
    },
  });
}

export function countUserByIdInDB(userId: string) {
  return prisma.user.count({
    where: {
      id: userId,
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
