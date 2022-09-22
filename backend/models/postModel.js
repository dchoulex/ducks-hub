import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    postid: {
        type: String,
        required: [true, "post idが必要"]
    },
    title: {
        type: String,
        required: [true, "タイトルを入力してください"]
    },
    text: {
        type: String,
        required: [true, "本文を入力してください"]
    },
    timestamp: {
        type: Date,
        default: Date.now()
    },
    like: {
        type: Number,
        default: 0
    },
    userid: {
        type: String,
        required: [true, "user idが必要"]
    }
});

const Post = mongoose.model("Post", postSchema);

export default Post;