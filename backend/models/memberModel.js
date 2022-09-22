import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
    organizationid: {
        type: String,
        required: [true, "組織idを入力してください"]
    },
    userid: {
        type: String,
        required: [true, "ユーザーidを入力してください"]
    }
});

const Like = mongoose.model("Member", memberSchema);

export default Like;