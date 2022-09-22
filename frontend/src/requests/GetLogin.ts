import { IS_PRODUCTION, REQUEST_URL, USE_DUMMY } from "./requestConfigs";

export const GetLogin = async (userId: string): Promise<boolean> => {
    if (IS_PRODUCTION) throw Error("ダミー限定です");
    if (USE_DUMMY) return true;

    try {
        const res = await fetch(REQUEST_URL + "/login?userid=" + userId)
            .then(res => res.json());
        return res.data.result;
    } catch (e){
        console.error(e);
        return false;
    }
}