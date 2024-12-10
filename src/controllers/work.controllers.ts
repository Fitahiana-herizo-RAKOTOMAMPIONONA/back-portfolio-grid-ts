import Work from "../model/work.model";
import { Request ,Response } from "express";

const saveWork  = async(req: Request,res : Response)=>{
    const {title_work, description_work, file_url, date} = req.body
    try {
        const newWork = new Work(title_work, description_work, file_url, date)
        newWork.save()
        res.status(200).json({ status: "success"});
    } catch (error) {
        res.status(500).json({status :"error" , message : error})
        console.log("error saving Work " + error)
        throw(error)   
    }
}

const findWorkById = async(req: Request,res : Response)=>{
    const {id_Work} = req.params
    try {
        const result = await Work.findbyId(+id_Work)
        if(result){
            res.status(200).json({status : "success" , result : result})
        }
    } catch (error) {
        res.status(500).json({status :"error" , message : error})
        console.log("error finding Work by ID " + error)
        throw(error)   
    }
}

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
    const {title_work, description_work, file_url, date} = req.body
    const props ={title_work, description_work, file_url, date}
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

const getALLWork= async(req: Request,res : Response)=>{
    try {
        const result = await Work.getAllWork()
        res.status(200).json({status : "success" , data : result})
    } catch (error) {
        res.status(500).json({status :"error" , message : error})
        console.log("error getting all Work " + error)
        throw(error)
    }
}

export {saveWork,updateWorkbyID,findWorkById, deleteWorkById ,getALLWork}