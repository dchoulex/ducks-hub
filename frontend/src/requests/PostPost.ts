import { REQUEST_URL, USE_DUMMY } from "./requestConfigs";

export const PostPost = async (title: string, text: string, tags: string[]): Promise<string> => {
    if (USE_DUMMY) return "hohiWSWQLKk";

    const res = await fetch(REQUEST_URL + "/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({
            title: title,
            text: text,
            tags: tags
        })
    }).then(res => res.json());
    return res.data.postid;
}