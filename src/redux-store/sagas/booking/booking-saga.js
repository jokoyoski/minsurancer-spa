import { takeEvery, put } from "redux-saga/effects";
import { request } from '../../../api/Service';
import { getErrorMessage } from '../../../components/utils/errorHandler';
import { toast } from 'react-toastify';
import history from '../../../router/browserrouter';

export default function* waterGetBookingSaga() {
    yield takeEvery("LOAD_BOOKING", workerSaga);
}

function* workerSaga(action) {
    try {
        yield put({ type: "DISPLAY_LOADER" });
        let payload = {};
        var url = `api/SetUp/bookings/${action.payload}`;
        yield request("get", action.payload, url).then(response => {
            payload = response;
        });
       
        yield put({ type: "BOOKING_LIST", payload: payload.bookings })
        yield put({ type: "CURRENT_PAGE", payload: payload.currentPage })
        yield put({ type: "ITEMS_PER_PAGE", payload: payload.pageSize })
        yield put({ type: "TOTAL_ITEMS", payload: payload.totalCount })
        yield put({ type: "TOTAL_PAGES", payload: payload.totalPages })
        console.log(payload.totalCount)
        var formatUrl = 'api/SetUp/get-statuses-dropdown' ;
        yield request("get", action.payload, formatUrl).then(response => {
            payload = response;
        });
        yield put({ type: "STATUS_CATEGORY_DROPDOWN_LIST", payload: payload })
        yield put({ type: "DISPLAY_LOADER" });
    } catch (e) {
        yield put({ type: "LOADING_BUTTON_SPINNER" });
        console.log("booking-saga", e)
        yield put({ type: "DISPLAY_LOADER" });
        console.log("booking-saga", e.response)
        console.log(e.response)
        const errorMessage = getErrorMessage(e.response);
        toast.error(errorMessage);
        yield put({ type: "API_ERRORED", payload: e });
    }
}
