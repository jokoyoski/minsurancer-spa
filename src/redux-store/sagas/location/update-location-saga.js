import { takeEvery, put } from "redux-saga/effects";
import { request } from '../../../api/Service';
import { getErrorMessage } from '../../../components/utils/errorHandler';
import { toast } from 'react-toastify';
import history from '../../../router/browserrouter';

export default function* watcherUpdateLocationSaga() {
    yield takeEvery("UPDATE_LOCATION", workerSaga);
}

function* workerSaga(action) {
    try {
        yield put({ type: "DISPLAY_LOADER" });
        let payload = {}
        yield request("put", action.payload, "api/SetUp/update-location").then(response => {
            payload = response;
        });
        var formatUrl = `api/SetUp/get-locations/1`
        yield request("get", {}, formatUrl).then(response => {
            payload = response;
        });
        yield put({ type: "LOCATIONS_LIST", payload: payload.locations})
        yield put({ type: "CURRENT_PAGE", payload: payload.currentPage })
        yield put({ type: "ITEMS_PER_PAGE", payload: payload.pageSize })
        yield put({ type: "TOTAL_ITEMS", payload: payload.totalCount })
        yield put({ type: "TOTAL_PAGES", payload: payload.totalPages })
        yield put({ type: "DISPLAY_LOADER" });
    } catch (e) {
        yield put({ type: "LOADING_BUTTON_SPINNER" });
        console.log(e.response)
        console.log("update-location-saga", e)
        console.log("update-location-saga", e.response)
        const errorMessage = getErrorMessage(e.response);
        toast.error(errorMessage);
        yield put({ type: "DISPLAY_LOADER" });
        yield put({ type: "API_ERRORED", payload: e });
    }
}
