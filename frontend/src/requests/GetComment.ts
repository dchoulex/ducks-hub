import { comment } from "../models/comment"
import { REQUEST_URL, USE_DUMMY } from "./requestConfigs";

const dummy: comment = {
    commentId: "wIONOIKMKMMZ",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eget mauris a elit sollicitudin pretium. Quisque scelerisque orci sit amet egestas consectetur. Quisque tincidunt quis felis porttitor mattis. Quisque vitae.",
    timestamp: new Date("2022/06/07 15:24:17"),
    userId: "wnOIJxwKKM",
    name: "User1"
}

export const GetComment = async (commentId: string): Promise<comment> => {
    if (USE_DUMMY) return dummy;

    const res = await fetch(REQUEST_URL + "/comment/" + commentId)
        .then(res => res.json());
    return {
        "commentId": commentId,
        "text": res.data.text,
        "timestamp": new Date(res.data.timestamp),
        "userId": res.data.userid,
        "name": res.data.name
    };
}