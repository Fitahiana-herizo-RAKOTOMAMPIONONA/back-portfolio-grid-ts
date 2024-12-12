import express from "express"
import CommentController from "../controllers/comment.controllers"


const commentRoute = express.Router()

commentRoute.post("/add", CommentController.saveComment)
commentRoute.get("/all", CommentController.getAll)
commentRoute.get("/find/:id_comment", CommentController.findById)
commentRoute.delete("/delete/:id_comment" , CommentController.deleteById)
commentRoute.put("/update/:id_comment" , CommentController.updateById)

export default commentRoute