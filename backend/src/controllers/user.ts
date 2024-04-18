import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

export async function addUser(req: Request, res: Response) {
  const prisma = new PrismaClient();
  const { login, password } = req.body;
  if (!login || !password) {
    res.status(400).json({
      message: "login and password are required",
    });
  }

  try {
    const newClient = await prisma.user.create({
      data: {
        login: login,
        password: password,
      },
    });

    const responseDate = {
      message: "User added successfully",
      data: {
        newClient: newClient,
      },
    };

    res.status(201).json(responseDate);
  } catch (e) {
    console.error("ERROR:", e);

    res.status(400).json({
      message: "error",
      data: {
        error: e,
      },
    });
  } finally {
    prisma.$disconnect();
  }
}

export async function loginUser(req: Request, res: Response) {
  const prisma = new PrismaClient();
  const { login, password } = req.body;
  if (!login || !password) {
    res.status(400).json({
      message: "login and password are required",
    });
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        login: login,
        password: password,
      },
    });

    if (user) {
      res.status(200).json({
        message: "User found",
        data: {
          user: user,
        },
      });
    } else {
      res.status(404).json({
        message: "User not found",
      });
    }
  } catch (e) {
    console.error("ERROR:", e);

    res.status(400).json({
      message: "error",
      data: {
        error: e,
      },
    });
  } finally {
    prisma.$disconnect();
  }
}
