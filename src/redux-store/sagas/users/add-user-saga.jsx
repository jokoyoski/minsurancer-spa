import { takeEvery, put } from "redux-saga/effects";
import { request } from '../../../api/Service';
import { getErrorMessage } from '../../../components/utils/errorHandler';
import { toast } from 'react-toastify';
import history from '../../../router/browserrouter';

export default function* watcherAddUserSaga() {
    yield takeEvery("ADD_USER", workerSaga);
}

function* workerSaga(action) {
    try {
        yield put({ type: "DISPLAY_LOADER" });
        let payload = {}
        yield request("post", action.payload, "api/Authentication/add-user").then(response => {
            payload = response;
        });
        toast.success(payload)
        const formatUrl = 'api/Authentication/get-users-company?cacNumber='+localStorage.getItem("cacNumber")
        yield request("get", action.payload, formatUrl).then(response => {
            payload = response;
        });
        yield put({ type: "USERS_LIST", payload: payload })
        yield put({ type: "DISPLAY_LOADER" });
    } catch (e) {
        yield put({ type: "LOADING_BUTTON_SPINNER" });
        yield put({ type: "DISPLAY_LOADER" });
        console.log("add-user-saga",e)
        console.log("add-user-saga",e.response)
        console.log(e.response)
        console.log(e.response)
        const errorMessage = getErrorMessage(e.response);
        toast.error(errorMessage);
        yield put({ type: "API_ERRORED", payload: e });
    }
}
