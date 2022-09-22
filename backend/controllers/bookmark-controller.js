import Bookmark from "./../models/bookmarkModel.js";

export async function toggleBookmark(req, res) {
    try {
        const userId = req.session.userid || "435412760";
        const postId = req.params.postid;

        const filterObject = {
            postid: postId,
            userid: userId
        };

        const bookmark = await Bookmark.findOne(filterObject);

        let current;

        if (bookmark) {
            await Bookmark.deleteOne(filterObject);
            current = false;
        } else {
            await Bookmark.create(filterObject);
            current = true;
        }

        res.status(200).json({
            status: "success",
            message: "Successfully toggle current bookmark",
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

export async function getBookmark(req, res) {
    try {
        const userId = req.session.userid || "435412760";
        const postId = req.params.postid;

        const filterObject = {
            userid: userId,
            postid: postId
        }

        const bookmark = await Bookmark.findOne(filterObject);

        let current;

        if (bookmark) current = true;
        else current = false;

        res.status(200).json({
            status: "success",
            message: "Successfully get current bookmark",
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