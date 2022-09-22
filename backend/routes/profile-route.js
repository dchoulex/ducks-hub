import express from "express";
import { getProfile, putProfile } from "./../controllers/profile-controller.js";


const router = express.Router();

//useridが指定されていない場合、自分のプロフィールを表示する
//router
//    .route("/")
//    .get(getMyProfile);

router
    .route("/:userid")
    .get(getProfile);
    
// router
//     .route("/")
//     .post(postProfile);

router
    .route("/")
    .put(putProfile);




export default router;