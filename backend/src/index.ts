import express, { Express } from "express";
import dotenv from "dotenv";


dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());

import userRoute from "./routes/user";
app.use("/user", userRoute);
import cardRoute from "./routes/card";
app.use("/card", cardRoute);
import offerRoute from "./routes/offer";
app.use("/offer", offerRoute);


app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});



