import { text } from "stream/consumers";
import { profile } from "../models/profile";
import { REQUEST_URL, USE_DUMMY } from "./requestConfigs";

export const PutProfile = async (profile: profile) => {
    if (USE_DUMMY) return;

    const res = await fetch(REQUEST_URL + "/profile", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({
            slackid: profile.slackId,
            name: profile.name,
            mail: profile.mail,
            organizationids: profile.organizationIds,
            greeting: profile.greeting
        })
    }).then(res => res.json());
}