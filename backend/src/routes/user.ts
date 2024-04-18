import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import express from "express";

const router = express.Router();


router.post("/addUser", async (req: Request, res: Response) => {
    const prisma = new PrismaClient();
    const {login, password} = req.body;
    if(!login || !password) {
        res.json({
            message: "login and password are required",
        })
    }

    console.log(login,password)

  

    try {
        const newClient = await prisma.user.create({
            data: {
                login: login,
                password: password
            },
        });

        const responseDate = {
            message: "user adding status",
            data: {
                newClient: newClient
            },
        };

        prisma.$disconnect();
        res.statusCode = 200;
        res.json(responseDate);

    } catch (e) {
        console.error("ERROR:", e)
        res.statusCode = 400;
        res.json({
            message: "error",
            data: {
                error: e
            }
        });
    }finally
    {
        prisma.$disconnect();
    }




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
