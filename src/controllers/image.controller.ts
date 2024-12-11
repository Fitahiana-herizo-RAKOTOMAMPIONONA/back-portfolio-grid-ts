import { dbConnection } from "../config/migration";
import { Request, Response } from "express";

const getALLIMage = async (req: Request, res: Response) => {
    try {
        const [rows] = await dbConnection.query("SELECT * FROM images");
        res.status(200).json({ status: "success", data: rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", message: "Failed to fetch images" });
    }
}

const uploadImage = async (req: Request, res: Response) => {
    const { filename } = req.file!;
    const { title } = req.body;

    try {
        await dbConnection.query("INSERT INTO images (title, file_url) VALUES (?, ?)", [title, `/uploads/${filename}`]);
        res.status(200).json({ status: "success", message: "Image uploaded successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", message: "Failed to upload image" });
    }
}
export {getALLIMage ,uploadImage}