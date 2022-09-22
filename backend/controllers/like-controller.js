import Like from "./../models/likeModel.js";
import Post from "./../models/postModel.js";

export async function toggleLike(req, res) {
    try {
        const userId = req.session.userid || "testUserId";
        const postId = req.params.postid;

        const filterObject = {
            userid: userId,
            postid: postId
        };

        const like = await Like.findOne(filterObject);

        let current;
        let likeCounter;

        if (like) {
            await Like.deleteOne(filterObject);

            likeCounter = -1;
            current = false;
        } else {
            await Like.create({
                userid: userId,
                postid: postId
            });

            likeCounter = 1;
            current = true;
        }

        await updatePostLike(postId, likeCounter)

        res.status(200).json({
            status: "success",
            message: "Successfully toggle current like",
            data: {
                current
            }
        });
    } catch(err) {
        res.status(400).json({
            status: "fail",
            message: err
        })
    }
}

async function updatePostLike(postId, likeCounter) {
    const post = await Post.findOne({ postid: postId });

    const currentLike = post.like + likeCounter;

    const update = {
        title: "This is updated",
        like: currentLike
    }

    await Post.findOneAndUpdate({ postid: postId}, update, {
        new: true,
        runValidators: true
    });
}

export async function getCurrentLike(req, res) {
    try {
        const userId = req.session.userid || "435412760";
        const postId = req.params.postid;

        const filterObject = {
            userid: userId,
            postid: postId
        }

        const like = await Like.findOne(filterObject);

        let current;

        if (like) current = true;
        else current = false;

        res.status(200).json({
            status: "success",
            message: "Successfully get current like",
            data: {
                current
            }
        })
    } catch(err) {
        res.status(400).json({
            status: "fail",
            message: err
        })
    }
}