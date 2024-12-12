import { dbConnection } from "../config/migration";
import IComment from "../interface/comment.interface";

class CommentModel{
    static async save(props : IComment) : Promise<void>
    {
        const query : string = `INSERT INTO Comment  (email_user , username ,title_comment, content_comment , etoile) VALUES  (? , ? , ? , ? , ?)`;
        try {
            await dbConnection.query(query , [props.email_user , props.username , props.title_comment , props.content_comment , props.etoile]);
        } catch (error) {
            console.log("error saving comments : " + error);
            throw error;
        }
    }
    static async getById(id_comment : number) : Promise<void>
    {
        const query : string = `SELECT * FROM Comment WHERE id_comment = ?;`;
        try{
            const result: IComment[] | any = await dbConnection.query(query , [id_comment])
            return result.length > 0 ? result[0] : null;
        }catch(error){
            console.log("error geting comments : " + error);
            throw error;
        }
    }

    static async delById(id_comment  :number)
    {
        const query : string = `DELETE FROM Comment WHERE id_comment = ?;`;
        try{
            await dbConnection.query(query , [id_comment])
        }catch(error){
            console.log("error geting comments : " + error);
            throw error;
        }
    }
    static async updateById(id_comment  :number , props : IComment) : Promise<void>
    {
        const query : string = `UPDATE Comment SET title_comment = ? , content_comment = ?   WHERE id_comment = ?;`;
        console.log(props.title_comment);
        try{
            dbConnection.query(query , [props.title_comment , props.content_comment , id_comment])
        }catch(error){
            console.log("error geting comments : " + error);
            throw error;
        }
    }

    static async getAll() : Promise<void>
    {
        const query : string = `SELECT * FROM Comment;`;
        try{
            const result: IComment[] | any = await dbConnection.query(query )
            return result
        }catch(error){
            console.log("error getinig comments : " + error);
            throw error;
        }
    }
}

export default CommentModel;