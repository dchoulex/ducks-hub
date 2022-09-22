import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: [true, "ユーザーidを入力してください"]
    },
    postid: {
        type: String,
        required: [true, "ポストidを入力してください"]
    }
});

const Like = mongoose.model("Like", likeSchema);

export default Like;