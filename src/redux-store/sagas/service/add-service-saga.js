import { takeEvery, put } from "redux-saga/effects";
import { request } from '../../../api/Service';
import { getErrorMessage } from '../../../components/utils/errorHandler';
import { toast } from 'react-toastify';
import history from '../../../router/browserrouter';

export default function* watcherAddServiceSaga() {
    yield takeEvery("ADD_SERVICE", workerSaga);
}

function* workerSaga(action) {
    try {
        yield put({ type: "DISPLAY_LOADER" });
        let payload = {};
       var url='api/SetUp/add-service'
       yield request("post", action.payload, url).then(response => {
            payload = response;
        });
        toast.success(payload)
        var formatUrl = 'api/SetUp/get-services/1';
        yield request("get", action.payload, formatUrl).then(response => {
            payload = response;
        });
        yield put({ type: "SERVICE_LIST", payload: payload.services })
        yield put({ type: "CURRENT_PAGE", payload: payload.currentPage })
        yield put({ type: "ITEMS_PER_PAGE", payload: payload.pageSize })
        yield put({ type: "TOTAL_ITEMS", payload: payload.totalCount })
        yield put({ type: "TOTAL_PAGES", payload: payload.totalPages })
       // yield put({ type: "DISPLAY_LOADER", payload: payload })
        formatUrl = 'api/SetUp/get-subscription-dropdown/'
        yield request("get", action.payload, formatUrl).then(response => {
            payload = response;
        });
        yield put({ type: "SUBSCRIPTION_DROPDOWN_LIST", payload: payload })
        yield put({ type: "DISPLAY_LOADER" });
    } catch (e) {
        yield put({ type: "LOADING_BUTTON_SPINNER" });
        console.log("add-subscription-saga",e)
        yield put({ type: "DISPLAY_LOADER" });
        console.log("add-subscription-saga",e.response)
        console.log(e.response)
        const errorMessage = getErrorMessage(e.response);
        toast.error(errorMessage);
        yield put({ type: "API_ERRORED", payload: e });
    }
}
