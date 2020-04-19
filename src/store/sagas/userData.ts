import { take, call, put, select, cancel, takeLatest, fork, all} from "redux-saga/effects";
//import { fromJS, toJS, Map} from 'immutable';
import constants from "../constants";
import actions from "../actions";
import { TActionCreatorType, TReducerExtraData } from '../types';

//const persistedState = JSON.parse(window.localStorage['persistedState']);
function * onChangeChapterSaga({ type, payload : {chapterNumber} }: TActionCreatorType) {
    // window.localStorage['persistedState'] = JSON.stringify({
    //     chapterNumber: chapterNumber
    //   });
    let response = yield put(actions.updateChapter(chapterNumber));
}

function * onChangeChapterLine({ type, payload : {chapterLineNumber} }: TActionCreatorType) {
    let response = yield put(actions.updateChapterLine(chapterLineNumber));
}

function * onChangeImage({ type, payload : {imageId} }: TActionCreatorType) {
    let response = yield put(actions.updateImage(imageId));
}

function * onChangePoem({ type, payload : {poemId} }: TActionCreatorType) {
    let response = yield put(actions.updatePoem(poemId));
}

function * onChangeFont({ type, payload : {fontSize} }: TActionCreatorType) {
    let response = yield put(actions.updateFont(fontSize));
}

//Watchers
const handleOnChangeChapterWatcher = fork(function * () {
    yield takeLatest(constants.ON_CHANGE_CHAPTER, onChangeChapterSaga);
});

const handleOnChangeChapterLineWatcher = fork(function * () {
    yield takeLatest(constants.ON_CHANGE_CHAPTER_LINE, onChangeChapterLine);
});

const handleOnChangeImageWatcher = fork(function * () {
    yield takeLatest(constants.ON_CHANGE_IMAGE, onChangeImage);
});

const handleOnChangePoemWatcher = fork(function * () {
    yield takeLatest(constants.ON_CHANGE_POEM, onChangePoem);
});

const handleOnChangeFontWatcher = fork(function * () {
    yield takeLatest(constants.ON_CHANGE_FONT, onChangeFont);
});

export default [
    handleOnChangeChapterWatcher,
    handleOnChangeChapterLineWatcher,
    handleOnChangeImageWatcher,
    handleOnChangePoemWatcher,
    handleOnChangeFontWatcher
];

