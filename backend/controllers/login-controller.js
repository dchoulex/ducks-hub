import User from "../models/userModel.js";

export async function getLogin(req, res) {
    try {
        //もしテーブルにIDが入っていたらtrueをかえす。
        if(req.query.userid){
            const user = await User.findOne({userid: req.query.userid});
            if(!user){
                res.status(200).json({
                    status : "success",
                    data:{result: false}
                });
            }else{
                req.session.userid = req.query.userid;
                res.status(200).json({
                    status : "success",
                    data:{result: true}
                });
            }
        }else{
            res.status(400).json({
                status: "fail",
                message: "ユーザIDを指定してください"
            });
        }
    } catch(err) {
        res.status(400).json({
            status: "fail",
            message: err
        });
    }
}