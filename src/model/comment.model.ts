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
}

export default CommentModel;