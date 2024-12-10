import express from "express"
import workRoute from "./work.route"

const generalRoutes = express.Router()

generalRoutes.use("/work" , workRoute)

export default generalRoutes