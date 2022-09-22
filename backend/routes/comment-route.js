import express from "express";
import { getComment, uploadComment } from "./../controllers/comment-controller.js";

const router = express.Router();

router
    .route("/:commentid")
    .get(getComment);

router
    .route("/:postid")
    .post(uploadComment);

export default router;