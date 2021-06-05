import constants from "../store/constants";

export const catTagsToObject = (toCatTags) => {
  //AMSTODO:QUOTE:DEPRECATE??
  const tagsObj = [];
  Object.keys(toCatTags).forEach((c) => {
    // console.log(c);
    // console.log(toCatTags[c]);
    tagsObj.push({ category: c, color: "danger", tags: toCatTags[c] });
  });
  return tagsObj;
};

export const getItemQuoteFromPos = (item, quote, quoteOnly) => {

  if (
    !quote ||
    quote.length === 0 ||
    !quote[0].chapter ||
    item.chapterNumber !== quote[0].chapter
  ) {
    if(quoteOnly){
      return [{ text: "", className: "" }];
    } else {
    return [
        { text: "", className: "" },
        { text: item.text, className: item.class },
        { text: "", className: "" },
      ];
    }
  }

  const sortedQuote = quote.sort(quoteSort); // sort quot
  let l = item.text.length;
  let prevQuote = null;
  let posList = [];
  sortedQuote.forEach((q) => {

    if (prevQuote) {
      if (
        q.startline >= prevQuote.endline &&
        q.startchar >= prevQuote.endchar
      ) {
          posList.push(q.linePos[item.paragraphLineNumber]);
      }
    } else {
      posList.push(q.linePos[item.paragraphLineNumber]);
    }
    prevQuote = { ...q };
  });

  let textQuote = [];
  let prevPos = null;

  if(posList.length > 0){
    posList.forEach((p) => {
      if (prevPos) {
        if (p.start >= prevPos.end) {
          if(!quoteOnly){
            textQuote.push({ text: item.text.slice(prevPos.end, p.start), className: item.class});
          }
        }
      } else {
        if (p.start > 0) {
          // Add start text before first quote
          if(!quoteOnly){
            textQuote.push({ text: item.text.slice(0, p.start), className: item.class });
          }
        }
      }
      textQuote.push({ text: item.text.slice(p.start, p.end), className: item.class + " quoteclass"});
      prevPos = { ...p };
    });
    // Add end text after last quote
    if (posList[posList.length - 1].end < l) {
      if(!quoteOnly){
        textQuote.push({ text: item.text.slice(posList[posList.length - 1].end, l), className: item.class });
      }
    }
  }
  return textQuote;
};

export const buildQuoteViewSettings = (oldQuoteViewSettings, categories) => {
  const newViewSettings = { ...oldQuoteViewSettings };
  if (categories && categories.length > 0) {
    const newCategoriesSelected =
      categories &&
      categories.reduce(function (map, obj) {
        map[obj] = true;
        return map;
      }, {});
    const newCatPlus = {
      [constants.SHOW_UNTAGGED]: true,
      ...newCategoriesSelected,
    };
    //          newCategoriesSelected[constants.SHOW_UNTAGGED] = true;

    if (
      newViewSettings &&
      newViewSettings.categoriesSelected &&
      Object.keys(newViewSettings.categoriesSelected).length > 0
    ) {
      Object.keys(newViewSettings.categoriesSelected).map((oc) => {
        if (oc in newCatPlus) {
          newCatPlus[oc] = newViewSettings.categoriesSelected[oc];
        }
      });
    }
    newViewSettings.categoriesSelected = { ...newCatPlus };
  }
  return newViewSettings;
};

export const getTextSubstrQuoteFromPos = (item, quote, length) => {
  //TODOV1: Build multiple quotes
  //    if(quote.length > 0){
  //      console.log(quote);
  //    }
  //console.log(item, quote, length);

  if (
    !quote ||
    quote.length === 0 ||
    !quote.chapter ||
    item.chapterNumber !== quote.chapter
  ) {
    return [
      { text: "", className: "" },
      { text: item.text, className: "" },
      { text: "", className: "" },
    ];
  }

  let l = item.text.length;
  //
  let pos =
    quote.linePos.length < item.paragraphLineNumber
      ? { start: l, end: l }
      : { ...quote.linePos[item.paragraphLineNumber] };

  return item.text.slice(pos.start, pos.end).substring(0, length);
};

export const quoteSort = (a, b) => {
  if (a.chapter > b.chapter) {
    return 1;
  }
  if (a.chapter < b.chapter) {
    return -1;
  }
  return a.startline - b.startline || a.startchar - b.startchar;
};

