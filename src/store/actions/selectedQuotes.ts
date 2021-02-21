import constants from "../constants";

export function addSelectedQuote(quoteId, chapter, paragraph, startline, startchar, endline, endchar, linePos, selectedCategoryTags, tags) {
    return {
        type: constants.ADD_SELECTED_QUOTE,
        quoteId: quoteId,
        chapter: chapter,
        paragraph: paragraph,
        startline: startline,
        startchar: startchar,
        endline: endline,
        endchar: endchar,
        linePos: linePos,
        selectedCategoryTags: selectedCategoryTags,
        tags: tags
    }
}

export function removeSelectedQuote(quoteId) {
    return {
        type: constants.REMOVE_SELECTED_QUOTE,
        quoteId: quoteId,
    }
}
