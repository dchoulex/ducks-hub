import { REQUEST_URL, USE_DUMMY } from "./requestConfigs";

const dummy = [
    {
        name: "Sample User",
        id: "Wiujhcej"
    },
    {
        name: "Sample User2",
        id: "QXWoijfe"
    },
    {
        name: "Sample User3",
        id: "CEermgtro"
    }
]

export const GetFollower = async (userId: string): Promise<{id: string, name: string}[]> => {
    if (USE_DUMMY) return [];

    const res = await fetch(REQUEST_URL + "/user/follower/" + userId)
        .then(res => res.json());
    return res.data.map((d: any) => {return{
        name: d.name,
        id: d.userid
    }});
}