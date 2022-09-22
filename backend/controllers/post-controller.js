import Post from "../models/postModel.js";
import Comment from "../models/commentModel.js";
import generateId from "./generateId.js";
import Tag from "../models/tagModel.js";
import LinkedTag from "../models/linkedTagModel.js";
import User from "../models/userModel.js";

export async function getPost(req, res) {
    try {
        const selectedPostId = req.params.postid;
        const foundPost = await Post.findOne({ postid : selectedPostId });
        
        const comment = await Comment.find({ postid : selectedPostId });
        const commentId = comment.map(comment => comment.commentid);

        const userId = foundPost.userid;
        const user = await User.findOne({ userid: userId });

        const tags = await LinkedTag.find({ postid : selectedPostId });
        const tagNames = tags.map(tag => tag.tag)

        res.status(200).json({
            status: "success",
            data: {
                postid: foundPost.postid,
                title: foundPost.title,
                text: foundPost.text,
                timestamp: foundPost.timestamp,
                like: foundPost.like,
                userid: foundPost.userid,
                commentid: commentId,
                name: user.name,
                tags: tagNames
            }
        });
    } catch(err) {
        res.status(400).json({
            status: "fail",
            message: err
        })
    }
}

export async function uploadPost(req, res) {
    try {
        const newPostId = generateId("post");
        req.body.postid = newPostId;

        const userId = req.session.userid || "435412760";
        req.body.userid = userId;

        const newPost = await Post.create(req.body);

        await createNewTags(req.body.tags);

        await createLinkedTags(newPostId, req.body.tags);
        
        res.status(200).json({
            status: "success",
            data: {
                postid: newPost.postid
            }
        })
    } catch(err) {
        res.status(400).json({
            status: "fail",
            message: err
        })
    }
}

async function createNewTags(tags) {
    try {
        const existingTags = await Tag.find();
        const existingTagNames = existingTags.map(existingTag => existingTag.tag);

        for (const tag of tags) {
            if (existingTagNames.includes(tag)) continue;

            const tagObject = {
                tag
            }

            await Tag.create(tagObject);
        }
    } catch(err) {
        res.status(400).json({
            status: "fail",
            message: "Tag already exist"
        }) 
    }
}

async function createLinkedTags(postid, tags) {
    try {
        const existingLinkedTags = await LinkedTag.find();
        const existingLinkedTagNames = existingLinkedTags.map(existingLinkedTag => existingLinkedTag.tag);

        for (const tag of tags) {
            if (existingLinkedTagNames.includes(tag)) continue;

            const linkedTagObject = {
                postid: postid,
                tag: tag
            };

            await LinkedTag.create(linkedTagObject);
        }
    } catch(err) {
        res.status(400).json({
            status: "fail",
            message: err
        }) 
    }
}

export async function updatePost(req, res) {
    try {
        const selectedPostId = req.params.postid;

        const post = await Post.findOneAndUpdate({ postid: selectedPostId}, req.body, {
            new: true,
            runValidators: true
        });

        await LinkedTag.deleteMany({ postid: selectedPostId });

        for (const tag of req.body.tags) {
            const tagObject = {
                postid: selectedPostId,
                tag
            }

            await LinkedTag.create(tagObject);
        }

        res.status(200).json({
            status: "success",
            message: "Successfully uploaded your post"
        })
    } catch(err) {
        res.status(400).json({
            status: "fail",
            message: err
        })
    }
}