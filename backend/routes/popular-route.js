import express from "express";
import { getPopular } from "./../controllers/popular-controller.js";


const router = express.Router();


router
    .route("/")
    .get(getPopular);


export default router;