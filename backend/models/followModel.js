import mongoose from "mongoose";

const followSchema = new mongoose.Schema({
    follower: {
        type: String,
        required: [true, "ユーザーidを入力してください"]
    },
    followee: {
        type: String,
        required: [true, "ポストidを入力してください"]
    }
});

const Follow = mongoose.model("Follow", followSchema);

export default Follow;