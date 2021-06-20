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
       const formatUrl = `api/Authentication/search-user?searchTerm=${action.payload.searchTerm}&userType=${action.payload.userType}&pageNumber=${action.payload.pageNumber}`
        yield request("get",payload,formatUrl).then(response => {
            payload = response;
        });
        yield put({ type: "USERS_LIST", payload: payload.users })
        yield put({ type: "CURRENT_PAGE", payload: payload.currentPage })
        yield put({ type: "ITEMS_PER_PAGE", payload: payload.pageSize })
        yield put({ type: "TOTAL_ITEMS", payload: payload.totalCount })
        yield put({ type: "TOTAL_PAGES", payload: payload.totalPages })
        yield put({ type: "DISPLAY_LOADER", payload: payload })
          var newFormatUrl = 'api/Authentication/get-roles-dropdown' ;
        yield request("get", {}, newFormatUrl).then(response => {
            payload = response;
        });
         yield put({ type: "ROLES_DROPDOWN_LIST", payload: payload })
        console.log(payload)

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
