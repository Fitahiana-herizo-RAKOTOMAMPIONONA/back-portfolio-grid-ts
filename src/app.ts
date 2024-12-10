import express from "express";
import generalRoutes from "./routes/general.route";

const app = express()
app.use(express.json())
app.use("/portfolio",generalRoutes)
export default app