import { takeEvery, put } from "redux-saga/effects";
import { request } from '../../../api/Service';
import { getErrorMessage } from '../../../components/utils/errorHandler';
import { toast } from 'react-toastify';
import history from '../../../router/browserrouter';

export default function* watcherGetUsersSaga() {
    yield takeEvery("LOAD_USERS", workerSaga);
}

function* workerSaga(action) {
    try {
        yield put({ type: "DISPLAY_LOADER", payload: payload })
       var payload={}
        const formatUrl = 'api/Authentication/get-users-company?cacNumber='+action.payload
        yield request("get",payload,formatUrl).then(response => {
            payload = response;
        });
        yield put({ type: "USERS_LIST", payload: payload })
        yield put({ type: "DISPLAY_LOADER", payload: payload })
       


    } catch (e) {
        yield put({ type: "LOADING_BUTTON_SPINNER" });
        console.log("users-saga",e)
        yield put({ type: "DISPLAY_LOADER" });
        console.log("users-saga",e.response)
        const errorMessage = getErrorMessage(e.response);
        toast.error(errorMessage);
        yield put({ type: "API_ERRORED", payload: e });
    }
}
