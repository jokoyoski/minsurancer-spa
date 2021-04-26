

const initialState = {
    bookings: [],
    statuses: []
};


function BookingReducer(state = initialState, action) {


    if (action.type === "BOOKING_LIST") {
        var bookingDetails = {
            ...state,
            bookings: action.payload
        };
        return bookingDetails;
    }

    if (action.type === "STATUS_CATEGORY_DROPDOWN_LIST") {
        var bookingDetails = {
            ...state,
            statuses: action.payload
        };
        return bookingDetails;
    }
    return state;
}

export default BookingReducer;














