import { Request, Response } from "express";
import IComment from "../interface/comment.interface";
import CommentModel from "../model/comment.model";
import axios from "axios";
import { config } from "dotenv";

config();

const {API_URL } = process.env
class ArticleControllers {

    static async findById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const result = await axios.get(`${API_URL}/${id}`);
            if (result && result.data) {
                res.status(200).json({ status: "success", result: result.data });
                return;
            }
            res.status(400).json({ status: "error", message: "No data found" });
        } catch (error) {
            console.error("Error finding comment by id :", error);
            res.status(500).json({ status: "error", message: error });
        }
    }

    static async getAll(req: Request, res: Response) {
        try {
            const result = await axios.get(`${API_URL}`);
            if (result && result.data) {
                res.status(200).json({ status: "success", result: result.data });
                return;
            }
            res.status(400).json({ status: "error", message: "No data found" });
        } catch (error) {
            console.error("Error fetching all comments:", error);
            res.status(500).json({ status: "error", message: error });
        }
    }
}

export default ArticleControllers