import constants from "../constants";
//import { TActionCreatorType, TReducerExtraData } from '../types';

export function onChangeTab(tabName: string) {
    console.log('action-onChangeTab');
    return {
        type: constants.ON_CHANGE_TAB,
        payload: tabName
    }
}

export function onChangeChapter(chapterNumber: number) {
    console.log('action-onChangeChapter');
    return {
        type: constants.ON_CHANGE_CHAPTER,
        payload: chapterNumber
    }
}

export function onChangeChapterLine(chapterLineNumber: number) {
    return {
        type: constants.ON_CHANGE_CHAPTER_LINE,
        payload: chapterLineNumber
    }
}

export function onChangeImage(imageId: string) {
    return {
        type: constants.ON_CHANGE_IMAGE,
        payload: imageId
    }
}

export function onChangePoem(poemId: string) {
    return {
        type: constants.ON_CHANGE_POEM,
        payload: poemId
    }
}

export function onChangeFont(font: string) {
    return {
        type: constants.ON_CHANGE_FONT,
        payload: font
    }
}

export function updateChapter(chapterNumber: number) {
    return {
        type: constants.UPDATE_CHAPTER,
        payload: chapterNumber
    }
}

export function updateChapterLine(chapterLineNumber: number) {
    return {
        type: constants.UPDATE_CHAPTER_LINE,
        payload: chapterLineNumber
    }
}

export function updateImage(imageId: string) {
    return {
        type: constants.UPDATE_IMAGE,
        payload: imageId
    }
}

export function updatePoem(poemId: string) {
    return {
        type: constants.UPDATE_POEM,
        payload: poemId
    }
}

export function updateFont(font: string) {
    return {
        type: constants.UPDATE_FONT,
        payload: font
    }
}
