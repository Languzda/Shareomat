import {Request, Response} from "express";
import express from "express";

const router = express.Router()

router.post("/", (req: Request, res: Response) => {
    const data = req.body;
    console.log(req.body);
    res.send("hello")
});

export default router