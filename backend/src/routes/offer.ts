import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import express from "express";

const router = express.Router();


router.post("/addOffer", async (req: Request, res: Response) => {
    const prisma = new PrismaClient();
    const data = req.body;

    try {
        await prisma.offer.create({
            data: {
                name: data["name"],
                type: data["type"],
                description: data["description"],
                limit: data["limit"],
                price: data["price"],
                photo: data["photo"],
                card_id: data["card_id"],
                status: data["status"]
            }
        });

        res.statusCode = 200;
    } catch (e) {
        console.error("ERROR:", e)
        res.statusCode = 400;
    }

    const responseDate = {
        message: "offer adding status",
        data: {
            code: res.statusCode
        },
    };

    prisma.$disconnect();

    res.json(responseDate);
});


router.get("/getActiveOffers", async (req: Request, res: Response) => {
    const prisma = new PrismaClient();
    const data = req.body;

    let offers

    try {
        offers = await prisma.offer.findMany({
            where: {
                status: "active"
            }
        });
        res.statusCode = 200
    } catch (e) {
        console.error("ERROR:", e)
        res.statusCode = 400
    }

    const responseDate = {
        message: "offers data",
        data: {
            offers: offers
        },
    };

    prisma.$disconnect();

    res.json(responseDate);
});

// get offers from a specific card
router.get("/getCardOffers", async (req: Request, res: Response) => {
    const prisma = new PrismaClient();
    const data = req.body;

    let offers

    try {
        offers = await prisma.card.findUnique({
            where: {
                card_id: data["card_id"]
            },
            include: {
                offers: true
            }
        });
        res.statusCode = 200
    } catch (e) {
        console.error("ERROR:", e)
        res.statusCode = 400
    }

    const responseDate = {
        message: "card offers data",
        data: {
            card_and_offers: offers
        },
    };

    prisma.$disconnect();

    res.json(responseDate);
});


export default router;
