import { createStore, compose, applyMiddleware } from 'redux';
//import { combineReducers, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers';
//import rootSaga from './sagas';
import { watchUser } from './sagas/userData';

    const sagaMiddleware = createSagaMiddleware();
//    const middleWares = [sagaMiddleware];

    const store = createStore(
        rootReducer, 
        applyMiddleware(sagaMiddleware)
        );

    sagaMiddleware.run(watchUser);


console.log('watchUser');
console.log(watchUser);
// const store = createStore<IRootState, any, any, any>(
//     combineReducers({
//         demo: demoReducer
// }));
export default store;


//     yield takeEvery(constants.ON_CHANGE_TAB, onChangeTabSaga);
//     yield takeEvery(constants.ON_CHANGE_CHAPTER2, onChangeChapterSaga);
//     yield takeEvery(constants.ON_CHANGE_CHAPTER_LINE, onChangeChapterLineSaga);
//     yield takeEvery(constants.ON_CHANGE_IMAGE, onChangeImageSaga);
//     yield takeEvery(constants.ON_CHANGE_POEM, onChangePoemSaga);
//     yield takeEvery(constants.ON_CHANGE_FONT, onChangeFontSaga);
