

const initialState = {
    subscriptions: [],
    locationTypes: [],
};


function SubscriptionReducer(state = initialState, action) {
   console.log(5656565656565)
     console.log(action.payload)
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














