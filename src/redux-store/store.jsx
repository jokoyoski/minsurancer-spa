
import rootReducer from "./combine-reducer/combine-reducer";
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import apiSaga from "./sagas/login-sagas";
import RootSaga from "./root-saga";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const initialiseSagaMiddleware = createSagaMiddleware();   //created the saga 

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['userReducer']
}
 
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(
  persistedReducer,
  storeEnhancers(                              //sga middleware
    applyMiddleware(initialiseSagaMiddleware)
  )
);
export const persistor = persistStore(store)


initialiseSagaMiddleware.run(RootSaga);

//export default store;