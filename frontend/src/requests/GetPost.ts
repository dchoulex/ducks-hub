import { post } from "../models/post";
import { comment } from "../models/comment"
import { GetComment } from "./GetComment";
import { REQUEST_URL, USE_DUMMY } from "./requestConfigs";

const dummy: post = {
    "postId": "hohiWnkQLKk",
    "title": "サンプル記事",
    "timestamp": new Date("2022/06/07 14:24:17"),
    "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur quis felis risus. Nullam est quam, egestas at hendrerit nec, venenatis vel urna. Ut leo leo, pharetra sed hendrerit vel, malesuada non elit. Pellentesque nec tortor ut lacus pretium interdum. Proin in aliquet lorem, ultricies placerat nibh. Proin pretium felis sit amet nunc pulvinar porttitor. Proin quis orci eget sapien porta mollis. Nulla facilisi. Curabitur elit velit, imperdiet vitae metus eu, hendrerit aliquet lectus.\nCurabitur sollicitudin magna sit amet ipsum condimentum imperdiet. Nullam aliquet lectus orci, eu interdum nulla blandit quis. Nam consectetur nisl egestas tempor auctor. Donec sagittis, est eu cursus rutrum, felis risus malesuada dui, a interdum metus est nec felis. Proin vel mattis mauris, sed porta ex. Proin ut ultrices diam, a egestas velit. Integer efficitur enim quis eleifend mattis. Phasellus facilisis justo a massa efficitur venenatis. Proin in interdum quam, faucibus mattis tortor. Morbi vestibulum dolor vel nisl mattis semper. Praesent molestie luctus leo. In eu nunc quis est laoreet placerat. Vivamus tristique feugiat congue. Nam ac ligula dui.",
    "comments": [{
        "commentId": "JWOjWNmnLK",
        "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec porta odio, sit amet congue mauris. Nam scelerisque pulvinar leo vel porttitor. Sed convallis rutrum sapien, quis scelerisque dolor mollis.",
        "timestamp": new Date("2022/06/07 14:30:23"),
        "userId": "oiJWjmkKml",
        "name": "User1"
    }],
    "tags": ["Java", "Hoge", "サンプル"],
    "like": 3,
    "autherId": "jxwOJMKMD",
    "authorName": "sampleUser"
}

export const GetPost = async (postId: string): Promise<post> => {
    if (USE_DUMMY) return dummy;
    
    const res = await fetch(REQUEST_URL + "/posts/" + postId)
        .then(res => res.json());
    
    let comments: comment[] = [];
    try{
        comments = await Promise.all(res.data.commentid.map((c: any) => GetComment(c)));
    } catch(e) {
        console.error(e);
    }

    return {
        postId: postId,
        title: res.data.title,
        timestamp: new Date(res.data.timestamp),
        text: res.data.text,
        comments: comments,
        tags: res.data.tags,
        like: res.data.like,
        autherId: res.data.userid,
        authorName: res.data.name
    }
}