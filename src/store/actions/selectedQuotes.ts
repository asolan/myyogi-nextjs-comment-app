import constants from "../constants";

export function addSelectedQuote(chapter, line, tags) {
    return {
        type: constants.ADD_SELECTED_QUOTE,
        chapter: chapter,
        line: line,
        tags: tags
    }
}

export function removeSelectedQuote(chapter, line) {
    return {
        type: constants.REMOVE_SELECTED_QUOTE,
        chapter: chapter,
        line: line
    }
}
