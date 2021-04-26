

const initialState = {
    locations: [],
    locationTypes: [],
};


function LocationReducer(state = initialState, action) {


    if (action.type === "LOCATIONS_LIST") {
        var locationDetails = {
            ...state,
            locations: action.payload
        };
        return locationDetails;
    }

    if (action.type === "LOCATION_TYPE_DROPDOWN_LIST") {
        var locationDetails = {
            ...state,
            locationTypes: action.payload
        };
        return locationDetails;
    }

    return state;
}

export default LocationReducer;














