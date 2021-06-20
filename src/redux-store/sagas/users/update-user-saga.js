import { takeEvery, put } from "redux-saga/effects";
import { request } from '../../../api/Service';
import { getErrorMessage } from '../../../components/utils/errorHandler';
import { toast } from 'react-toastify';
import history from '../../../router/browserrouter';

export default function* watcherUpdateSaga() {
    yield takeEvery("UPDATE_USER", workerSaga);
}

function* workerSaga(action) {
    try {
      console.log(8888)
        yield put({ type: "DISPLAY_LOADER" });
        let payload = {}
        yield request("post", action.payload, "api/Authentication/update-user").then(response => {
            payload = response;
        });
        const formatUrl = 'api/Authentication/get-users-company?cacNumber='+localStorage.getItem("cacNumber")
        yield request("get", action.payload, formatUrl).then(response => {
            payload = response;
        });
        yield put({ type: "USERS_LIST", payload: payload })
          var newFormatUrl = 'api/Authentication/get-roles-dropdown' ;
        yield request("get", {}, newFormatUrl).then(response => {
            payload = response;
        });
        console.log(payload)
        yield put({ type: "DISPLAY_LOADER" });
    } catch (e) {
        yield put({ type: "LOADING_BUTTON_SPINNER" });
        yield put({ type: "DISPLAY_LOADER" });
        console.log(e.response)
        console.log("update-user-saga",e)
        console.log("update-user-saga",e.response)
        const errorMessage = getErrorMessage(e.response);
        toast.error(errorMessage);
        yield put({ type: "API_ERRORED", payload: e });
    }
}
