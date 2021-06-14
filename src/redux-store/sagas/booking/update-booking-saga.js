import { takeEvery, put } from "redux-saga/effects";
import { request } from '../../../api/Service';
import { getErrorMessage } from '../../../components/utils/errorHandler';
import { toast } from 'react-toastify';
import history from '../../../router/browserrouter';

export default function* watcherUpdateBookingSaga() {
    yield takeEvery("UPDATE_BOOKING", workerSaga);
}

function* workerSaga(action) {
    try {

        yield put({ type: "DISPLAY_LOADER" });
        let payload = {}
        var url=`update-booking/${action.payload.statusId}/${action.payload.transactionReference}`
        yield request("put",{},url).then(response => {
            payload = response;
        });
        var url = `bookings/1`;
        yield request("get", action.payload, url).then(response => {
            payload = response;
        });
        toast.success(payload)
        yield put({ type: "BOOKING_LIST", payload: payload.bookings })
        yield put({ type: "CURRENT_PAGE", payload: payload.currentPage })
        yield put({ type: "ITEMS_PER_PAGE", payload: payload.pageSize })
        yield put({ type: "TOTAL_ITEMS", payload: payload.totalCount })
        yield put({ type: "TOTAL_PAGES", payload: payload.totalPages })
        var formatUrl = 'api/SetUp/get-statuses-dropdown' ;
        yield request("get", action.payload, formatUrl).then(response => {
            payload = response;
        });
        yield put({ type: "STATUS_CATEGORY_DROPDOWN_LIST", payload: payload })
        yield put({ type: "DISPLAY_LOADER" });
    } catch (e) {
        console.log("update-product-saga",e)
        console.log("update-product-saga",e.response)
        yield put({ type: "LOADING_BUTTON_SPINNER" });
        yield put({ type: "DISPLAY_LOADER" });
        const errorMessage = getErrorMessage(e.response);
        toast.error(errorMessage);
        yield put({ type: "API_ERRORED", payload: e });
    }
}
