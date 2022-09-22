import express from "express";
import { getUserIndice, getUserLikes, getUserBookmarks } from "./../controllers/user-controller.js";


const router = express.Router();

router
    .route("/index/:userid")
    .get(getUserIndice);

router
    .route("/like/:userid")
    .get(getUserLikes);

router
    .route("/bookmark/:userid")
    .get(getUserBookmarks);



export default router;