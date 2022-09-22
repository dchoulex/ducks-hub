import { REQUEST_URL, USE_DUMMY } from "./requestConfigs";
import { rankPostSummary } from "../models/rankPostSummary";

const dummy: {data: rankPostSummary[], totalPage: number} = {
    data: [
    {
        "title": "SampleSkok",
        "summary": "いかがでしたか？",
        "timestamp": new Date("1999/02/19 18:18:00"),
        "postId": "JIWinXDJbj",
        "like": 4,
        "autherId": "jxwOJMKMD",
        "tags": ["Java", "Sample"],
        "authorName": "sampleUser",
        "rank": 1
    },
    {
        "title": "SampleSXWCwc",
        "summary": "2いかがでしたか？",
        "timestamp": new Date("1999/02/19 18:18:00"),
        "postId": "JIWWXDnJbj",
        "like": 0,
        "autherId": "jxwOJMKMD",
        "tags": ["Java", "Sample"],
        "authorName": "sampleUser",
        "rank": 2
    },
    {
        "title": "SampleSkok",
        "summary": "いかがでしたか？",
        "timestamp": new Date("1999/02/19 18:18:00"),
        "postId": "XOInekNKNEDC",
        "like": 124,
        "autherId": "jxwOJMKMD",
        "tags": ["Java", "Sample"],
        "authorName": "sampleUser",
        "rank": 3
    },
    {
        "title": "SampleSkok",
        "summary": "いかがでしたか？",
        "timestamp": new Date("1999/02/19 18:18:00"),
        "postId": "cedMOKMOwd",
        "like": 19834,
        "autherId": "jxwOJMKMD",
        "tags": ["Java", "Sample"],
        "authorName": "sampleUser",
        "rank": 4
    },
    {
        "title": "SampleSkok",
        "summary": "いかがでしたか？",
        "timestamp": new Date("1999/02/19 18:18:00"),
        "postId": "cdewJIOMDE",
        "like": 4222,
        "autherId": "jxwOJMKMD",
        "tags": ["Java", "Sample"],
        "authorName": "sampleUser",
        "rank": 5
    },
    {
        "title": "SampleSkok",
        "summary": "いかがでしたか？",
        "timestamp": new Date("1999/02/19 18:18:00"),
        "postId": "JIWinXDJbj",
        "like": 4,
        "autherId": "jxwOJMKMD",
        "tags": ["Java", "Sample"],
        "authorName": "sampleUser",
        "rank": 6
    },
    {
        "title": "SampleSXWCwc",
        "summary": "2いかがでしたか？",
        "timestamp": new Date("1999/02/19 18:18:00"),
        "postId": "JIWWXDnJbj",
        "like": 0,
        "autherId": "jxwOJMKMD",
        "tags": ["Java", "Sample"],
        "authorName": "sampleUser",
        "rank": 7
    },
    {
        "title": "SampleSkok",
        "summary": "いかがでしたか？",
        "timestamp": new Date("1999/02/19 18:18:00"),
        "postId": "XOInekNKNEDC",
        "like": 124,
        "autherId": "jxwOJMKMD",
        "tags": ["Java", "Sample"],
        "authorName": "sampleUser",
        "rank": 8
    },
    {
        "title": "SampleSkok",
        "summary": "いかがでしたか？",
        "timestamp": new Date("1999/02/19 18:18:00"),
        "postId": "cedMOKMOwd",
        "like": 19834,
        "autherId": "jxwOJMKMD",
        "tags": ["Java", "Sample"],
        "authorName": "sampleUser",
        "rank": 9
    },
    {
        "title": "SampleSkok",
        "summary": "いかがでしたか？",
        "timestamp": new Date("1999/02/19 18:18:00"),
        "postId": "cdewJIOMDE",
        "like": 4222,
        "autherId": "jxwOJMKMD",
        "tags": ["Java", "Sample"],
        "authorName": "sampleUser",
        "rank": 10
    }
    ],
    totalPage: 5
}

export const GetRanking = async (page?: number): Promise<{data: rankPostSummary[], totalPage: number}> => {
    if (USE_DUMMY) return dummy;

    const res = await fetch(`${REQUEST_URL}/popular?page=${page??1}`)
        .then(res => res.json());
    const data = res.data.map((r: any) => {return {
        "title": r.title,
        "summary": r.summary,
        "timestamp": new Date(r.timestamp),
        "postId": r.postid,
        "like": r.like,
        "autherId": r.userid,
        "rank": r.rank,
        "tags": r.tags,
        "authorName": r.name
    }});
    const totalPage = res.totalPage ? Number(res.totalPage) : 1;
    return {data: data.sort((d1: any, d2: any) => d1.rank - d2.rank), totalPage: totalPage};
}