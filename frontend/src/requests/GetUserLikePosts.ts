import { postSummary } from "../models/postSummary";
import { REQUEST_URL, USE_DUMMY } from "./requestConfigs";

const dummy: {data: postSummary[], totalPage: number} = {
    data: [
    ],
    totalPage: 1
}

export const GetUserLikePosts = async (userId: string, page?: number): Promise<{data: postSummary[], totalPage: number}> => {
    if (USE_DUMMY) return dummy;

    const res = await fetch(`${REQUEST_URL}/user/like/${userId}?page=${page??1}`)
        .then(res => res.json());
    const data = res.data.map((r: any) => {return {
        "title": r.title,
        "summary": r.summary,
        "timestamp": new Date(r.timestamp),
        "postId": r.postid,
        "like": r.like,
        "autherId": r.userid,
        "authorName": r.name,
        "tags": r.tags
    }});
    const totalPage = res.totalPage ? Number(res.totalPage) : 1;
    return {data: data.sort((d1: any, d2: any) => d2.timestamp - d1.timestamp), totalPage: totalPage};
}