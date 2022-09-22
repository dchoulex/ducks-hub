import { REQUEST_URL, USE_DUMMY } from "./requestConfigs";

export const PostLike = async (postId: string): Promise<boolean> => {
    if (USE_DUMMY) return true;

    const res = await fetch(REQUEST_URL + "/like/" + postId, {method: "POST"})
        .then(res => res.json());
    return res.data.current;
}