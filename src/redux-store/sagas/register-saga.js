import { takeEvery, put } from "redux-saga/effects";
import { request } from '../../api/Service';
import { getErrorMessage } from '../../components/utils/errorHandler';
import { toast } from 'react-toastify';
import history from '../../router/browserrouter';

export default function* watcherRegisterSaga() {
    yield takeEvery("REGISTER_USER", workerSaga);
}

function* workerSaga(action) {
    try {
        yield put({ type: "LOADING_BUTTON_SPINNER" });
        let payload = {}
        yield request("post", action.payload, "api/Authentication/register-client").then(response => {
            payload = response;
        });
        toast.success("Registration Successful!!");
        setTimeout(function () { history.push("/user/login"); }, 2000);
        yield put({ type: "TRIGGER_REGISTER_SUCCESS" })
        yield put({ type: "LOADING_BUTTON_SPINNER" });
    } catch (e) {
        yield put({ type: "LOADING_BUTTON_SPINNER" });
        console.log(e.response)
        console.log("register-saga",e)
        console.log("register-saga",e.response)
        const errorMessage = getErrorMessage(e.response);
        toast.error(errorMessage);
        yield put({ type: "API_ERRORED", payload: e });
    }
}
