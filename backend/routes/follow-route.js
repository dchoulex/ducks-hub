import express from "express";
import { toggleFollow, getFollow } from "./../controllers/follow-controller.js";

const router = express.Router();

router
    .route("/:userid")
    .post(toggleFollow)
    .get(getFollow);

export default router;