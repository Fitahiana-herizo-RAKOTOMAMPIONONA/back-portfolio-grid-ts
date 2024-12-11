import express from "express"
import workRoute from "./work.route"
import { Request ,Response } from "express"

const generalRoutes = express.Router()

generalRoutes.use("/work" , workRoute)
generalRoutes.get('/test/:id_work', (req: Request, res: Response) => {
    const { id_work } = req.params;
    console.log(typeof(+id_work));
});


export default generalRoutes