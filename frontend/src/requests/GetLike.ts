import { REQUEST_URL, USE_DUMMY } from "./requestConfigs";

export const GetLike = async (postId: string): Promise<boolean> => {
    if (USE_DUMMY) return false;

    const res = await fetch(REQUEST_URL + "/like/" + postId)
        .then(res => res.json());
    return res.data.current;
}