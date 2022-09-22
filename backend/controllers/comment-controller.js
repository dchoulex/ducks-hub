import generateId from "./generateId.js";

import Comment from "./../models/commentModel.js";
import User from "./../models/userModel.js";

export async function getComment(req, res) {
    try {
        const commentId = req.params.commentid;
        const selectedComment = await Comment.findOne({ commendid: commentId });
        
        const user = await User.findOne({ userid: selectedComment.userid });
        const userName = user.name;

        res.status(200).json({
            status: "success",
            data: {
                text: selectedComment.text,
                timestamp: selectedComment.timestamp,
                userid: selectedComment.userid,
                name: userName
            }
        })
    } catch(err) {
        res.status(400).json({
            status: "fail",
            message: err
        })
    }
};

export async function uploadComment(req, res) {
    try {
        const postId = req.params.postid;
        req.body.postid = postId;

        const newCommentId = generateId("comment");
        req.body.commentid = newCommentId;

        const userId = req.session.userid || "435412760";
        req.body.userid = userId;
        
        await Comment.create(req.body);

        res.status(200).json({
            status: "success",
            message: "Successfully uploaded your post",
            data: {
                commentid: newCommentId
            }
        })
    } catch(err) {
        res.status(400).json({
            status: "fail",
            message: err
        })
    }
}