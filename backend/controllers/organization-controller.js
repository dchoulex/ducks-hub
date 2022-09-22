import Organization from "../models/organizationModel.js";
import generateId from "./generateId.js";

export async function getOrganizations(req, res) {
    try {
        //DBにアクセスして、組織のnameとorganizationidのリストを取得
        const organizations = await Organization.find();
        const org_pair = organizations.reduce((result, obj) => {
            const objResult = {
                name : obj.name,
                organizationid : obj.organizationid
            }
            result.push(objResult);
            return result;
        }, []);
        res.status(200).json({
            status : "success",
            data: org_pair
        })

    } catch(err) {
        res.status(400).json({
            status: "fail",
            message: err
        })
    }
}

export async function putOrganization(req, res) {
    try {
        if(!req.body.name){
            res.status(400).json({
                status : "fail",
                message : "名前を指定してください"
            });
            return;
        }
        //nameが同じ
        const org = await Organization.findOneAndUpdate(
            {name : req.body.name}, 
            req.body,
            {runValidator: true, new: true});
        if(org === null){
            const newOrgId = generateId("organization");

            req.body.organizationid = newOrgId;
            const newOrg = await Organization.create(req.body);
            res.status(201).json({
                status : "success",
                message : req.body.organizationid + "が作成されました",
                data : {
                        organizationid : newOrgId
                    }
            }); 
            return;
        }

        res.status(200).json({
            status : "success",
            message : org.name + "が変更されました",
            data : {}
        });

        
    } catch(err) {
        res.status(400).json({
            status: "fail",
            message: err
        })
    }
}

export async function getOrganization(req, res) {
    try {
        const selectedOrganizationId = req.params.organizationid;
        const org = await Organization.findOne({organizationid : selectedOrganizationId});
        
        res.status(200).json({
            status : "success",
            data : org
        });
    } catch(err) {
        res.status(400).json({
            status: "fail",
            message: err
        })
    }
}