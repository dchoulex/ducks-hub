import express from "express";
import { getPost, uploadPost, updatePost } from "./../controllers/post-controller.js";

const router = express.Router();

router
    .route("/")
    .post(uploadPost);

router
    .route("/:postid")
    .get(getPost)
    .put(updatePost);

export default router;