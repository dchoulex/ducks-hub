import express from "express";
import { searchByKeyword } from "./../controllers/search-controller.js";


const router = express.Router();


router
    .route("/")
    .get(searchByKeyword);


export default router;