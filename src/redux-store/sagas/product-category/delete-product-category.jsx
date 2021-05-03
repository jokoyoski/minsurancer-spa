import { takeEvery, put } from "redux-saga/effects";
import { request } from '../../../api/Service';
import { getErrorMessage } from '../../../components/utils/errorHandler';
import { toast } from 'react-toastify';

export default function* watcherDeleteProductCategorySaga() {
    yield takeEvery("DELETE_PRODUCT_CATEGORY", workerSaga);
}

function* workerSaga(action) {
    try {
        yield put({ type: "DISPLAY_LOADER" });
        let payload = {};
        var url=`api/SetUp/delete-product-category?id=${action.payload}`;
        yield request("delete", action.payload, url).then(response => {
            payload = response;
        });
        toast.success(payload)
        const formatUrl = `get-product-category/${1}`
        yield request("get", {}, formatUrl).then(response => {
            payload = response;
        });
        console.log('about to displatch product category list')
        yield put({ type: "PRODUCT_CATEGORY_LIST", payload: payload.productCategories })
        console.log('about to displatch display loader')
        yield put({ type: "DISPLAY_LOADER", payload: payload })
        yield put({ type: "CURRENT_PAGE", payload: payload.currentPage })
        yield put({ type: "ITEMS_PER_PAGE", payload: payload.pageSize })
        yield put({ type: "TOTAL_ITEMS", payload: payload.totalCount })
        yield put({ type: "TOTAL_PAGES", payload: payload.totalPages })
    } catch (e) {
        yield put({ type: "LOADING_BUTTON_SPINNER" });
        yield put({ type: "DISPLAY_LOADER" });
        console.log("delete-product-category-saga",e)
        console.log("delete-product-category-saga",e.response)
        console.log(e.response)
        const errorMessage = getErrorMessage(e.response);
        toast.error(errorMessage);
        yield put({ type: "API_ERRORED", payload: e });
    }
}
