class SessionStorage {
    static SetUserId = (userId: string) => {
        sessionStorage.setItem("USER_ID", userId);
    }

    static GetUserId = () => {
        return sessionStorage.getItem("USER_ID");
    }

    static SetHomeTabIndex = (index: number) => {
        sessionStorage.setItem("HOME_INDEX", "" + index);
    }

    static GetHomeTabIndex = () => {
        const indexStr = sessionStorage.getItem("HOME_INDEX");
        return Number.isNaN(indexStr) ? 0 : Number(indexStr);
    }

    static SetProfileTabIndex = (index: number, userId: string) => {
        sessionStorage.setItem(`PROFILE_INDEX_${userId}`, "" + index);
    }

    static GetProfileTabIndex = (userId: string) => {
        const indexStr = sessionStorage.getItem(`PROFILE_INDEX_${userId}`);
        return Number.isNaN(indexStr) ? 0 : Number(indexStr);
    }
}

export default SessionStorage;