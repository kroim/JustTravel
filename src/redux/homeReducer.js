import names from "../data/action_names";
let initialState = {flights: [], searchItems: {origin: '', destination: '', from: '', to: ''}};

const homeReducer = (state = initialState, action) => {
    switch (action.type) {
        case names.home.setFlights:
            const flights = action.homeData;
            return {...state, flights: flights};
        case names.home.setSearchItems:
            const searchItems = action.homeData;
            return {...state, searchItems: searchItems};
        default:
            return state;
    }
};

export default homeReducer;
