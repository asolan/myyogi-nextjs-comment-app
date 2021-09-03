import React, { useState, useEffect } from "react";
//import React from 'react';
import "./AyogiLine.css";
import AyogiLineAction from "./AyogiLineAction";
import AyogiMetaItem from "../AyogiMeta/AyogiMetaItem/AyogiMetaItem";
import AyogiQuote from "../AyogiQuote/AyogiQuote";
import AyogiQuoteChipsSimple from "../AyogiQuote/AyogiQuoteChipsSimple";
import AyogiFootnoteAlert from '../AyogiFootnoteAlert/AyogiFootnoteAlert';
import AyogiDefinitionInline from '../AyogiDefinitionInline/AyogiDefinitionInline';
//import AyogiShare from "../AyogiShare/AyogiShare";
import { parseParagraphData, highlightPattern } from "../../utility/parseUtility";
import { IonLabel, IonPopover } from "@ionic/react";
import { shareAQuote, getItemQuoteFromPos, getTextSubstrQuoteFromPos, getLineQuotes, getLinesInParagraph } 
from "../../utility/quoteUtility";
//import useLongPress from "../../utility/useLongPress";
//import  reactStringReplace from 'react-string-replace';

const AyogiLine = (props) => {
  const [showLineAction, setShowLineAction] = useState(false);
  const [lineActionItems, setLineActionItems] = useState([]);
  const [showQuotePopup, setShowQuotePopup] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [indentClasses, setIndentClasses] = useState([]);
  const [allClasses, setAllClasses] = useState([]);
  const [paragraph, setParagraph] = useState("");
  const [lineKey, setLineKey] = useState("");
  const [quotes, setQuotes] = useState([]);
  const [currentQuoteId, setCurrentQuoteId] = useState(null);
  const [isNewQuote, setIsNewQuote] = useState(false);
  const [textQuote, setTextQuote] = useState([]);
  const [hasFootnote, setHasFootnote] = useState(false);
  const [footnoteCount, setFootnoteCount] = useState(0);

  useEffect(() => {
    // if (props.c.lineNumber === 4) {
    //   //    debugger;
    //   console.log("ayogiline[selectedQuotes]", props.c, props.selectedQuotes);
    // }
    buildQuoteAndAction(props.selectedQuotes);
  }, [props.selectedQuotes, props.currentDefinitionPopup]);

  const updateLineActionItems = (existingQuote) => {
    //TODOV1-get quote - first x chars
    let newLineAI = [];

    if(props.goToChapter){
      newLineAI.push({key: 'gotochap', icon: 'book', action: 'gotochap', isNew: false, val: 'Go to Chapter'});
    }

//    console.log(hasFootnote, hasFootnote ? props.c._id + props.c.text: '');
    if(hasFootnote){
      newLineAI.push({key: 'footnote', icon: 'flag', action: 'footnote', isNew: false, val: 'See Footnote'});
    }

    newLineAI.push({key: 'share', icon: 'share', action: 'share', isNew: false, val: 'Share'});

    newLineAI.push({key: 'newquote', icon: 'chatboxEllipses', action: 'quote', isNew: true, val: 'New Quote'});

    if(existingQuote && existingQuote.length > 0){
//      console.log(existingQuote);
      const existQuoteMapped = existingQuote.map(q => {
        // console.log(q);
        // console.log(getTextSubstrQuoteFromPos(props.c, q, 50));
        return {key: q.quoteId, icon: 'chatbox', action: 'quote', isNew: false, val: 'Edit Quote: ' + getTextSubstrQuoteFromPos(props.c, q, 25) + '..'};
      });
//      console.log(existQuoteMapped);
      newLineAI = newLineAI.concat(existQuoteMapped);
//      console.log(newLineAI);
    };

    newLineAI.push({key: 'close', icon: 'close', action: 'close', isNew: false, val: 'Close'});
    setLineActionItems(newLineAI);
  };

  const updateLineAction = (action, value, isNew) => {

    setShowQuotePopup(false);
    switch(action){
      case 'quote':
        setCurrentQuoteId(value);
        setIsNewQuote(isNew);
        setShowQuotePopup(true);
        break;
      // case 'definition':
      //   setDefinitionCount(definitionCount+1);
      //     break;
      case 'footnote':
        setFootnoteCount(footnoteCount+1);
        break;
      case 'share':
        openSharing();
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
    // if(quote && quote.length > 0){
    //   console.log(quote, props.c);
    // }
    const newTextQuote = getItemQuoteFromPos(props.c, quote, props.quoteOnly);

  //   if(props.currentDefinitionPopup && 
  //     props.c.definition && 
  //     props.c.definition.length > 0
  //   ){

  //     let definitionMarkup = props.c.definition.map(d => {
  // //      setDefinitionCount({...definitionCount, [d.word]: 0 })
  //       return ({"search": new RegExp(d.word, "gi"), "dmarkup": (<AyogiDefinitionAlert 
  // //          definitionCount={definitionCount[d.word]}
  //           word={d.word}
  //           definition={d.meaning} />)
  //       });
  //     });

      // const dictTextQuote = newTextQuote.map(t => {
      //   if(t.text && t.text.length > 0){
      //     const meanings = t.text.split(' ').map(w => {
      //       return (<AyogiDefinitionInline
      //           word={w} 
      //         />);
      //       });
      //     const newt = Object.assign({}, t, {text: meanings});
      //     return newt;
      //   };
      // });
    

    setTextQuote(newTextQuote);
    updateLineActionItems(quote);
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

  const openSharing = () => {
    const shareMessage = props.quoteOnly ? 
        textQuote.reduce((p, t) => { return p + t.text }, '') :
        getLinesInParagraph(props.c, props.items).reduce((p, t) => { return p + t.text }, '');
//console.log('openSharing', props.quoteOnly, shareMessage);
    const shareTitle = `Chapter ${props.c.chapterNumber} Paragraph ${props.c.paragraphNumber}`;
//    console.log('openSharing', textQuote, shareMessage);
    shareAQuote(shareTitle, shareMessage);
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
    setHasFootnote(props.c.footnote && props.c.footnote.length > 0 ? true : false);
  }, [props.c, props.i, props.type]);

  useEffect(() => {
    if(hasFootnote){
      buildQuoteAndAction(props.selectedQuotes);
    }
  }, [hasFootnote]);

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
      isNewQuote={isNewQuote}
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
      currentFootnotePopup={props.currentFootnotePopup}
      highlightTerm={props.highlightTerm}
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

  let outputQuote = textQuote &&
    textQuote.map((q, i) => {
      if(props.highlightTerm && props.highlightTerm.length > 0){
        return highlightPattern(q.text, props.highlightTerm);
      }
      if(q.text && q.text.length > 0){
        let resultText;
        if(props.currentDefinitionPopup){
          const dictText = q.text.split(' ');
          resultText = dictText.map((t,i) => {
              return <AyogiDefinitionInline dictionary={props.c.dictionary} word={t} isLast={!dictText[i+1]}/>;
          });
        } else {
          resultText = q.text;
        }
        // console.log(resultText);
        return <span key={`itemquotesels${i}`} className={q.className}>{resultText}</span>
      }
  });

returnVal = (
    <React.Fragment>
      {props.quoteOnly && 
        <AyogiQuoteChipsSimple itemTags={props.itemTags} />
      }
      {quoteModal}
      {paragraph}
      <IonLabel
        onClick = { () => { 
//          console.log('label click');
          setShowLineAction(true); 
        }}
        // {...longPressEvent}
          id={props.c._id}
        // style={props.style}
        className={allClasses.join(" ")}
      >
        {outputQuote}
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
