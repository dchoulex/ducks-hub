import Post from "../models/postModel.js";
import LinkedTag from "../models/linkedTagModel.js";
import User from "../models/userModel.js";

export async function searchByKeyword(req, res) {
    try {
        if (!req.query.keyword) {
            res.status(400).json(
                {
                    status: "fail",
                    message: "keywordを指定してください。"
                }
            )
            return;
        }
        //クエリからkeywordを取得
        const keywords = req.query.keyword.split(" ");
        let idset = new Set();
        for (let keyword of keywords){
            const reg = new RegExp("^" + keyword, "i");
            const posts = await Post.find({ title: reg }, { "_id": 0, "postid": 1 });
            posts.forEach(post => idset.add(post.postid));
            const linkedTags = await LinkedTag.find({tag: keyword});
            linkedTags.forEach(tag => idset.add(tag.postid));
        }
        //postのリスト毎にtagsを持ってくる
        let result = [];
        for (let id of idset) {
            const post = await Post.findOne({postid: id});
            if(!post) continue;
            const user = await User.findOne({ userid: post.userid });
            if(!user) continue;
            let tags = await LinkedTag.find({ postid: post.postid }, { "_id": 0, "tag": 1 });
            tags = tags.map(tag => tag.tag);
            const newPost = {
                postid: post.postid,
                title: post.title,
                summary: post.text.substr(0, 80),
                timestamp: post.timestamp,
                like: post.like,
                tags: tags,
                name: user.name
            }
            result.push(newPost);
        }

        res.status(200).json({
            status: "success",
            data: result
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err
        })
    }
}
