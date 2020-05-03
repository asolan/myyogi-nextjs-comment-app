import { takeEvery, put, all} from "redux-saga/effects";
//import { take, takeEvery, call, put, select, cancel, takeLatest, fork, all} from "redux-saga/effects";
//import { fromJS, toJS, Map} from 'immutable';
import constants from "../constants";
import actions from "../actions";
//import selectors from "../selectors";

//import { TActionCreatorType, TReducerExtraData } from '../types';


// function* getUserData(){
//     const persistedState = JSON.parse(window.localStorage['autoyogistate']);
//     // window.localStorage['persistedState'] = JSON.stringify({
//     //     chapterNumber: chapterNumber
//     //   });

// }

// function* setUserData(){
//     const persistedState = JSON.parse(window.localStorage['autoyogistate']);
//     // window.localStorage['persistedState'] = JSON.stringify({
//     //     chapterNumber: chapterNumber
//     //   });
// }


function* onChangeTabSaga(chapterNumber) {
    console.log('onChangeTabSaga');
    console.log(chapterNumber);
    let response = yield put(actions.updateChapter(chapterNumber));
}

function* onChangeChapterSaga(chapterNumber) {
    console.log('onChangeChapterSaga');
    console.log(chapterNumber);
    let response = yield put(actions.updateChapter(chapterNumber));
}

// function* onChangeChapterSaga(chapterNumber: number) {
//     // window.localStorage['persistedState'] = JSON.stringify({
//     //     chapterNumber: chapterNumber
//     //   });
//     console.log('onChangeChapterSaga');
//     console.log(chapterNumber);
//     let response = yield put(actions.updateChapter(chapterNumber));
// }

function* onChangeChapterLineSaga(chapterLineNumber) {
    console.log('onChangeChapterLine');
    console.log(chapterLineNumber);
    let response = yield put(actions.updateChapterLine(chapterLineNumber));
}

function* onChangeImageSaga(imageId) {
    let response = yield put(actions.updateImage(imageId));
}

function* onChangePoemSaga(poemId) {
    let response = yield put(actions.updatePoem(poemId));
}

function* onChangeFontSaga(font) {
    let response = yield put(actions.updateFont(font));
}


export function* watchUser() {
    yield all ([ takeEvery(constants.ON_CHANGE_TAB, onChangeTabSaga),
    takeEvery(constants.ON_CHANGE_CHAPTER2, onChangeChapterSaga),
    takeEvery(constants.ON_CHANGE_CHAPTER_LINE, onChangeChapterLineSaga),
    takeEvery(constants.ON_CHANGE_IMAGE, onChangeImageSaga),
    takeEvery(constants.ON_CHANGE_POEM, onChangePoemSaga),
    takeEvery(constants.ON_CHANGE_FONT, onChangeFontSaga)
]);
}
//Watchers
// const handleOnChangeTabWatcher = fork(function* () {
// //    console.log('handleOnChangeTabWatcher');
//     yield takeLatest(constants.ON_CHANGE_TAB, onChangeTabSaga);
// });

// const handleOnChangeChapterWatcher = fork(function* () {
//     console.log('handleOnChangeChapterWatcher');
//     yield takeLatest(constants.ON_CHANGE_CHAPTER2, onChangeChapterSaga);
// });

// const handleOnChangeChapterLineWatcher = fork(function* () {
//     yield takeLatest(constants.ON_CHANGE_CHAPTER_LINE, onChangeChapterLineSaga);
// });

// const handleOnChangeImageWatcher = fork(function* () {
//     yield takeLatest(constants.ON_CHANGE_IMAGE, onChangeImageSaga);
// });

// const handleOnChangePoemWatcher = fork(function* () {
//     yield takeLatest(constants.ON_CHANGE_POEM, onChangePoemSaga);
// });

// const handleOnChangeFontWatcher = fork(function* () {
//     yield takeLatest(constants.ON_CHANGE_FONT, onChangeFontSaga);
// });

// export default [
//     handleOnChangeTabWatcher,
//     handleOnChangeChapterWatcher,
//     handleOnChangeChapterLineWatcher,
//     handleOnChangeImageWatcher,
//     handleOnChangePoemWatcher,
//     handleOnChangeFontWatcher
// ];

