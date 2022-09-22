import Follow from "./../models/followModel.js";

export async function toggleFollow(req, res) {
    try {
        const followee = req.session.userid || "435412760";
        const follower = req.params.userid;

        const filterObject = {
            followee,
            follower
        };

        const follow = await Follow.findOne(filterObject);

        let current;

        if (follow) {
            await Follow.deleteOne(filterObject);
            current = false;
        } else {
            await Follow.create(filterObject);
            current = true;
        }

        res.status(200).json({
            status: "success",
            message: "Successfully toggle current follow",
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

export async function getFollow(req, res) {
    try {
        const followee = req.session.userid || "435412760";
        const follower = req.params.userid;

        const filterObject = {
            followee,
            follower
        }

        const follow = await Follow.findOne(filterObject);

        let current;

        if (follow) current = true;
        else current = false;

        res.status(200).json({
            status: "success",
            message: "Successfully get current follow",
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