import { POPULAR_LIMIT } from "./../config.js";

// Import data model 
import Post from "./../models/postModel.js";
import User from "./../models/postModel.js";
import LinkedTag from "../models/linkedTagModel.js";

export async function getPopular(req, res) {
    try {
        const popularPosts = await Post.find().sort("-like").limit(POPULAR_LIMIT);
        const data = [];

        for (let i = 0; i < popularPosts.length; i++) {
            const popularPost = popularPosts[i];
            const postId = popularPost.postid;

            const userId = popularPost.userid;
            const user = User.findOne({ userid: userId });

            const textLength = popularPost.text.length;
            let summary = popularPost.text;

            const tags = await LinkedTag.find({ postid : postId });
            const tagNames = tags.map(tag => tag.tag);
            
            if (textLength >= 80) {
                summary = popularPost.text.slice(0, 80) + "...";
            }

            const newPostData = {
                postid: postId,
                title: popularPost.title,
                summary,
                timestamp: popularPost.timestamp,
                userid: popularPost.userid,
                rank: i + 1,
                tags: tagNames,
                like: popularPost.like,
                name: user.name
            }

            data.push(newPostData);
        }
        
        res.status(200).json({
            status: "success",
            data
        })
    } catch(err) {
        res.status(400).json({
            status: "fail",
            message: err
        })
    }
}