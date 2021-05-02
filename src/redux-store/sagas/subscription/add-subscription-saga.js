import { takeEvery, put } from "redux-saga/effects";
import { request } from '../../../api/Service';
import { getErrorMessage } from '../../../components/utils/errorHandler';
import { toast } from 'react-toastify';

export default function* watcherAddSubscriptionSaga() {
    yield takeEvery("ADD_SUBSCRIPTION", workerSaga);
}

function* workerSaga(action) {
    try {
        yield put({ type: "DISPLAY_LOADER" });
        let payload = {}
        yield request("post", action.payload, "/api/SetUp/add-subscription").then(response => {
            payload = response;
        });
        toast.success(payload)
        var formatUrl = `get-subscriptions/1`
        yield request("get", {}, formatUrl).then(response => {
            payload = response;
        });
        yield put({ type: "LOCATIONS_LIST", payload: payload.subscriptions})
        yield put({ type: "CURRENT_PAGE", payload: payload.currentPage })
        yield put({ type: "ITEMS_PER_PAGE", payload: payload.pageSize })
        yield put({ type: "TOTAL_ITEMS", payload: payload.totalCount })
        yield put({ type: "TOTAL_PAGES", payload: payload.totalPages })
        yield put({ type: "DISPLAY_LOADER", payload: payload })
    } catch (e) {
        yield put({ type: "LOADING_BUTTON_SPINNER" });
        console.log("add-subscription-saga", e)
        yield put({ type: "DISPLAY_LOADER" });
        console.log("add-subscription-saga", e.response)
        console.log(e.response)
        console.log(e.response)
        const errorMessage = getErrorMessage(e.response);
        toast.error(errorMessage);
        yield put({ type: "API_ERRORED", payload: e });
    }
}
