import express from "express";
import generalRoutes from "./routes/general.route";
import path from "path";
import cors from "cors";

const app = express()

app.use(express.json())

app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET"],
    credentials: true
}));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/portfolio", generalRoutes)

export default app