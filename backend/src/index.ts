import express, {Express} from "express";
import dotenv from "dotenv";


dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());

import sendDataRoute from "./routes/endpoints";
app.use("/sendData", sendDataRoute);
import templateRoute from "./routes/template";
app.use("/template", templateRoute);
import userRoute from "./routes/user";
app.use("/user", userRoute);


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});



