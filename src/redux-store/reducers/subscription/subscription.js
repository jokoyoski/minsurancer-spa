

const initialState = {
    subscriptions: [],
    locationTypes: [],
};


function SubscriptionReducer(state = initialState, action) {
    if (action.type === "SUBSCRIPTIONS_LIST") {
        var subscriptionDetails = {
            ...state,
            subscriptions: action.payload
        };
        return subscriptionDetails;
    }

    
    return state;
}

export default SubscriptionReducer;














