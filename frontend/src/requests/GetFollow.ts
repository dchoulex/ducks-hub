import { REQUEST_URL, USE_DUMMY } from "./requestConfigs";

export const GetFollow = async (userId: string): Promise<boolean> => {
    if (USE_DUMMY) return true;

    const res = await fetch(REQUEST_URL + "/follow/" + userId)
        .then(res => res.json());
    return res.data.current;
}