import names from "../data/action_names.json";
// auth actions
export const setUser = (user) => {
    return {
        type: names.auth.setUser,
        user: user,
    }
};
export const setWallet = (wallet) => {
    return {
        type: names.auth.setWallet,
        wallet: wallet,
    }
};
// home actions
export const setFlights = (homeData) => {
    return {
        type: names.home.setFlights,
        homeData
    }
};
export const setSearchItems = (homeData) => {
    return {
        type: names.home.setSearchItems,
        homeData
    }
};
