import { addUser, loginUser } from "../controllers/user";

import express from "express";

const router = express.Router();

router.post("/addUser", addUser);
router.post("/login", loginUser);

export default router;
