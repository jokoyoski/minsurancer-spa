
const initialState = {
    productCategories:[]
};


function ProductCategoryReducer(state = initialState, action) {


    if (action.type === "PRODUCT_CATEGORY_LIST") {
        var usersdetails = {
            ...state,
            productCategories: action.payload
        };
        return usersdetails;
    }



    return state;
}

export default ProductCategoryReducer;














