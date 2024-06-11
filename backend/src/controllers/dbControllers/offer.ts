import { connect } from 'http2';
import { prisma } from './prismaClient';
import { Offer } from '@prisma/client';

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
      //card_id: card_id,
      card: {connect: {card_id: card_id}},
      status: status,
    },
  });
}

export function getActiveOffersFromDB() {
  return prisma.offer.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
    },
    where: {
      status: 'active',
    },
  });
}

export function getOfferByIdFromDB(offer_id: Offer['id']) {
  return prisma.offer.findUnique({
    where: {
      id: offer_id,
    },
  });
}

export function getActiveOffersAllFromDB() {
  return prisma.offer.findMany({
    where: {
      status: 'active',
    },
  });
}

export function getOffersByCardIdFromDB(card_id: string) {
  return prisma.card.findMany({
    where: {
      card_id: card_id,
    },
    include: {
      offers: true,
    },
  });
}

export function updateToUsedOffer(offer_id: Offer['id']) {
  return prisma.offer.update({
    where: {
      id: offer_id,
    },
    data: {
      status: 'used',
    },
  });
}

export function updateLockedOffer(offer_id: Offer['id']) {
  return prisma.offer.update({
    where: {
      id: offer_id,
    },
    data: {
      status: 'locked',
    },
  });
}

export function getOfferStatus(offer_id: Offer['id']) {
  return prisma.offer.findUnique({
    where: {
      id: offer_id,
    },
    select: {
      status: true,
    },
  });
}
