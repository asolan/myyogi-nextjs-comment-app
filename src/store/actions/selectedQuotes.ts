import constants from "../constants";

export function addSelectedQuote(chapter, line, lineType) {
    return {
        type: constants.ADD_SELECTED_QUOTE,
        chapter: chapter,
        line: line,
        lineType: lineType
    }
}

export function removeSelectedQuote(chapter, line, lineType) {
    return {
        type: constants.REMOVE_SELECTED_QUOTE,
        chapter: chapter,
        line: line,
        lineType: lineType
    }
}
