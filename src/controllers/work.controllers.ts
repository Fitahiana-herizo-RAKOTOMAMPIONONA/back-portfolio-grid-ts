import { log } from "console";
import Iwork from "../interface/work.interface";
import Work from "../model/work.model";
import { Request ,Response } from "express";



const saveWork = async (req: Request, res: Response): Promise<void> => {
    const { title_work, description_work, date , type ,progress ,technologies_used ,client_name} = req.body;
    const file_url = req.file ? `/uploads/${req.file.filename}` : null;
    console.log();
    
    if (!file_url) {
        res.status(400).json({ status: "error", message: "Image file is required" });
        return;
    }
    try {
        const newWork: Iwork = {
            title_work: title_work,
            description_work: description_work,
            date: date,
            file_url: file_url,
            type: type,
            status: "",
            team_members: [],
            visibility: "",
            technologies_used: technologies_used.trim(),
            rating: 0,
            client_name: client_name,
            progress: progress,
            tags: []
        };
        await Work.save(newWork);
        res.status(200).json({ status: "success", message: "Work saved successfully" });
    } catch (error) {
        console.error("Error saving work:", error);
        res.status(500).json({ status: "error", message: error });
    }
};

const findWorkById = async (req: Request, res: Response) => {
    const { id_Work } = req.params;

    if (isNaN(+id_Work)) {
        res.status(400).json({ status: "error", message: "Invalid ID format" });
    }
    else{
        try {
            const result:Iwork | any = await Work.findbyId(+id_Work);
            result.technologies_used = result.technologies_used.trim().split(";")
            if (result) {
                res.status(200).json({ status: "success", result: result });
            } else {
                res.status(404).json({ status: "error", message: "Work not found" });
            }
        } catch (error) {
            console.error("Error finding Work by ID: ", error);
            res.status(500).json({ status: "error", message: "Internal server error" });
        }
    }
};


const deleteWorkById = async(req: Request,res : Response)=>{
    const {id_Work} = req.params
    try {
        await Work.deleteWorkbyID(+id_Work)
        res.status(200).json({status : "success"})
    } catch (error) {
        res.status(500).json({status :"error" , message : error})
        console.log("error finding Work by ID " + error)
        throw(error)   
    }
}



const updateWorkbyID = async(req: Request,res : Response)=>{
    const {id_Work} = req.params
    const {title_work, description_work, file_url, date , type} = req.body
    const props : Iwork ={
        title_work: title_work,
        description_work: description_work,
        file_url: file_url,
        date: date,
        type: type,
        status: "",
        team_members: [],
        visibility: "",
        technologies_used: [],
        rating: 0,
        client_name: "",
        progress: 0,
        tags: []
    }
    try {
        if(props){
            const isNotValid =  await Work.updateWorkById(+id_Work , props)
            if (isNotValid)
                res.status(500).json({status : "error" ,Work : isNotValid})
            else
                res.status(200).json({status : "success" ,Work : "updating Work by id success"})
        }
    } catch (error) {
        res.status(500).json({status :"error" , message : error})
        console.log("error updating Work by ID " + error)
        throw(error)
    }
}

const getALLWork = async (req: Request, res: Response) => {
    try {
        const result = await Work.getAllWork()
        res.status(200).json({ status: "success", data: result[0] })
    } catch (error) {
        res.status(500).json({ status: "error", message: error })
        console.log("error getting all Work " + error)
        throw error;
    }
};


export {saveWork,updateWorkbyID,findWorkById, deleteWorkById ,getALLWork}