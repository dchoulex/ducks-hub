import express from "express";
import { getRecommend } from "./../controllers/recommend-controller.js";


const router = express.Router();


router
    .route("/")
    .get(getRecommend);


export default router;