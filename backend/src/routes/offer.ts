import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import express from "express";

const router = express.Router();

const dummyData = [
    {name: "offer1", type: "type1", description: "description1", limit: 1, price: 5.99, photo: "photo1", card_id: 1, status: "active"},
    {name: "offer2", type: "type2", description: "description2", limit: 2, price: 6.99, photo: "photo2", card_id: 2, status: "active"},
    {name: "offer3", type: "type3", description: "description3", limit: 3, price: 7.99, photo: "photo3", card_id: 3, status: "active"},
    {name: "offer4", type: "type4", description: "description4", limit: 4, price: 8.99, photo: "photo4", card_id: 4, status: "active"},
    {name: "offer5", type: "type5", description: "description5", limit: 5, price: 9.99, photo: "photo5", card_id: 5, status: "active"},
    {name: "offer6", type: "type6", description: "description6", limit: 6, price: 10.99, photo: "photo6", card_id: 6, status: "active"},
    {name: "offer7", type: "type7", description: "description7", limit: 7, price: 11.99, photo: "photo7", card_id: 7, status: "active"},
    {name: "offer8", type: "type8", description: "description8", limit: 8, price: 12.99, photo: "photo8", card_id: 8, status: "active"},
    {name: "offer9", type: "type9", description: "description9", limit: 9, price: 13.99, photo: "photo9", card_id: 9, status: "active"},
    {name: "offer10", type: "type10", description: "description10", limit: 10, price: 14.99, photo: "photo10", card_id: 10, status: "active"},
]

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
            DummyResMess: "Dummy Response"
        },
    };

    prisma.$disconnect();

    res.json(responseDate);
});


router.get("/getActiveOffers", async (req: Request, res: Response) => {
    // const prisma = new PrismaClient();
    //
    // let offers
    //
    // try {
    //     offers = await prisma.offer.findMany({
    //         where: {
    //             status: "active"
    //         }
    //     });
    //     res.statusCode = 200
    // } catch (e) {
    //     console.error("ERROR:", e)
    //     res.statusCode = 400
    // }

    const responseDate = {
        message: "offers data",
        data: {
            offers: dummyData
        },
    };

    // prisma.$disconnect();

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
