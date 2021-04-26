import { takeEvery, put } from "redux-saga/effects";
import { request } from '../../api/Service';
import { getErrorMessage } from '../../components/utils/errorHandler';
import { toast } from 'react-toastify';
import history from '../../router/browserrouter';


export default function* watcherCompanySaga() {
    yield takeEvery("ADD_COMPANY", workerSaga);
}

function* workerSaga(action) {
    try {

        yield put({ type: "LOADING_BUTTON_SPINNER" });
        let payload = {}
        yield request("post", action.payload, "api/Company/add-company").then(response => {
            payload = response;
        });
        var data = {
            email: localStorage.getItem("userEmail"),
            password: localStorage.getItem("userPassword")
        }
        localStorage.clear()
        yield request("post", data, "api/Authentication/login").then(response => {
            payload = response;
        })
        var roles = payload.roles;
        var user = payload.user;
        var cacNumber = null;
        yield request("get", action.payload, "get-industries").then(response => {
            payload = response;
        })
        var cacNumber = "";

        yield put({ type: "SET_INDUSTRIES", payload: payload })
        yield put({ type: "SET_CAC_NUMBER", payload: user.cacNumber })
        cacNumber = user.cacNumber;
        localStorage.setItem("cacNumber", cacNumber);
        yield put({ type: "SET_FIRST_NAME", payload: user.firstName })
        yield put({ type: "SET_ROLES", payload: roles })
        localStorage.setItem("roles", JSON.stringify(roles));
        yield put({ type: "SET_USER_TYPE", payload: user.userType })
        yield put({ type: "SET_USER_ID", payload: user.id })
        localStorage.setItem("userId", user.id)
        yield put({ type: "SET_ACCESS_TOKEN", payload: user.token })
        if (user.cacNumber !== '00000') {
            var url = 'api/Company/cac?cacNumber=' + user.cacNumber
            yield request("get", action.payload, url).then(response => {
                payload = response;
            })
            yield put({ type: "COMPANY_ID", payload: payload.id })
            yield put({ type: "SET_CAC_NUMBER", payload: cacNumber })
            localStorage.setItem("companyId", payload.id)
        }
        if (roles.includes("App Owner")) {

            history.push("/main/dashboard")
        }
        yield put({ type: "LOADING_BUTTON_SPINNER" });
        setTimeout(function () { history.push("/user/login"); }, 4000);
    } catch (e) {
        console.log("add-company-saga", e)
        console.log("add-company-saga", e.response)
        yield put({ type: "LOADING_BUTTON_SPINNER" });
        const errorMessage = getErrorMessage(e.response);
        toast.error(errorMessage);
        yield put({ type: "API_ERRORED", payload: e });
    }
}
