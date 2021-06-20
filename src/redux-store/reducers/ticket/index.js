
const initialState = {
    tickets:[],
    ticketTypes:[],
    priorities:[]
};


function TicketReducer(state = initialState, action) {


    if (action.type === "TICKET_LIST") {
        var ticketDetails = {
            ...state,
            tickets: action.payload
        };
        return ticketDetails;
    }
    if (action.type === "PRIORITIES_DROPDOWN_LIST") {
        var ticketDetails = {
            ...state,
            priorities: action.payload
        };
        return ticketDetails;
    }
    if (action.type === "TICKET_TYPES_DROPDOWN_LIST") {
        var ticketDetails = {
            ...state,
            ticketTypes: action.payload
        };
        return ticketDetails;
    }
    return state;
}

export default TicketReducer;














