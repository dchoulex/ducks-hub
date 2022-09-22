import { REQUEST_URL, USE_DUMMY } from "./requestConfigs";

export const GetBookmark = async (postId: string): Promise<boolean> => {
    if (USE_DUMMY) return true;

    const res = await fetch(REQUEST_URL + "/bookmark/" + postId)
        .then(res => res.json());
    return res.data.current;
}