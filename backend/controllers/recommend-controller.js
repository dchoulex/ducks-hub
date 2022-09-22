import Post from "../models/postModel.js";
import LinkedTag from "../models/linkedTagModel.js";
import Likes from "../models/likeModel.js";
import User from "../models/userModel.js";

export async function getRecommend(req, res) {
    try {
        if (!req.session.userid) {
            res.status(400).json(
                {
                    status: "fail",
                    message: "セッションが無効です"
                }
            )
            return;
        }
        //useridからpostidのリストを取得
        const selectedUserId = req.session.userid;
        const likes = await Post.find({ userid: selectedUserId });
        //postidの毎にtagsを参照し、カウント
        let tagCounts = {};
        for (let like of likes) {
            
            let tags = await LinkedTag.find({ postid: like.postid }, { "_id": 0, "tag": 1 });
            if(!tags) continue;
            tags = tags.map(tag => tag.tag);
            for(const tag of tags){
                if(tagCounts[tag]){
                    tagCounts[tag]+=1;
                }else{
                    tagCounts[tag]=1;
                }
            }
        }
        //タグのソート
        var tagArray = Object.keys(tagCounts).map((k)=>({ key: k, value: tagCounts[k] }));
        tagArray.sort((a, b) => b.value - a.value);
        const ranking = tagArray.reduce((ranking, tag)=>{
            ranking.push(tag.key);
            return ranking;
        },[])
        //上位3つのタグを含むポストを検索して加工して返す
        const linkedTags = await LinkedTag.find({tag: {$in : ranking.slice(0,3)}});
        let result = [];
        for (let linkedTag of linkedTags) {
            const post = await Post.findOne({postid: linkedTag.postid});
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