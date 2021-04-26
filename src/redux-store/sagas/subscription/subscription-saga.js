import { takeEvery, put } from "redux-saga/effects";
import { request } from '../../../api/Service';
import { getErrorMessage } from '../../../components/utils/errorHandler';
import { toast } from 'react-toastify';
import history from '../../../router/browserrouter';

export default function* watcherGetSubscriptionsSaga() {
    yield takeEvery("LOAD_SUBSCRIPTIONS", workerSaga);
}

function* workerSaga(action) {
    try {
        yield put({ type: "DISPLAY_LOADER", payload: payload })
        var payload = {}
        var formatUrl = `api/SetUp/get-subscriptions/${action.payload}`
        yield request("get", {}, formatUrl).then(response => {
            payload = response;
        });
        console.log(payload)
        yield put({ type: "SUBSCRIPTIONS_LIST", payload: payload.subscriptions})
        yield put({ type: "CURRENT_PAGE", payload: payload.currentPage })
        yield put({ type: "ITEMS_PER_PAGE", payload: payload.pageSize })
        yield put({ type: "TOTAL_ITEMS", payload: payload.totalCount })
        yield put({ type: "TOTAL_PAGES", payload: payload.totalPages })
        yield put({ type: "DISPLAY_LOADER", payload: payload })
    } catch (e) {
        yield put({ type: "DISPLAY_LOADER", payload: payload })
        yield put({ type: "LOADING_BUTTON_SPINNER" });
        console.log("subscriptions-saga", e)
        console.log("subscriptions-saga", e.response)
        const errorMessage = getErrorMessage(e.response);
        toast.error(errorMessage);
        yield put({ type: "API_ERRORED", payload: e });
    }
}
