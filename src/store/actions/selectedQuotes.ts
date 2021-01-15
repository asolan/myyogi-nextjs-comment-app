import constants from "../constants";

export function addSelectedQuote(chapter, startline, startchar, endline, endchar, categororyTags, tags) {
    return {
        type: constants.ADD_SELECTED_QUOTE,
        chapter: chapter,
        startline: startline,
        startchar: startchar,
        endline: endline,
        endchar: endchar,
        categororyTags: categororyTags,
        tags: tags
    }
}

export function removeSelectedQuote(chapter, startline, startchar) {
    return {
        type: constants.REMOVE_SELECTED_QUOTE,
        chapter: chapter,
        startline: startline,
        startchar: startchar,
    }
}
