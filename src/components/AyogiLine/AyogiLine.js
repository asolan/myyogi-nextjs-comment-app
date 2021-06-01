import React, { useState, useEffect } from "react";
//import React from 'react';
import "./AyogiLine.css";
import AyogiLineAction from "./AyogiLineAction";
import AyogiMetaItem from "../AyogiMeta/AyogiMetaItem/AyogiMetaItem";
import AyogiQuote from "../AyogiQuote/AyogiQuote";
import AyogiQuoteChipsSimple from "../AyogiQuote/AyogiQuoteChipsSimple";
import AyogiFootnoteAlert from '../AyogiFootnoteAlert/AyogiFootnoteAlert';
import { parseParagraphData } from "../../utility/parseUtility";
import { IonLabel } from "@ionic/react";
import { getItemQuoteFromPos, getTextSubstrQuoteFromPos, getLineQuotes } from "../../utility/quoteUtility";
//import useLongPress from "../../utility/useLongPress";

const AyogiLine = (props) => {
  const [showLineAction, setShowLineAction] = useState(false);
  const [lineActionItems, setLineActionItems] = useState([]);
  const [showQuotePopup, setShowQuotePopup] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [indentClasses, setIndentClasses] = useState([]);
  const [allClasses, setAllClasses] = useState([]);
  const [paragraph, setParagraph] = useState("");
  const [lineKey, setLineKey] = useState("");
  const [hasFootnote, setHasFootnote] = useState(false);
  const [footnoteCount, setFootnoteCount] = useState(0);
  const [quotes, setQuotes] = useState([]);
  const [currentQuoteId, setCurrentQuoteId] = useState(null);
  const [textQuote, setTextQuote] = useState([]);
  // <div className={classes.AyogiChapter}>

  useEffect(() => {
    // if (props.c.lineNumber === 4) {
    //   //    debugger;
    //   console.log("ayogiline[selectedQuotes]", props.c, props.selectedQuotes);
    // }
    buildQuoteAndAction(props.selectedQuotes);
  }, [props.selectedQuotes]);

  const updateLineActionItems = (newQuote) => {
    //TODOV1-get quote - first x chars
    let newLineAI = [];
    if( newQuote){
      newLineAI = newQuote.map(q => {
      // console.log(q);
      // console.log(getTextSubstrQuoteFromPos(props.c, q, 50));
      return {key: q.quoteId, icon: 'chatbox', action: 'quote', val: 'Edit Quote: ..' + getTextSubstrQuoteFromPos(props.c, q, 25) + '..'};
    });
  }

    newLineAI.push({key: 'newquote', icon: 'chatboxEllipses', action: 'quote', val: 'New Quote'});
    if(hasFootnote){
      newLineAI.push({key: 'footnote', icon: 'flag', action: 'footnote', val: 'See Footnote'});
    }

    if(props.goToChapter){
      newLineAI.push({key: 'gotochap', icon: 'book', action: 'gotochap', val: 'Go to Chapter'});
    }
    newLineAI.push({key: 'close', icon: 'close', action: 'close', val: 'Close'});
    setLineActionItems(newLineAI);
  };

  const updateLineAction = (action, value) => {

    setShowQuotePopup(false);
    switch(action){
      case 'quote':
        setCurrentQuoteId(value);
        setShowQuotePopup(true);
        break;
      case 'footnote':
        setFootnoteCount(footnoteCount+1);
        break;
      case 'gotochap':
        const newPos = "/ayogi/" + props.c.chapterNumber + "/" + props.c.lineNumber
//        props.onChangeChapter(props.c.chapterNumber);
        props.history.push(newPos);
        break;
        case 'close':
      default:
          break;
      }
  }

  const buildQuoteAndAction = (bQuotes) => {
    setQuotes(bQuotes);
    const quote = getLineQuotes(props.c, bQuotes);
    if(quote && quote.length > 0){
//      console.log(quote, props.c);
    }
    updateLineActionItems(quote);

    const newTextQuote = getItemQuoteFromPos(props.c, quote, props.quoteOnly);
    setTextQuote(newTextQuote);

  };

  const updateQuote = (newQuote) => {
      //TODOV1: Build multiple quotes
      const newQuotes = [...quotes];
      const quoteIndex = newQuotes.findIndex(q => q.quoteId === newQuote.quoteId);

      if(quoteIndex > -1){
        newQuotes[quoteIndex] = newQuote;
      } else {
        newQuotes.push(newQuote);
      }
      buildQuoteAndAction(newQuotes);
  };

  useEffect(() => {
    let [p, id, ic] = parseParagraphData(props.c, props.i);

    //    console.log(indentClasses);
    ic.push(props.type.toLowerCase());

    //    console.log(paragraph, footnote, indentClasses);
    //    console.log(indentClasses);

    setParagraph(p);
    setLineKey(id);
    setIndentClasses(ic);
    setHasFootnote(props.c.footnote && props.c.footnote.length > 0);
  }, [props.c, props.i, props.type]);

  useEffect(() => {
    setIsSelected(props.isLineSelected);
    //    console.log('isLineSelected', props.isLineSelected);
  }, [props.isLineSelected]);

  useEffect(() => {
    let newIndentClasses = [...indentClasses];
    // console.log(newIndentClasses);
    if (isSelected) {
      //      console.log('isSelected');
      newIndentClasses.push("itemSelected");
    }
    setAllClasses(newIndentClasses);
    // console.log(newIndentClasses);
    //    console.log('isLineSelected', props.isLineSelected);
  }, [isSelected]);

  let quoteModal = showQuotePopup ? (
    <AyogiQuote
      key={`AyogiQuote-${props.c.id}`}
      quotes={quotes}
      quoteId={currentQuoteId}
      updateQuote={updateQuote}
      showQuotePopup={showQuotePopup}
      setShowQuotePopup={setShowQuotePopup}
      setIsSelected={setIsSelected}
      item={props.c}
      {...props}
    />
  ) : null;

  let returnVal = <div />;
  let footnoteMarkup = hasFootnote ?       
    (<AyogiFootnoteAlert 
      footnoteCount={footnoteCount}
      key={'f'+lineKey} 
      c={props.c} />) : null;
    
//  const onLongPress = () => { setShowLineAction(true); };
//  const onClick = () => { setShowLineAction(true); };

//  const longPressEvent = useLongPress(onLongPress, 700);   

  // const searchMatch = (searchString, searchTerm) => {
  //   // /(\bmoo+\b)/
  //   const newSearchTerm = '(\\b' + searchTerm + '\\b)';
  //   const regr = new RegExp(newSearchTerm,"gi");

  //   const parts = searchString.split(regr);
  //   console.log(parts);
  //   return parts.map(part => (part.match(regr) ? <span className="searchfind">{part}</span> : part));
  // };

  const highlightPattern = (text, term) => {
    if(text && text.length > 0 && typeof text === 'string'){
      const pattern = new RegExp(term,"gi");
      const splitText = text.split(pattern);
    
      if (splitText.length <= 1) {
        return text;
      }
    
      const matches = text.match(pattern);
    
      return splitText.reduce((arr, element, index) => (matches[index] ? [
        ...arr,
        element,
        <span className="searchfind" key={`searchfind${index}`}>
          {matches[index]}
        </span>,
      ] : [...arr, element]), []);
    } else {
      return text;
    }
  };
  
returnVal = (
    <React.Fragment>
      <AyogiQuoteChipsSimple itemTags={props.itemTags} />
      {quoteModal}
      {paragraph}
      <IonLabel
        onClick = { () => { setShowLineAction(true); }}
        // {...longPressEvent}
          id={props.c._id}
        // style={props.style}
        className={allClasses.join(" ")}
      >
        {textQuote &&
          textQuote.map((q, i) => (
            <span key={`itemquotesels${i}`} className={q.className}>
              {props.highlightTerm && props.highlightTerm.length > 0 ? 
                highlightPattern(q.text, props.highlightTerm) 
                : q.text}
            </span>
          ))}
        {/* {props.c.text} */}
        <AyogiMetaItem c={props.c} />
      </IonLabel>
      {footnoteMarkup}
      <AyogiLineAction
        lineActionItems={lineActionItems}
        showLineAction={showLineAction}
        setShowLineAction={setShowLineAction}
        updateLineAction={updateLineAction}
      ></AyogiLineAction>
    </React.Fragment>
  );
  return returnVal;
};

export default AyogiLine;
