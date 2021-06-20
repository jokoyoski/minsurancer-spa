import { takeEvery, put } from "redux-saga/effects";
import { request } from '../../../api/Service';
import { getErrorMessage } from '../../../components/utils/errorHandler';
import { toast } from 'react-toastify';
import history from '../../../router/browserrouter';

export default function* watcherUpdateTicketSaga() {
    yield takeEvery("UPDATE_TICKET", workerSaga);
}

function* workerSaga(action) {
    try {
        yield put({ type: "DISPLAY_LOADER" });
        let payload = {}
        var formatUrl=`api/SetUp/update-ticket`
        yield request("post",action.payload,formatUrl).then(response => {
            payload = response;
        });
         formatUrl = `api/SetUp/get-tickets/1`
        yield request("get", action.payload, formatUrl).then(response => {
            payload = response;
        });
        toast.success(payload)
        yield put({ type: "TICKET_LIST", payload: payload.orders })
        yield put({ type: "CURRENT_PAGE", payload: payload.currentPage })
        yield put({ type: "ITEMS_PER_PAGE", payload: payload.pageSize })
        yield put({ type: "TOTAL_ITEMS", payload: payload.totalCount })
        yield put({ type: "TOTAL_PAGES", payload: payload.totalPages })
         formatUrl = 'api/SetUp/get-priorities-dropdown' ;
        yield request("get", action.payload, formatUrl).then(response => {
            payload = response;
        });
        yield put({ type: "PRIORITIES_DROPDOWN_LIST", payload: payload })
        yield request("get", action.payload, formatUrl).then(response => {
            payload = response;
        });
        formatUrl = 'api/SetUp/get-ticket-types-dropdown' ;
        yield put({ type: "TICKET_TYPES_DROPDOWN_LIST", payload: payload })
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
