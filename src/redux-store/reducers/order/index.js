
const initialState = {
    orders:[]
};


function OrderReducer(state = initialState, action) {


    if (action.type === "ORDER_LIST") {
        var orderDetails = {
            ...state,
            orders: action.payload
        };
        return orderDetails;
    }



    return state;
}

export default OrderReducer;














