import { takeEvery, put } from "redux-saga/effects";
import { request,request2 } from '../../../api/Service';
import { getErrorMessage } from '../../../components/utils/errorHandler';
import { toast } from 'react-toastify';
import history from '../../../router/browserrouter';

export default function* watcherAddProductCategorySaga() {
    yield takeEvery("ADD_PRODUCT_CATEGORY", workerSaga);
}

function* workerSaga(action) {
    try {
        yield put({ type: "DISPLAY_LOADER" });
        let payload = {};
        var url="api/SetUp/add-product-category";
        yield request2("post", action.payload, url).then(response => {
            payload = response;
        });
        toast.success(payload)
        const formatUrl = `get-product-category/${1}`
        yield request("get", payload, formatUrl).then(response => {
            payload = response;
        });
        console.log('about to displatch product category list')
        yield put({ type: "PRODUCT_CATEGORY_LIST", payload: payload.productCategories })
        yield put({ type: "DISPLAY_LOADER", payload: payload })
        yield put({ type: "CURRENT_PAGE", payload: payload.currentPage })
        yield put({ type: "ITEMS_PER_PAGE", payload: payload.pageSize })
        yield put({ type: "TOTAL_ITEMS", payload: payload.totalCount })
        localStorage.setItem("totalProductCategory",payload.totalCount)
        yield put({ type: "TOTAL_PAGES", payload: payload.totalPages })
    } catch (e) {
        yield put({ type: "LOADING_BUTTON_SPINNER" });
        yield put({ type: "DISPLAY_LOADER" });
        console.log("add-product-category-saga",e)
        console.log("add-product-category-saga",e.response)
        console.log(e.response)
        const errorMessage = getErrorMessage(e.response);
        toast.error(errorMessage);
        yield put({ type: "API_ERRORED", payload: e });
    }
}
