import { takeEvery, put } from "redux-saga/effects";
import { request ,request2} from '../../../api/Service';
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
       var url='api/SetUp/add-product'
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
