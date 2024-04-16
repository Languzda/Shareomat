import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import express from "express";

const router = express.Router();


router.post("/addCard", async (req: Request, res: Response) => {
    const prisma = new PrismaClient();
    const data = req.body;

    try {
        await prisma.card.create({
            data: {
                card_id: data["card_id"],
                user_id: data["user_id"],
            },
        });

        res.statusCode = 200;
    } catch (e) {
        console.error("ERROR:", e)
        res.statusCode = 400;
    }

    const responseDate = {
        message: "card adding status",
        data: {
            code: res.statusCode
        },
    };

    prisma.$disconnect();

    res.json(responseDate);
});

// get cards for a single user
router.get("/getUserCards", async (req: Request, res: Response) => {
    const prisma = new PrismaClient();
    const data = req.body;

    let cards

    //const findCards = async () => {
        try {
            cards = await prisma.card.findMany({
                // select: {
                //         card_id: true,
                //     },
                where: {
                    user_id: {
                        equals: data["user_id"],
                    },
                },
            });
            res.statusCode = 200
        } catch (e) {
            console.error("ERROR:", e)
            res.statusCode = 400
        }
    //}

    //const cards = await findCards()

    const responseDate = {
        message: "cards data",
        data: {
            cards: cards
        },
    };

    prisma.$disconnect();

    res.json(responseDate);
});


export default router;
