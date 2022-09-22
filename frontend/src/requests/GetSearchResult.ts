import { postSummary } from "../models/postSummary";
import { REQUEST_URL, USE_DUMMY } from "./requestConfigs";

const dummy: {data: postSummary[], totalPage: number} = {
    data: [
    {
        "title": "SampleSkok",
        "summary": "いかがでしたか？",
        "timestamp": new Date("1999/02/19 18:18:00"),
        "postId": "JIWinXDJbj",
        "like": 4,
        "autherId": "jxwOJMKMD",
        "tags": ["Java", "Sample"],
        "authorName": "sampleUser"
    },
    {
        "title": "SampleSXWCwc",
        "summary": "2いかがでしたか？",
        "timestamp": new Date("1999/02/19 18:18:00"),
        "postId": "JIWWXDnJbj",
        "like": 0,
        "autherId": "jxwOJMKMD",
        "tags": ["Java", "Sample"],
        "authorName": "sampleUser"
    },
    {
        "title": "SampleSkok",
        "summary": "いかがでしたか？",
        "timestamp": new Date("1999/02/19 18:18:00"),
        "postId": "XOInekNKNEDC",
        "like": 124,
        "autherId": "jxwOJMKMD",
        "tags": ["Java", "Sample"],
        "authorName": "sampleUser"
    },
    {
        "title": "SampleSkok",
        "summary": "いかがでしたか？",
        "timestamp": new Date("1999/02/19 18:18:00"),
        "postId": "cedMOKMOwd",
        "like": 19834,
        "autherId": "jxwOJMKMD",
        "tags": ["Java", "Sample"],
        "authorName": "sampleUser"
    },
    {
        "title": "SampleSkok",
        "summary": "いかがでしたか？",
        "timestamp": new Date("1999/02/19 18:18:00"),
        "postId": "cdewJIOMDE",
        "like": 4222,
        "autherId": "jxwOJMKMD",
        "tags": ["Java", "Sample"],
        "authorName": "sampleUser"
    },
    {
        "title": "SampleSkok",
        "summary": "いかがでしたか？",
        "timestamp": new Date("1999/02/19 18:18:00"),
        "postId": "JIWinXDJbj",
        "like": 4,
        "autherId": "jxwOJMKMD",
        "tags": ["Java", "Sample"],
        "authorName": "sampleUser"
    },
    {
        "title": "SampleSXWCwc",
        "summary": "2いかがでしたか？",
        "timestamp": new Date("1999/02/19 18:18:00"),
        "postId": "JIWWXDnJbj",
        "like": 0,
        "autherId": "jxwOJMKMD",
        "tags": ["Java", "Sample"],
        "authorName": "sampleUser"
    },
    {
        "title": "SampleSkok",
        "summary": "いかがでしたか？",
        "timestamp": new Date("1999/02/19 18:18:00"),
        "postId": "XOInekNKNEDC",
        "like": 124,
        "autherId": "jxwOJMKMD",
        "tags": ["Java", "Sample"],
        "authorName": "sampleUser"
    },
    {
        "title": "SampleSkok",
        "summary": "いかがでしたか？",
        "timestamp": new Date("1999/02/19 18:18:00"),
        "postId": "cedMOKMOwd",
        "like": 19834,
        "autherId": "jxwOJMKMD",
        "tags": ["Java", "Sample"],
        "authorName": "sampleUser"
    },
    {
        "title": "SampleSkok",
        "summary": "いかがでしたか？",
        "timestamp": new Date("1999/02/19 18:18:00"),
        "postId": "cdewJIOMDE",
        "like": 4222,
        "autherId": "jxwOJMKMD",
        "tags": ["Java", "Sample"],
        "authorName": "sampleUser"
    }
    ],
    totalPage: 5
}

export const GetSearchResult = async (keyword: string, page?: number): Promise<{data: postSummary[], totalPage: number}> => {
    if (USE_DUMMY) return dummy;

    const res = await fetch(`${REQUEST_URL}/search?keyword=${keyword}&page=${page??1}`)
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