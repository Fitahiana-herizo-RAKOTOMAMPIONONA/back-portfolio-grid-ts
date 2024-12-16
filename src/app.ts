import express from "express";
import generalRoutes from "./routes/general.route";
import path from "path";
import cors from "cors";

const app = express()

app.use(express.json())

app.use(cors({
    origin: ["http://localhost:5173","https://cv-portfolio-beta.vercel.app/"],
    methods: ["POST", "GET", "DELETE","PUT"],
    credentials: true
}));

app.use('/portfolio/uploads', express.static('uploads'));
app.use("/portfolio", generalRoutes)

export default app