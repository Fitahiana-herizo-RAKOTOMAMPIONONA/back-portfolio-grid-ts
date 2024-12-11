import express from "express";
import generalRoutes from "./routes/general.route";
import path from "path";

const app = express()

app.use(express.json())

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/portfolio",generalRoutes)

export default app