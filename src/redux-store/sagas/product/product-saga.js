import { takeEvery, put } from "redux-saga/effects";
import { request } from '../../../api/Service';
import { getErrorMessage } from '../../../components/utils/errorHandler';
import { toast } from 'react-toastify';

export default function* watcherGetProductsSaga() {
    yield takeEvery("LOAD_PRODUCT", workerSaga);
}

function* workerSaga(action) {
    try {
        yield put({ type: "DISPLAY_LOADER", payload: payload })
        var payload = {}
        formatUrl = 'get-categories-dropdown/'+ action.payload
        yield request("get", action.payload, formatUrl).then(response => {
            payload = response;
        });
        yield put({ type: "PRODUCT_CATEGORY_DROPDOWN_LIST", payload: payload })
        var formatUrl = 'get-products?companyId=' + action.payload
        yield request("get", payload, formatUrl).then(response => {
            payload = response;
        });
        yield put({ type: "PRODUCT_LIST", payload: payload })
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
