import { profile } from "../models/profile"
import { REQUEST_URL, USE_DUMMY } from "./requestConfigs";

const dummy: profile = {
    name: "サンプル太郎",
    slackId: "sample",
    mail: "sample@sample.com",
    greeting: "こんにちは",
    organizationIds: ["Wojiojns", "JXEOjnks"],
    userId: "WXSjjxdkkm"
}


export const GetProfile = async (userId: string): Promise<profile> => {
    if (USE_DUMMY) return dummy;

    const res = await fetch(REQUEST_URL + "/profile/" + userId)
        .then(res => res.json());
    return {
        "userId": userId,
        "slackId": res.data.slackid,
        "organizationIds": res.data.organizationids,
        "mail": res.data.mail,
        "greeting": res.data.greeting,
        "name": res.data.name
    }
}