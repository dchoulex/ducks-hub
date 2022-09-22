import { REQUEST_URL, USE_DUMMY } from "./requestConfigs";

export const PostComment = async (postId: string, text: string): Promise<string> => {
    if (USE_DUMMY) return "WdxXSJKROKKnc";

    const res = await fetch(REQUEST_URL + "/comment/" + postId, {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({
            text: text
        })
    }).then(res => res.json());
    return res.data.commentid;
}