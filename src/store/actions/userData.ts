import constants from "../constants";
//import { TActionCreatorType, TReducerExtraData } from '../types';

export function onChangeChapter(chapterNumber: number) {
    return {
        type: typeof constants.ON_CHANGE_CHAPTER,
        payload: chapterNumber
    }
}

export function onChangeChapterLine(chapterLineNumber: number) {
    return {
        type: typeof constants.ON_CHANGE_CHAPTER_LINE,
        payload: chapterLineNumber
    }
}

export function onChangeImage(imageId: string) {
    return {
        type: typeof constants.ON_CHANGE_IMAGE,
        payload: imageId
    }
}

export function onChangePoem(poemId: string) {
    return {
        type: typeof constants.ON_CHANGE_POEM,
        payload: poemId
    }
}

export function onChangeFont(fontSize: number) {
    return {
        type: typeof constants.ON_CHANGE_FONT,
        payload: fontSize
    }
}

export function updateChapter(chapterNumber: number) {
    return {
        type: typeof constants.UPDATE_CHAPTER,
        payload: chapterNumber
    }
}

export function updateChapterLine(chapterLineNumber: number) {
    return {
        type: typeof constants.UPDATE_CHAPTER_LINE,
        payload: chapterLineNumber
    }
}

export function updateImage(imageId: string) {
    return {
        type: typeof constants.UPDATE_IMAGE,
        payload: imageId
    }
}

export function updatePoem(poemId: string) {
    return {
        type: typeof constants.UPDATE_POEM,
        payload: poemId
    }
}

export function updateFont(fontSize: number) {
    return {
        type: typeof constants.UPDATE_FONT,
        payload: fontSize
    }
}
