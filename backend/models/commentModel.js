import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    postid: {
        type: String,
        required: true
    },
    commentid: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: [true, "本文を入力してください"]
    },
    timestamp: {
        type: Date,
        default: Date.now()
    },
    userid: {
        type: String,
        required: true
    },
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;