import { createStore, compose, applyMiddleware } from 'redux';
//import { combineReducers, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers';
import rootSaga from './sagas/index.js';

const configureStoreProd = (initialState: any) => {
    const sagaMiddleware = createSagaMiddleware();
    const middleWares = [sagaMiddleware];

    const store = createStore(
        rootReducer, 
        initialState,
        compose(applyMiddleware(...middleWares)
        ));

    sagaMiddleware.run(rootSaga);

    return store;
};

const configureStoreDev = (initialState: any) => {
    const sagaMiddleware = createSagaMiddleware();
    const middleWares = [sagaMiddleware];

//    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const composeEnhancers = compose;
const store = createStore(
        rootReducer, 
        initialState,
        composeEnhancers(applyMiddleware(...middleWares)
        ));

    sagaMiddleware.run(rootSaga);

    return store;
};

const configureStore = process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev;

console.log('rootSaga');
console.log(rootSaga);
// const store = createStore<IRootState, any, any, any>(
//     combineReducers({
//         demo: demoReducer
// }));
export default configureStore;