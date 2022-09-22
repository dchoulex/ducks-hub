import { REQUEST_URL, USE_DUMMY } from "./requestConfigs";

export const PostBookmark = async (postId: string): Promise<boolean> => {
    if (USE_DUMMY) return false;

    const res = await fetch(REQUEST_URL + "/bookmark/" + postId, {method: "POST"})
        .then(res => res.json());
    return res.data.current;
}