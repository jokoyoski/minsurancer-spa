

const initialState = {
    services: [],
    subscriptions: []
};


function ServiceReducer(state = initialState, action) {


    if (action.type === "SERVICE_LIST") {
        var serviceDetails = {
            ...state,
            services: action.payload
        };
        return serviceDetails;
    }

    if (action.type === "SUBSCRIPTION_DROPDOWN_LIST") {
        var serviceDetails = {
            ...state,
            subscriptions: action.payload
        };
        return serviceDetails;
    }




    return state;
}

export default ServiceReducer;














