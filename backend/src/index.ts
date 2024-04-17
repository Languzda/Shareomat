import express, { Express } from "express";
import dotenv from "dotenv";

import userRoute from "./routes/user";
import cardRoute from "./routes/card";
import offerRoute from "./routes/offer";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());

app.use("/user", userRoute);
app.use("/card", cardRoute);
app.use("/offer", offerRoute);


app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});



