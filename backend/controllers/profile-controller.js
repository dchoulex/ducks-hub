import User from "../models/userModel.js";
import Member from "../models/memberModel.js";
import {putMember, deleteMemberByUserid} from "./member-controller.js";

export async function getProfile(req, res) {
        try {
            const selectedUserid = req.params.userid;
            const user = await User.findOne({userid : selectedUserid});
            const organizationids = await Member.find({userid : selectedUserid});
            if(req.params.userid){
                res.status(200).json({
                    status : "success",
                    data : {
                        name : user.name,
                        slackid : user.slackid,
                        mail : user.mail,
                        greeting : user.greeting,
                        organizationids
                    }
                });
            } 
            
        } catch(err) {
            res.status(400).json({
                status: "fail",
                message: err
            })
        }
    }

 /*   export function getMyProfile(req, res) {
            try {
                console.log("getMyProfile")
                console.log(req.session);
                if(req.session.userid){
                    res.status(200).json({
                        status : "success",
                        data : {
                            userid : req.session.userid,
                            name : "秋元弘太",
                            slackid : "@kouta.akimoto",
                            mail : "kouta.akimoto@ibm.com",
                            organizationids : ["oUhfbwifu0", "oPWF87sbNC"],
                            greeting : "よろしくお願いします。"
                        }
                    })
                }  
            } catch(err) {
                res.status(404).json({
                    status: "fail",
                    message: err
                })
            }
        }

export function postProfile(req, res) {
        try {
            const name = req.body.name;
            const slackid = req.body.slackid;
            const mail = req.body.mail;
            const greeting = req.body.greeting;
            const organizationids = req.body.organizationids;
            
            if(!name || !mail){
                res.status(400).json({
                    status : "fail",
                    message : "name, slackid, mailは必須です。"
                });
            }
            
            res.status(200).json({
                status : "success",
                data : {userid : 2}
            })  
        } catch(err) {
            res.status(404).json({
                status: "fail",
                message: err
            })
        }
    }
*/
export async function putProfile(req, res) {
        try {
            if(!req.session.userid){
                res.status(400).json({
                    status : "fail",
                    message : "セッションが無効です"
                });
                return;
            }
            if(!req.body.name || !req.body.mail){
                res.status(400).json({
                    status : "fail",
                    message : "名前、メールを指定してください"
                });
                return;
            }
            const user = await User.findOneAndUpdate(
                {userid : req.session.userid},
                req.body,
                {runValidator:true, new: true});
            if(user === null){
                req.body.userid = req.session.userid;
                const newUser = await User.create(req.body);
                req.body.organizationids.forEach(async function(id){
                    await putMember(newUser.userid, id)
                });
                res.status(201).json({
                    status : "success",
                    message : newUser.name + "が作成されました",
                    data : {
                            userid : req.session.userid
                        }
                });
            }else{
                await deleteMemberByUserid(user.userid);
                req.body.organizationids.forEach(async function(id){
                     await putMember(user.userid, id);
                });
                res.status(200).json({
                    status : "success",
                    message : user.name + "が変更されました",
                    data : {}
                });
            }
        } catch(err) {
            res.status(400).json({
                status: "fail",
                message: err
            })
        }
    }

    