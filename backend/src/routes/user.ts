import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import express from "express";

const router = express.Router();


router.post("/addUser", async (req: Request, res: Response) => {
    const prisma = new PrismaClient();
    const data = req.body;

    try {
        await prisma.user.create({
            data: {
                login: data["login"],
                password: data["password"]
            },
        });
        res.statusCode = 200;
    } catch (e) {
        console.error("ERROR:", e)
        res.statusCode = 400;
    }

    const responseDate = {
        message: "user adding status",
        data: {
            code: res.statusCode
        },
    };

    prisma.$disconnect();

    res.json(responseDate);
});


router.post("/login", async (req: Request, res: Response) => {
    const prisma = new PrismaClient();
    const data = req.body;

    const findUser = async () => await prisma.user.findFirst({
        // select: {
        //         id: true,
        //         password: true
        //     },
        where: {
            login: {
                equals: data["login"],
            },
            password: {
                equals: data["password"],
            }
        },
    });

    const user = await findUser()

    res.statusCode = (user !== null ? 200 : 401)

    const responseDate = {
        message: "user data",
        data: {
            user: user
        },
    };

    prisma.$disconnect();

    res.json(responseDate);
});


export default router;
