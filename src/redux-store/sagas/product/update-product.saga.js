import { takeEvery, put } from "redux-saga/effects";
import { request,request2 } from '../../../api/Service';
import { getErrorMessage } from '../../../components/utils/errorHandler';
import { toast } from 'react-toastify';
import history from '../../../router/browserrouter';

export default function* watcherUpdateProductSaga() {
    yield takeEvery("UPDATE_PRODUCT", workerSaga);
}

function* workerSaga(action) {
    try {

        yield put({ type: "DISPLAY_LOADER" });
        let payload = {}
       // var url='update-product?CompanyId='+action.payload.companyId+'&CategoryId='+action.payload.categoryId+'&CreatedBy=1'+'&ImageId=hhhh&ProductName='+action.payload.productName+'&Unit='+action.payload.unit+'&ProductDescription='+action.payload.productDescription+'&SKU='+action.payload.sku+'&Returnable='+action.payload.returnable+'&id='+action.payload.id;
        var url="api/SetUp/update-product"
        yield request2("post", action.payload, url).then(response => {
            payload = response;
        });
        var formatUrl = 'api/SetUp/get-products?id=1' 
        yield request("get", {}, formatUrl).then(response => {
            payload = response;
        });
        yield put({ type: "PRODUCT_LIST", payload: payload.products })
        yield put({ type: "CURRENT_PAGE", payload: payload.currentPage })
        yield put({ type: "ITEMS_PER_PAGE", payload: payload.pageSize })
        yield put({ type: "TOTAL_ITEMS", payload: payload.totalCount })
        yield put({ type: "TOTAL_PAGES", payload: payload.totalPages })
        formatUrl = `api/SetUp/get-categories-dropdown`
        yield request("get", action.payload, formatUrl).then(response => {
            payload = response;
        });
        yield put({ type: "PRODUCT_CATEGORY_DROPDOWN_LIST", payload: payload })
        yield put({ type: "DISPLAY_LOADER" });
    } catch (e) {
        console.log("update-product-saga",e)
        console.log("update-product-saga",e.response)
        yield put({ type: "LOADING_BUTTON_SPINNER" });
        yield put({ type: "DISPLAY_LOADER" });
        const errorMessage = getErrorMessage(e.response);
        toast.error(errorMessage);
        yield put({ type: "API_ERRORED", payload: e });
    }
}
