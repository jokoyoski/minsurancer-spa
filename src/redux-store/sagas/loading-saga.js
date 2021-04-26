import { takeEvery, put } from "redux-saga/effects";
import { Get } from '../../api/Service';

export default function* watcherLoadingSaga() {
    yield takeEvery("DISPLAY_LOADER", workerSaga);
}

function* workerSaga(action) {
    try {
       
      //  yield put({ type: "DISPLAY_LOADER"});
    } catch (e) {
        yield put({ type: "API_ERRORED", payload: e });
    }
}
