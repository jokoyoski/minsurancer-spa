import { takeEvery, put } from "redux-saga/effects";
import { request } from '../../../api/Service';
import { getErrorMessage } from '../../../components/utils/errorHandler';
import { toast } from 'react-toastify';
import history from '../../../router/browserrouter';

export default function* watcherAddProductSaga() {
    yield takeEvery("ADD_PRODUCT", workerSaga);
}

function* workerSaga(action) {
    try {
        yield put({ type: "DISPLAY_LOADER" });
        let payload = {};
       // var url = 'add-product?CompanyId=' + action.payload.companyId + '&CategoryId=' + action.payload.categoryId + '&CreatedBy=1' + '&ImageId=hhhh&ProductName=' + action.payload.productName + '&Unit=' + action.payload.unit + '&ProductDescription=' + action.payload.productDescription + '&SKU=' + action.payload.sku + '&Returnable=' + action.payload.returnable;
       var url='add-product'
       yield request("post", action.payload, url).then(response => {
            payload = response;
        });
        toast.success(payload)
        var formatUrl = 'get-products?companyId=' + action.payload.companyId
        yield request("get", action.payload, formatUrl).then(response => {
            payload = response;
        });
        yield put({ type: "PRODUCT_LIST", payload: payload })
        formatUrl = 'get-categories-dropdown/'+action.payload.companyId
        yield request("get", action.payload, formatUrl).then(response => {
            payload = response;
        });
        yield put({ type: "PRODUCT_CATEGORY_DROPDOWN_LIST", payload: payload })

        yield put({ type: "DISPLAY_LOADER" });
    } catch (e) {
        yield put({ type: "LOADING_BUTTON_SPINNER" });
        console.log("add-product-saga",e)
        yield put({ type: "DISPLAY_LOADER" });
        console.log("add-product-saga",e.response)
        console.log(e.response)
        const errorMessage = getErrorMessage(e.response);
        toast.error(errorMessage);
        yield put({ type: "API_ERRORED", payload: e });
    }
}
