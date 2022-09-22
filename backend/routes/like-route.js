import express from "express";
import { toggleLike, getCurrentLike } from "./../controllers/like-controller.js";

const router = express.Router();

router
    .route("/:postid")
    .post(toggleLike)
    .get(getCurrentLike);

export default router;