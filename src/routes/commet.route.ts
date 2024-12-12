import express from "express"
import CommentController from "../controllers/comment.controllers"


const commentRoute = express.Router()

commentRoute.use("/add", CommentController.saveComment)

export default commentRoute