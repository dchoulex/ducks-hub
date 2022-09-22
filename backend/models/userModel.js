import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: [true, "ユーザーidを入力してください"]
    },
    name: {
        type: String,
        required: [true, "ユーザ名を入力してください"]
    },
    slackid: String,
    mail: String,
    greeting: String
});

const User = mongoose.model("User", userSchema);

export default User;