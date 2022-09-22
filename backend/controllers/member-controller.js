import User from "../models/userModel.js";
import Member from "../models/memberModel.js";


export async function putMember(userid, organizationid) {
    try {
        const member = await Member.create({
            userid : userid,
            organizationid : organizationid
        })
        console.log(member);
    } catch(err) {
        
    }
}

export async function deleteMemberByUserid(userid) {
    try {
        await Member.deleteMany({userid : userid});
    } catch(err) {

    }
}