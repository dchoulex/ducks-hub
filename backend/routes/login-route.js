import express from "express";
import { getLogin } from "./../controllers/login-controller.js";

const router = express.Router();

router
    .route("/")
    .get(getLogin);

export default router;