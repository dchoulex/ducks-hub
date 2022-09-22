import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema({
    organizationid: {
        type: String,
        required: [true, "組織IDを入力してください"]
    },
    name: String,
    mail: String,
    greeting: String
});

const Organization = mongoose.model("Organization", organizationSchema);

export default Organization;