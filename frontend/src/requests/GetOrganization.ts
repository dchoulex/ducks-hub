import { organization } from "../models/organization"
import { REQUEST_URL, USE_DUMMY } from "./requestConfigs";

const dummy: organization = {
    organizationId: "WijWbjnWkmkx",
    name: "Sample Organization",
    mail: "sample@sample.org",
    greeting: "ｋSWおこｋZNWおのいDWJ"
}

export const GetOrganization = async (organizationId: string): Promise<organization> => {
    if (USE_DUMMY) return dummy;

    const res = await fetch(REQUEST_URL + "/organizations/" + organizationId)
        .then(res => res.json());
    return {
        "organizationId": organizationId,
        "mail": res.data.mail,
        "name": res.data.name,
        "greeting": res.data.greeting
    }
}