/*const { response } = require("express")
import { PrismaClient } from "@prisma/client"
require("dotenv").config({path: "./config.env"})

const gene_coll_name = process.env.GENE_COLLECTION_NAME

const get_hello(req: Request, res: Response) => {
    res.send("Hello There")
}
app.get("/hello", (req: Request, res: Response) => {
    res.send("Hello There");
  });
  
  app.post("/users", (req: Request, res: Response) => {
    res.send("Hello There add");
    main();
  });

  const get_users() {
    const tasks = await prisma.task.findMany({
        select: {
          id: true,
          title: true,
        },
        orderBy: {
          created_at: "desc",
        },
        where: {
          OR: [
            {
              title: {
                contains: "a",
              },
            },
            {
              title: {
                contains: "b",
              },
            },
          ],
        },
      });

  }

  module.exports = {
    get_hello,
    get_users,
    create_user
}
*/