import { Request, Response } from "express";
import IComment from "../interface/comment.interface";
import CommentModel from "../model/comment.model";



class CommentController {
    static async saveComment(req  : Request , res :Response)
    {
        const {email_user , username , title_comment , content_comment , etoile} = req.body;
        const newWork : IComment = {email_user , username , title_comment , content_comment , etoile} 
        try {
            await CommentModel.save(newWork)
            res.status(200).json({status : "success"})
        } catch (error) {
            console.error("Error saving comment:", error);
            res.status(500).json({ status: "error", message: error });
        }
    }
}
export default CommentController