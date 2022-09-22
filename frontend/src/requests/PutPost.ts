import { REQUEST_URL, USE_DUMMY } from "./requestConfigs";

export const PutPost = async (postId: string, title: string, text: string, tagIds: string[]) => {
    if (USE_DUMMY) return;

    const res = await fetch(REQUEST_URL + "/posts/" + postId, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({
            title: title,
            text: text,
            tags: tagIds
        })
    }).then(res => res.json());
}