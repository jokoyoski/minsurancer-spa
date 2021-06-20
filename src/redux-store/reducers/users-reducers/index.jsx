const initialState = {
    users: [],
    userLocations: [],
    roles:[],
    companyLocations: []

};

function usersReducer(state = initialState, action) {

    if (action.type === "USERS_LIST") {
        var usersdetails = {
            ...state,
            users: action.payload
        };
        return usersdetails;
        
    }
    if (action.type === "ROLES_DROPDOWN_LIST") {
        var locationDetails = {
            ...state,
            roles: action.payload
        };
        return locationDetails;
    }
    if (action.type === "COMPANY_LOCATION_LIST") {
        var locationDetails = {
            ...state,
            companyLocations: action.payload
        };
        console.log(locationDetails)
        return locationDetails;
    }



    return state;
}

export default usersReducer;