

const initialState = {
    products: [],
    categories: []
};


function ProductReducer(state = initialState, action) {


    if (action.type === "PRODUCT_LIST") {
        var productDetails = {
            ...state,
            products: action.payload
        };
        return productDetails;
    }

    if (action.type === "PRODUCT_CATEGORY_DROPDOWN_LIST") {
        var productDetails = {
            ...state,
            categories: action.payload
        };
        return productDetails;
    }




    return state;
}

export default ProductReducer;














