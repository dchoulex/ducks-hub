import Post from "../models/postModel.js";
import LinkedTag from "../models/linkedTagModel.js";
import User from "../models/userModel.js";
import Likes from "../models/likeModel.js";
import Bookmarks from "../models/bookmarkModel.js";

export async function getUserIndice(req, res) {
    try {
        if (!req.params.userid) {
            res.status(400).json(
                {
                    status: "fail",
                    message: "useridを指定してください。"
                }
            )
            return;
        }
        //useridからpostのリストを取得
        const selectedUserId = req.params.userid;
        const foundPosts = await Post.find({ userid: selectedUserId });
        //postのリスト毎にtagsを持ってくる
        let result = [];
        for (let post of foundPosts) {
            const user = await User.findOne({ userid: post.userid });
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

export async function getUserLikes(req, res) {
    try {
        if (!req.params.userid) {
            res.status(400).json(
                {
                    status: "fail",
                    message: "useridを指定してください。"
                }
            )
            return;
        }
        //useridからpostidのリストを取得
        const selectedUserId = req.params.userid;
        const likes = await Like.find({ userid: selectedUserId });
        //postidの毎にpost,tags,nameを持ってくる
        let result = [];
        for (let like of likes) {
            const post = await Post.find({postid : like.postid});
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

export async function getUserBookmarks(req, res) {
    try {
        if (!req.params.userid) {
            res.status(400).json(
                {
                    status: "fail",
                    message: "useridを指定してください。"
                }
            )
            return;
        }
        //useridからpostのリストを取得
        const selectedUserId = req.params.userid;
        const bookmarks = await Bookmark.find({ userid: selectedUserId });
        //postのリスト毎にtagsを持ってくる
        let result = [];
        for (let bookmark of bookmarks) {
            const post = await Post.find({postid : bookmark.postid});
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