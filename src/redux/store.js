
import { applyMiddleware, legacy_createStore as createStore } from "redux";
import rootReducer from "./reducers";
import createSagaMiddleware from "@redux-saga/core";
import rootSaga from "./saga/sagaAuthAction";


const sagaMiddleWare = createSagaMiddleware();
export  const store = createStore(rootReducer, applyMiddleware(sagaMiddleWare) );

sagaMiddleWare.run(rootSaga);


