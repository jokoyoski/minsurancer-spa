const initialState = {
    triggerLogging: false,
    users: null,
    user: null,
    userType: null,
    isRegisterSuccessful: false,
    firstName:null,
    roles: [],
    industries: null,
    companyId:null,
    access: null,
    cacNumber: null
};


function UserReducer(state = initialState, action) {


    if (action.type === "USERS_DETAILS") {
        var userdetails = {
            ...state,
            user: action.payload
        };
        return userdetails;

    }

    if (action.type === "SET_CAC_NUMBER") {
        var userdetails = {
            ...state,
            cacNumber: action.payload
        };
        return userdetails;

    }

    if (action.type === "SET_FIRST_NAME") {
        var userdetails = {
            ...state,
            firstName: action.payload
        };
        return userdetails;

    }

    if (action.type === "COMPANY_ID") {
        var userdetails = {
            ...state,
            companyId: action.payload
        };
        return userdetails;

    }

    if (action.type === "SET_INDUSTRIES") {

        return {
            ...state,
            industries: action.payload
        } 
    }


    if (action.type === "SET_ROLES") {
        var userdetails = {
            ...state,
            roles: action.payload
        };
        return userdetails;

    }
    if (action.type === "SET_USER_TYPE") {
        var userdetails = {
            ...state,
            userType: action.payload
        };
        return userdetails;

    }

    if (action.type === "SET_USER_ID") {
        var userdetails = {
            ...state,
            userId: action.payload
        };
        return userdetails;

    }


    if (action.type === "SET_ACCESS_TOKEN") {
        var userdetails = {
            ...state,
            access: action.payload
        };
        return userdetails;

    }



    if (action.type === "TRIGGER_LOGIN_SUCCESS") {
        return {
            ...state,
            triggerLogging: !state.payload
        };
    }

    if (action.type === "TRIGGER_REGISTER_SUCCESS") {
        return {
            ...state,
            isRegisterSuccessful: !state.payload
        };

    }


    return state;
}

export default UserReducer;














