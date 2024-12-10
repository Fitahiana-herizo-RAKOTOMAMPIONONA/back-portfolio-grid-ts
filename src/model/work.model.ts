import { dbConnection } from "../config/migration";
import Iwork from "../interface/work.interface";

class Work {

    static async save(props : Iwork) {
        const insertToBD = `INSERT INTO Work (title_work , description_work , file_url ,date ) VALUES (?,?,?,?);`
        try {
            await dbConnection.query(insertToBD, [props.title_work, props.description_work, props.file_url, props.date])
        } catch (error) {
            console.log("Error saving Work" + error);
            return error
        }
    }

    static async findbyId(id_work: number): Promise<Work | null> {
        const findbyId = `SELECT * FROM Work WHERE id_work = ?;`
        try {
            const [result]: any = await dbConnection.query(findbyId, [id_work]);
            return result.length > 0 ? result[0] : null;
        } catch (error) {
            console.error("Error finding Work by ID: ", error);
            throw new Error("Database query failed");
        }
    }
    
    

    static async deleteWorkbyID(id_work : number) {
        const deleteToDB = `DELETE FROM Work WHERE id_work = ?; `
        try {
            const result = await Work.findbyId(id_work)
            if (result) await dbConnection.query(deleteToDB, [id_work])
        } catch (error) {
            console.log("Error deleting Work" + error);
            throw error
        }
    }

    static async updateWorkById(id_work: number, props : Iwork) {
        const edittoDB = `UPDATE Work SET title_work = ?, description_work  = ?, file_url = ?, date = ? WHERE id_work = ?;`
        try {
            const result: Iwork | any = await Work.findbyId(id_work)
            if (result) {
                props.title_work = props.title_work ? props.title_work : result.title_work
                props.description_work = props.description_work ? props.description_work : result.description_work
                props.file_url = props.file_url ? props.file_url : result.file_url
                props.date = props.date ? props.date : result.date
                await dbConnection.query(edittoDB, [props.title_work, props.description_work, props.file_url, props.date, id_work])
            }
            else return "Accun utilisateur"
        } catch (error) {
            console.log("Error updating Work" + error);
            throw error
        }
    }

    static async getAllWork() {
        const getall = `SELECT * FROM Work;`
        try {
            const result: any = await dbConnection.query(getall)
            return result;
        } catch (error) {
            console.log("error updating Work by ID " + error)
            throw (error)
        }
    }
}

export default Work;
