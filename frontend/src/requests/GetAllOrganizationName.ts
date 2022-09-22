import { REQUEST_URL, USE_DUMMY } from "./requestConfigs";

const dummy: OrganizationName[] = [
    {
        id: "Wojiojns",
        name: "IJDS"
    },
    {
        id: "JXEOjnks",
        name: "IBMJ"
    }
]

export interface OrganizationName {
    id: string;
    name: string
}

export const GetAllOrganizationName = async (): Promise<OrganizationName[]> => {
    if (USE_DUMMY) return dummy;

    const res = await fetch(REQUEST_URL + "/organizations")
        .then(res => res.json());
    return res.data.map((r: any) => {
        return {
            id: r.organizationid,
            name: r.name
        }
    });
}