import { takeEvery, put } from "redux-saga/effects";
import { request } from '../../../api/Service';
import { getErrorMessage } from '../../../components/utils/errorHandler';
import { toast } from 'react-toastify';
import history from '../../../router/browserrouter';

export default function* watcherGetUserLocationsSaga() {
    yield takeEvery("LOAD_USERS_LOCATIONS", workerSaga);
}

function* workerSaga(action) {
    try {
        yield put({ type: "DISPLAY_LOADER", payload: payload })
        var payload = {}
        formatUrl = `user-locations-multi-select/1?companyId=9`
        yield request("get", payload, formatUrl).then(response => {
            payload = response;
        });
        yield put({ type: "COMPANY_LOCATION_LIST", payload: payload.companyLocations })
        yield put({ type: "USER_LOCATION_LIST", payload: payload.userLocations })
        console.log(payload.companyLocations)
        yield put({ type: "DISPLAY_LOADER" })
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
