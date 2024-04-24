import { prisma } from '../prismaClient';

export function addOfferToDB(
  name: string,
  type: string,
  description: string,
  limit: number,
  price: number,
  photo: string,
  card_id: string,
  status: string
) {
  return prisma.offer.create({
    data: {
      name: name,
      type: type,
      description: description,
      limit: limit,
      price: price,
      photo: photo,
      card_id: card_id,
      status: status,
    },
  });
}

export function getActiveOffersFromDB() {
  return prisma.offer.findMany({
    where: {
      status: 'active',
    },
  });
}

export function getOfferByCardIdFromDB(card_id: string) {
  return prisma.card.findUnique({
    where: {
      card_id: card_id,
    },
    include: {
      offers: true,
    },
  });
}
