import { REQUEST_URL, USE_DUMMY } from "./requestConfigs";

export const PostFollow = async (userId: string): Promise<boolean> => {
    if (USE_DUMMY) return false;

    const res = await fetch(REQUEST_URL + "/follow/" + userId, {method: "POST"})
        .then(res => res.json());
    return res.data.current;
}