export const getTextQuoteFromPos = (item, quote) => {

    if(!quote || 
        !quote.chapter ||
        item.chapterNumber !== quote.chapter ||
        item.lineNumber < quote.startline ||
        item.lineNumber < quote.endline){
        return [{text: '', className: ''},
                {text: item.text, className: ''},
                {text: '', className: ''}];
    }

    let startchar = item.lineNumber > quote.startline ? 1 : quote.startchar;
    let endchar = item.lineNumber < quote.startline ? item.text.length : quote.endchar;

    let textQuote = [];
    textQuote.push({text: item.text.slice(0, startchar), className: ''});
    textQuote.push({text: item.text.slice(startchar, endchar), className: 'quoteclass'});
    textQuote.push({text: item.text.slice(endchar, item.text.length), className: ''});

    return textQuote;
};

export const getLineQuote = (item, selectedQuotes) => {
    return selectedQuotes && selectedQuotes.find(q => {
        return q.chapter === item.chapterNumber &&
            q.startline >= item.lineNumber &&
            q.endline <= item.lineNumber}
    ); 
};

