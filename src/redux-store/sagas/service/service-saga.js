import { takeEvery, put } from "redux-saga/effects";
import { request } from '../../../api/Service';
import { getErrorMessage } from '../../../components/utils/errorHandler';
import { toast } from 'react-toastify';

export default function* watcherGetProductsSaga() {
    yield takeEvery("LOAD_SERVICE", workerSaga);
}

function* workerSaga(action) {
    try {
        yield put({ type: "DISPLAY_LOADER", payload: payload })
        var payload = {}
        formatUrl = 'api/SetUp/get-subscription-dropdown/'
        yield request("get", {}, formatUrl).then(response => {
            payload = response;
        });
        console.log(payload)
        yield put({ type: "SUBSCRIPTION_DROPDOWN_LIST", payload: payload })
        var formatUrl = 'get-services/'+action.payload;
        yield request("get", {}, formatUrl).then(response => {
            payload = response;
        });
        yield put({ type: "SERVICE_LIST", payload: payload.services })
        yield put({ type: "CURRENT_PAGE", payload: payload.currentPage })
        yield put({ type: "ITEMS_PER_PAGE", payload: payload.pageSize })
        yield put({ type: "TOTAL_ITEMS", payload: payload.totalCount })
        yield put({ type: "TOTAL_PAGES", payload: payload.totalPages })
        yield put({ type: "DISPLAY_LOADER", payload: payload })

    } catch (e) {
        console.log(e)
        console.log("product-saga",e)
        console.log("product-saga",e.response)
        yield put({ type: "LOADING_BUTTON_SPINNER" });
      //  yield put({ type: "DISPLAY_LOADER" });
        const errorMessage = getErrorMessage(e.response);
        toast.error(errorMessage);
        yield put({ type: "API_ERRORED", payload: e });
        yield put({ type: "DISPLAY_LOADER", payload: payload })

    }
}
