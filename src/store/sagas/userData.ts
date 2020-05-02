import { take, call, put, select, cancel, takeLatest, fork, all} from "redux-saga/effects";
//import { fromJS, toJS, Map} from 'immutable';
import constants from "../constants";
import actions from "../actions";
import selectors from "../selectors";

import { TActionCreatorType, TReducerExtraData } from '../types';


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


function* onChangeTabSaga({ type, payload : {chapterNumber} }: TActionCreatorType) {
    console.log('onChangeTabSaga');
    console.log(chapterNumber);
    let response = yield put(actions.updateChapter(chapterNumber));
}

function* onChangeChapterSaga({ type, payload : {chapterNumber} }: TActionCreatorType) {
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

function* onChangeChapterLineSaga({ type, payload : {chapterLineNumber} }: TActionCreatorType) {
    console.log('onChangeChapterLine');
    console.log(chapterLineNumber);
    let response = yield put(actions.updateChapterLine(chapterLineNumber));
}

function* onChangeImageSaga({ type, payload : {imageId} }: TActionCreatorType) {
    let response = yield put(actions.updateImage(imageId));
}

function* onChangePoemSaga({ type, payload : {poemId} }: TActionCreatorType) {
    let response = yield put(actions.updatePoem(poemId));
}

function* onChangeFontSaga({ type, payload : {font} }: TActionCreatorType) {
    let response = yield put(actions.updateFont(font));
}

//Watchers
const handleOnChangeTabWatcher = fork(function* () {
    console.log('handleOnChangeTabWatcher');
    yield takeLatest(constants.ON_CHANGE_TAB, onChangeTabSaga);
});

const handleOnChangeChapterWatcher = fork(function* () {
    console.log('handleOnChangeChapterWatcher');
    yield takeLatest(constants.ON_CHANGE_CHAPTER, onChangeChapterSaga);
});

const handleOnChangeChapterLineWatcher = fork(function* () {
    yield takeLatest(constants.ON_CHANGE_CHAPTER_LINE, onChangeChapterLineSaga);
});

const handleOnChangeImageWatcher = fork(function* () {
    yield takeLatest(constants.ON_CHANGE_IMAGE, onChangeImageSaga);
});

const handleOnChangePoemWatcher = fork(function* () {
    yield takeLatest(constants.ON_CHANGE_POEM, onChangePoemSaga);
});

const handleOnChangeFontWatcher = fork(function* () {
    yield takeLatest(constants.ON_CHANGE_FONT, onChangeFontSaga);
});

export default [
    handleOnChangeTabWatcher,
    handleOnChangeChapterWatcher,
    handleOnChangeChapterLineWatcher,
    handleOnChangeImageWatcher,
    handleOnChangePoemWatcher,
    handleOnChangeFontWatcher
];

