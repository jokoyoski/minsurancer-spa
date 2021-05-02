import { takeEvery, put } from "redux-saga/effects";
import { request } from '../../../api/Service';
import { getErrorMessage } from '../../../components/utils/errorHandler';
import { toast } from 'react-toastify';
import history from '../../../router/browserrouter';

export default function* watcherGetLocationsSaga() {
    yield takeEvery("LOAD_LOCATIONS", workerSaga);
}

function* workerSaga(action) {
    try {
        yield put({ type: "DISPLAY_LOADER", payload: payload })
        var payload = {}
        var formatUrl = `get-locations/${action.payload}`
        yield request("get", {}, formatUrl).then(response => {
            payload = response;
        });
        yield put({ type: "LOCATIONS_LIST", payload: payload.locations})
        yield put({ type: "CURRENT_PAGE", payload: payload.currentPage })
        yield put({ type: "ITEMS_PER_PAGE", payload: payload.pageSize })
        yield put({ type: "TOTAL_ITEMS", payload: payload.totalCount })
        yield put({ type: "TOTAL_PAGES", payload: payload.totalPages })
        yield put({ type: "DISPLAY_LOADER", payload: payload })
    } catch (e) {
        yield put({ type: "DISPLAY_LOADER", payload: payload })
        yield put({ type: "LOADING_BUTTON_SPINNER" });
        console.log("LOCATIONS-saga", e)
        console.log("locations-saga", e.response)
        const errorMessage = getErrorMessage(e.response);
        toast.error(errorMessage);
        yield put({ type: "API_ERRORED", payload: e });
    }
}
