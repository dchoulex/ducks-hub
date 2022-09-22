import express from "express";
import { toggleBookmark, getBookmark } from "./../controllers/bookmark-controller.js";

const router = express.Router();

router
    .route("/:postid")
    .post(toggleBookmark)
    .get(getBookmark);

export default router;