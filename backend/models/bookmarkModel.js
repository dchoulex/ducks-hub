import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: [true, "ユーザーidを入力してください"]
    },
    postid: {
        type: String,
        required: [true, "ポストidを入力してください"]
    }
});

const Bookmark = mongoose.model("Bookmark", bookmarkSchema);

export default Bookmark;