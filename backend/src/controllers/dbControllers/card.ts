import { prisma } from './prismaClient';

export function addCardToDB(card_id: string, user_id: string) {
  return prisma.card.create({
    data: {
      card_id: card_id,
      user_id: user_id,
    },
  });
}

export function getUserCardsFromDB(user_id: string) {
  return prisma.card.findMany({
    where: {
      user_id: {
        equals: user_id,
      },
    },
  });
}

export function getCardByIdFromDB(card_id: string) {
  return prisma.card.findUnique({
    where: {
      card_id: card_id,
    },
  });
}
