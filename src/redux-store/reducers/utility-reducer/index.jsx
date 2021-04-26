const initialState = {
    buttonloader: false,
    spinner: false,
    currentPage:1,
    itemsPerPage:0,
    totalItems:0,
    totalPages:0
    
};

function UtilityReducer(state = initialState, action) {
    if (action.type === "LOADING_BUTTON_SPINNER") {

        return {
            ...state,
            buttonloader: !state.buttonloader
        } 
    }


    if (action.type === "DISPLAY_LOADER") {
        return {
            ...state,
            spinner: !state.spinner
        }
    }

    if (action.type === "CURRENT_PAGE") {
        return {
            ...state,
            currentPage: action.payload
        }
    }

    if (action.type === "ITEMS_PER_PAGE") {
        return {
            ...state,
            itemsPerPage: action.payload
        }
    }

    if (action.type === "TOTAL_ITEMS") {
        return {
            ...state,
            totalItems: action.payload
        }
    }

    if (action.type === "TOTAL_PAGES") {
        return {
            ...state,
            totalPages: action.payload
        }
    }
    return state;
}

export default UtilityReducer;