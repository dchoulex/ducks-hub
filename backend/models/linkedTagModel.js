import mongoose from "mongoose";

const linkedTagSchema = new mongoose.Schema({
    tag: {
        type: String,
        required: [true, "タグを入力してください"]
    },
    postid: {
        type: String,
        required: [true, "ポストidを入力してください"]
    }
});

const LinkedTag = mongoose.model("LinkedTag", linkedTagSchema);

export default LinkedTag;