import express from "express"
import ArticleControllers from "../controllers/articles.controllers";



const articleRoute = express.Router();

articleRoute.get("/all",ArticleControllers.getAll)
articleRoute.get("/find/:id",ArticleControllers.findById)

export default articleRoute;