export const getTextQuoteFromPos = (item, quote) => {
  //TODOV1: Build multiple quotes
  //    if(quote.length > 0){
  //      console.log(quote);
  //    }

  if (
    !quote ||
    quote.length === 0 ||
    !quote[0].chapter ||
    item.chapterNumber !== quote[0].chapter
  ) {
    return [
      { text: "", className: "" },
      { text: item.text, className: "" },
      { text: "", className: "" },
    ];
  }

  const sortedQuote = quote.sort(quoteSort); // sort quot
  let l = item.text.length;
  let prevQuote = null;
  let posList = [];
  const noPos = { start: l, end: l };

  sortedQuote.forEach((q) => {
      if (prevQuote) {
              if (
                q.startline >= prevQuote.endline &&
                q.startchar >= prevQuote.endchar
              ) {
                  posList = posList.concat([...q.linePos]);
              }
            } else {
                  posList = posList.concat([...q.linePos]);
            }
        prevQuote = { ...q };
      });


  // if(sortedQuote.length > 1){
  //   console.log('sortedQuote', sortedQuote.map(q => {
  //     return { sl: q.startline,
  //             sc: q.startchar,
  //             el: q.endline,
  //             ec: q.endchar,
  //             lp: q.linePos.reduce((t,l) =>  t = t +  ' ' + l.start + '-' + l.end, '')}
  //     }));
  //     console.log('sortedQuote', sortedQuote);
  //     // console.log('sortedQuote', sortedQuote.map(q =>
  //     //     {return {sline: q.startline, schar: q.startchar, eline: q.endline, echar: q.endchar};}));
  //     console.log('posList', posList);
  // }
  // //

  //Del?->
  // let pos = quote[0].linePos.length < item.paragraphLineNumber ?
  //   {start:l, end: l} :
  //   {...quote[0].linePos[item.paragraphLineNumber]};

  let textQuote = [];
  let prevPos = null;

  if(posList.length > 0){
    posList.forEach((p) => {
      if (prevPos) {
        if (p.start >= prevPos.end) {
          textQuote.push({ text: item.text.slice(prevPos.end, p.start), className: ""});
        }
      } else {
        if (p.start > 0) {
          // Add start text before first quote
          textQuote.push({ text: item.text.slice(0, p.start), className: "" });
        }
      }
      textQuote.push({ text: item.text.slice(p.start, p.end), className: "quoteclass"});
      prevPos = { ...p };
    });
    // Add end text after last quote
    if (posList[posList.length - 1].end < l) {
      textQuote.push({ text: item.text.slice(posList[posList.length - 1].end, l), className: "" });
    }
  }
  return textQuote;
};

export const getParaLineQuoteFromPos = (paraLine, startchar, endchar) => {
  let paraLineQuote = [];
  //    console.log(paraLine, startchar, endchar);
  paraLineQuote.push({ text: paraLine.slice(0, startchar), className: "" });
  paraLineQuote.push({
    text: paraLine.slice(startchar, endchar),
    className: "quoteclass",
  });
  paraLineQuote.push({
    text: paraLine.slice(endchar, paraLine.length),
    className: "",
  });
  //console.log(paraLineQuote);
  return paraLineQuote;
};

// export const getParaQuoteForLine = (item, para, quote) => {
//     //debugger;
//     if(!quote ||
//         !quote.chapter ||
//         item.chapterNumber !== quote.chapter ||
//         item.lineNumber < quote.startline ||
//         item.lineNumber > quote.endline){
//         return [{text: '', className: ''},
//                 {text: item.text, className: ''},
//                 {text: '', className: ''}];
//     }

//     let startchar = item.lineNumber > quote.startline ? 1 : quote.startchar;
//     let endchar = item.lineNumber < quote.startline ? item.text.length : quote.endchar;

//     let textQuote = [];
//     textQuote.push({text: item.text.slice(0, startchar), className: ''});
//     textQuote.push({text: item.text.slice(startchar, endchar), className: 'quoteclass'});
//     textQuote.push({text: item.text.slice(endchar, item.text.length), className: ''});

//     return textQuote;
// };

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
  return (
    chapterItems &&
    chapterItems.filter((q) => {
      return (
        q.chapterNumber === item.chapterNumber &&
        q.paragraphNumber === item.paragraphNumber
      );
    })
  );
};

export const getLineQuotes = (item, selectedQuotes) => {
  return (
    selectedQuotes &&
    selectedQuotes.filter((q) => {
      return (
        q.chapter === item.chapterNumber &&
        q.startline <= item.lineNumber &&
        q.endline >= item.lineNumber
      );
    })
  );
};

export const getParagraphQuote = (para, selectedQuotes) => {
  //AMSTODO: Maybe more than one quote per paragraph
  const ll = para.length - 1;
  return (
    selectedQuotes &&
    selectedQuotes.find((q) => {
      return (
        q.chapter === para[0].chapterNumber &&
        q.startline >= para[0].lineNumber &&
        q.endline <= para[ll].lineNumber
      );
    })
  );
};

export const getQuotelinePos = (quote) => {
  let cp = 0;
  let quotePos = quote.paragraphLines.map((q) => {
    let l = q.text.length;
    let ep = cp + l;
    let h = { start: l, end: l };
    //      console.log("q cp l ep", q.text, cp, l, ep);
    if (ep >= quote.startchar && cp <= quote.endchar) {
      const s = quote.startchar > cp ? quote.startchar - cp : 0;
      const e = quote.endchar < ep ? quote.endchar - cp : l;
      //        console.log("s e", s, e);
      h = { start: s, end: e };
    }
    cp = ep;
    return h;
  });
  console.log(quotePos);
  return quotePos;
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
