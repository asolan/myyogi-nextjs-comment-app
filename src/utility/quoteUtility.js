//AMSTODO:QUOTE:DEPRECATE
export const getTextQuoteFromPos = (item, quote) => {

    if(!quote || 
        !quote.chapter ||
        item.chapterNumber !== quote.chapter ||
        item.lineNumber < quote.startline ||
        item.lineNumber > quote.endline){
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

export const getParaLineQuoteFromPos = (paraLine, startchar, endchar) => {
    let paraLineQuote = [];
    console.log(paraLine, startchar, endchar);
    paraLineQuote.push({text: paraLine.slice(0, startchar), className: ''});
    paraLineQuote.push({text: paraLine.slice(startchar, endchar), className: 'quoteclass'});
    paraLineQuote.push({text: paraLine.slice(endchar, paraLine.length), className: ''});
console.log(paraLineQuote);
    return paraLineQuote;
};

export const getParaQuoteForLine = (item, para, quote) => {
    //debugger;
    if(!quote || 
        !quote.chapter ||
        item.chapterNumber !== quote.chapter ||
        item.lineNumber < quote.startline ||
        item.lineNumber > quote.endline){
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

// export const getParaQuoteFromFullPos = (para, quote) => {
//     //debugger;
//     const ll = para.length-1;
//     const tt = para && para.reduce((t,l) => { t+= l.text; return t; },'');

//     if(!quote || 
//         !quote.chapter ||
//         para[0].chapterNumber !== quote.chapter ||
//         para[0].lineNumber < quote.startline ||
//         para[ll].lineNumber > quote.endline){
//         return [{text: '', className: ''},
//                 {text: tt, className: ''},
//                 {text: '', className: ''}];
//     }

//     let textQuote = [];
//     textQuote.push({text: tt.slice(0, quote.startchar), className: ''});
//     textQuote.push({text: tt.slice(quote.startchar, quote.endchar), className: 'quoteclass'});
//     textQuote.push({text: tt.slice(quote.endchar, tt.length), className: ''});
    
//     return textQuote;
// };
    
export const getLinesInParagraph = (item, chapterItems) => {
    return chapterItems && chapterItems.filter(q => {
        return q.chapterNumber === item.chapterNumber &&
            q.paragraphNumber ===  item.paragraphNumber}
    ); 
};

export const getLineQuote = (item, selectedQuotes) => {
    return selectedQuotes && selectedQuotes.find(q => {
        return q.chapter === item.chapterNumber &&
            q.startline >= item.lineNumber &&
            q.endline <= item.lineNumber}
    ); 
};

export const getParagraphQuote = (para, selectedQuotes) => {
    //AMSTODO: Maybe more than one quote per paragraph
    const ll = para.length-1;
    return selectedQuotes && selectedQuotes.find(q => {
        return q.chapter === para[0].chapterNumber &&
            q.startline >= para[0].lineNumber &&
            q.endline <= para[ll].lineNumber}
    ); 
};

// export const getParaQuoteFromPos = (para, quote) => {
// //debugger;
//     const ll = para.length-1;
//     const tt = para && para.reduce((t,l) => { t+= l.text; return t; },'');

//     if(!quote || 
//         !quote.chapter ||
//         para[0].chapterNumber !== quote.chapter ||
//         para[0].lineNumber < quote.startline ||
//         para[ll].lineNumber > quote.endline){
//         return [{text: '', className: ''},
//                 {text: tt, className: ''},
//                 {text: '', className: ''}];
//     }

//     let textRaw = [];

//     textRaw.push(para.reduce((t,l) => { 
//         if(l.lineNumber < quote.startline) t += l.text + ''; 
//         if(l.lineNumber === quote.startline) t += l.text.slice(0, quote.startchar); 
//         return t;
//     }, ''));

//     textRaw.push(para.reduce((t,l)  => { 
//         if(l.lineNumber >= quote.startline){
//             let realStart = quote.startchar;
//             if(l.lineNumber > quote.startline) realStart = 0;

//             let realEnd = quote.endchar;
//             if(l.lineNumber < quote.endline) realEnd = l.text.length;

//             if(l.lineNumber >= quote.startline && l.lineNumber <= quote.endline) {
//                 t += l.text.slice(realStart, realEnd) + ''; 
//             }
//         }
//         return t;
//     }, ''));

//     textRaw.push(para.reduce((t,l)  => { 
//         if(l.lineNumber >= quote.endline){
//             let realEnd = quote.endchar;
//             if(l.lineNumber < quote.endline) realEnd = l.text.length;
//             t += l.text.slice(0, realEnd) + ''; 
//         }
//         return t;
//     }, ''));

//     let textQuote = [];
//     textQuote.push({text: textRaw[0], className: ''});
//     textQuote.push({text: textRaw[1], className: 'quoteclass'});
//     textQuote.push({text: textRaw[2], className: ''});

//     return textQuote;
// };

