import { takeEvery, put } from "redux-saga/effects";
import { request } from '../../../api/Service';
import { getErrorMessage } from '../../../components/utils/errorHandler';
import { toast } from 'react-toastify';

export default function* watcherGetTicketsSaga() {
    yield takeEvery("LOAD_TICKETS", workerSaga);
}

function* workerSaga(action) {
    try {
        yield put({ type: "DISPLAY_LOADER", payload: payload })
        var payload = {}
        const formatUrl = `api/SetUp/get-tickets/${action.payload}`
        yield request("get", payload, formatUrl).then(response => {
            payload = response;
        });
        yield put({ type: "TICKET_LIST", payload: payload.orders })
        yield put({ type: "DISPLAY_LOADER", payload: payload })
        yield put({ type: "CURRENT_PAGE", payload: payload.currentPage })
        yield put({ type: "ITEMS_PER_PAGE", payload: payload.pageSize })
        yield put({ type: "TOTAL_ITEMS", payload: payload.totalCount })
        yield put({ type: "TOTAL_PAGES", payload: payload.totalPages })
    
        var newFormatUrl = 'api/SetUp/get-priorities-dropdown' ;
        yield request("get", {}, newFormatUrl).then(response => {
            payload = response;
        });
        console.log(payload)
        yield put({ type: "PRIORITIES_DROPDOWN_LIST", payload: payload })

           
    } catch (e) {
        yield put({ type: "LOADING_BUTTON_SPINNER" });
        console.log("ticket-saga", e)
        console.log("ticket-saga", e.response)
        console.log(e.response)
        const errorMessage = getErrorMessage(e.response);
        toast.error(errorMessage);
        yield put({ type: "API_ERRORED", payload: e });
        yield put({ type: "DISPLAY_LOADER", payload: payload })

    }
}
