import constants from "../constants";

export function onChangeTab(tabName) {
    console.log('action-onChangeTab');
    return {
        type: constants.ON_CHANGE_TAB,
        payload: tabName
    }
}

export function onChangeChapter(chapterNumber) {
//    console.log('action-onChangeChapter');
    return {
        type: constants.ON_CHANGE_CHAPTER,
        payload: chapterNumber
    }
}

export function onChangeChapter2(chapterNumber) {
//    console.log('action-onChangeChapter2');
    return {
        type: constants.ON_CHANGE_CHAPTER2,
        payload: chapterNumber
    }
}

export function onChangeChapterLine(chapterLineNumber) {
    return {
        type: constants.ON_CHANGE_CHAPTER_LINE,
        payload: chapterLineNumber
    }
}

export function onChangeImage(imageId) {
    return {
        type: constants.ON_CHANGE_IMAGE,
        payload: imageId
    }
}

export function onChangePoem(poemId) {
    return {
        type: constants.ON_CHANGE_POEM,
        payload: poemId
    }
}

export function onChangeFontSize(font) {
    return {
        type: constants.ON_CHANGE_FONT_SIZE,
        payload: font
    }
}

export function onChangeFontJustification(justify) {
    return {
        type: constants.ON_CHANGE_FONT_JUSTIFICATION,
        payload: justify
    }
}

export function updateChapter(chapterNumber) {
    return {
        type: constants.UPDATE_CHAPTER,
        payload: chapterNumber
    }
}

export function updateChapterLine(chapterLineNumber) {
    return {
        type: constants.UPDATE_CHAPTER_LINE,
        payload: chapterLineNumber
    }
}

export function updateImage(imageId) {
    return {
        type: constants.UPDATE_IMAGE,
        payload: imageId
    }
}

export function updatePoem(poemId) {
    return {
        type: constants.UPDATE_POEM,
        payload: poemId
    }
}

export function updateFont(font) {
    return {
        type: constants.UPDATE_FONT,
        payload: font
    }
}

