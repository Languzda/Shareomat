import {Request, Response} from "express";
import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router()
const prisma = new PrismaClient();

const newUser= async () => await prisma.user.create({
    data: {
        login: "login",
        password: "password",
        //cards: [],

    },
});

  const newTask = async () => await prisma.task.create({
    data: {
      title: "Nowe zadanie 2",
    },
  });

  const tasks = async() => await prisma.task.findMany({
    select: {

      id: true,
      title: true,
    },
    orderBy: {
      created_at: "desc",
    },
    // where: {
    //   OR: [
    //     {
    //       title: {
    //         contains: "a",
    //       },
    //     },
    //     {
    //       title: {
    //         contains: "b",
    //       },
    //     },
    //   ],
    // },
  });

router.post("/", (req: Request, res: Response) => {
    const data = req.body;
    console.log(req.body);
    res.send("hello")
});

router.post("/user", (req: Request, res: Response) => {
    //const data = req.body;
    //console.log(req.body);
    //console.log(newUser)
    newUser
    res.send("user added 2")
});

router.post("/task", (req: Request, res: Response) => {
    //const data = req.body;
    //console.log(req.body);
    newTask
    console.log(newTask)
    res.send("task added")
});

router.get("/tasks", (req: Request, res: Response) => {
    //const data = req.body;
    //console.log(req.body);
    console.log(tasks)
    res.send("tasks")
});

/*await*/ prisma.$disconnect;

export default router