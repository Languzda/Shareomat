import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import express from "express";

const router = express.Router();

router.post("/", (req: Request, res: Response) => {
    const prisma = new PrismaClient();
    const data = req.body;
    const { data1, data2 } = data;

    console.log("Tylko istotne informacje, raczej nie korzsytaj z console.loga");

    // Tutaj dajemy odpowiednią logikę do obsługi zapytania


    // Poniżej tworzymy odpowiedź odpowienią od skutku zapytania

    // jeśli wszystko jest ok, to zwracamy status 200
    res.statusCode = 200;

    // przykładowa odpowiedź w formacie JSON
    const responseDate = {
        message: "Hello World",
        data: {
            resData1: "resData1",
            resData2: "resData2",
        },
    };

    // Zawsze zamykamy połączenie z bazą danych
    prisma.$disconnect();

    // wysłanie odpowiedzi w formacie JSON
    res.json(responseDate);
});

export default router;
