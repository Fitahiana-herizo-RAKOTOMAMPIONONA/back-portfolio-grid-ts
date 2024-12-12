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

    static async findById(req :Request , res: Response)
    {
        const {id_comment} = req.params
        try {
            const result : IComment | any = await CommentModel.getById(+id_comment)
            if(result)
            {
                res.status(200).json({status : "success" , result})
                return ;
            }
            res.status(400).json({status : "error" , result})
        } catch (error) {
            console.error("Error finding comment by id :", error);
            res.status(500).json({ status: "error", message: error });
        }
    }
    static async getAll(req :Request , res: Response)
    {
        try {
            const result : IComment | any = await CommentModel.getAll()
            if(result)
            {
                res.status(200).json({status : "success" ,result : result[0]})
                return ;
            }
            res.status(400).json({status : "error" , result })
        } catch (error) {
            console.error("Error finding comment by id :", error);
            res.status(500).json({ status: "error", message: error });
        }
    }
    static async deleteById(req :Request , res: Response){
        const {id_comment} = req.params;
    
        try {
            const result : IComment | any = await CommentModel.getById(+id_comment)
            if(result)
            {
                await CommentModel.delById(+id_comment)
                res.status(200).json({status : "success" ,result : result[0]})
                return ;
            }
            res.status(400).json({status : "error" ,result : "user not found"})
        } catch (error) {
            console.error("Error deleting comment by id :", error);
            res.status(500).json({ status: "error", message: error });
        }
    }
}
export default CommentController