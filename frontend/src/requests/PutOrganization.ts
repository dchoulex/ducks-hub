import { REQUEST_URL, USE_DUMMY } from "./requestConfigs"

export const PutOrganization = async (name: string, mail?: string, greeting?: string): Promise<string> => {
    if (USE_DUMMY) return "QEXWoijck";

    const res = await fetch(REQUEST_URL + "/organizations", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({
            name: name,
            mail: mail ?? "",
            greeting: greeting ?? ""
        })
    }).then(res => res.json());
    return res.data.organizationid;
}