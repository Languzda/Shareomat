import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

export async function addCard(req: Request, res: Response) {
  const prisma = new PrismaClient();
  const { card_id, user_id } = req.body;

  if (!card_id || !user_id) {
    res.status(400).json({
      message: "card_id and user_id are required",
    });
  }

  try {
    const newCard = await prisma.card.create({
      data: {
        card_id: card_id,
        user_id: user_id,
      },
    });

    const responseDate = {
      message: "card adding status",
      data: {
        newCard,
      },
    };

    res.status(201).json(responseDate);
  } catch (e) {
    console.error("ERROR:", e);

    res.status(400).json({ ERROR: e });
  } finally {
    prisma.$disconnect();
  }
}

export async function getUserCards(req: Request, res: Response) {
  const prisma = new PrismaClient();
  const { user_id } = req.body;

  if (!user_id) {
    res.status(400).json({
      message: "user_id is required",
    });
  }

  try {
    const cards = await prisma.card.findMany({
      where: {
        user_id: {
          equals: user_id,
        },
      },
    });

    const responseDate = {
      message: "User cards",
      data: {
        cards,
      },
    };

    res.status(200).json(responseDate);
  } catch (e) {
    console.error("ERROR:", e);

    res.status(400).json({ ERROR: e });
  } finally {
    prisma.$disconnect();
  }
}
