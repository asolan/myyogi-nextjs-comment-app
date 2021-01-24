import React, { useState, useEffect } from "react";
//import React from 'react';
import "./AyogiLine.css";
import AyogiMetaItem from "../AyogiMeta/AyogiMetaItem/AyogiMetaItem";
import AyogiQuote from "../AyogiQuote/AyogiQuote";
import { parseParagraphData } from "../../../utility/parseUtility";
import {
  IonLabel,
} from "@ionic/react";
import {getTextQuoteFromPos, getLineQuote} from '../../../shared/helper';

const AyogiLine = (props) => {
  const [showQuotePopup, setShowQuotePopup] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [indentClasses, setIndentClasses] = useState([]);
  const [allClasses, setAllClasses] = useState([]);
  const [paragraph, setParagraph] = useState('');
  const [footnote, setFootnote] = useState('');
  const [textQuote, setTextQuote] = useState([]);
  // <div className={classes.AyogiChapter}>
  
  useEffect(() => {
    const quote = getLineQuote(props.c, props.selectedQuotes);
    const newTextQuote = getTextQuoteFromPos(props.c, quote);
    setTextQuote(newTextQuote);
  }, [props.selectedQuotes]);

  const updateQuote = (newQuote) => {
    const newTextQuote = getTextQuoteFromPos(props.c, newQuote);
    setTextQuote(newTextQuote);
  };

  useEffect(() => {
    let [p, f, ic] = parseParagraphData(
      props.c,
      props.i
    );

//    console.log(indentClasses);
    ic.push(props.type.toLowerCase());

//    console.log(paragraph, footnote, indentClasses);
//    console.log(indentClasses);

    setParagraph(p);
    setFootnote(f);
    setIndentClasses(ic);

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
  
  let quoteModal = showQuotePopup ? (<AyogiQuote 
                    updateQuote={updateQuote}
                    showQuotePopup={showQuotePopup}
                    setShowQuotePopup={setShowQuotePopup}
                    setIsSelected={setIsSelected}
                    item={props.c}
                    {...props}
                     />) : null;
  

  let returnVal = <div />;

  returnVal = (
    <React.Fragment>
      {quoteModal}
      {paragraph}
      <IonLabel
        onClick={() => { setShowQuotePopup(true);}}
        id={props.c._id}
        // style={props.style}
        className={allClasses.join(" ")}
      >
        {textQuote && textQuote.map((q, i) => <span key={`itemquotesels${i}`} className={q.className}>{q.text}</span>)}
        {/* {props.c.text} */}
        <AyogiMetaItem c={props.c} />
      </IonLabel>
      {footnote}
    </React.Fragment>
  );
  return returnVal;
};

export default AyogiLine;
