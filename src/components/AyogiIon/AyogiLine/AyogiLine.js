import React, { useState, useEffect } from "react";
//import React from 'react';
import "./AyogiLine.css";
import AyogiMetaItem from "../AyogiMeta/AyogiMetaItem/AyogiMetaItem";
import AyogiQuoteSelection from "../AyogiQuoteSelection/AyogiQuoteSelection";
import { parseParagraphData } from "../../../utility/parseUtility";
//import { LINE_TYPE_ENUM } from '../../../utility/dataTypes';
import {
  IonFab,
  IonFabButton,
  IonIcon,
  IonFabList,
  IonLabel,
} from "@ionic/react";
import { checkboxOutline, squareOutline } from "ionicons/icons";
import { is, setIn } from "immutable";
import { LINE_TYPE_ENUM } from "../../../utility/dataTypes";
import constants from "../../../store/constants";

const AyogiLine = (props) => {
  const [showQuotePopup, setShowQuotePopup] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [indentClasses, setIndentClasses] = useState([]);
  const [allClasses, setAllClasses] = useState([]);
  const [paragraph, setParagraph] = useState('');
  const [footnote, setFootnote] = useState('');
  // <div className={classes.AyogiChapter}>

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
      console.log('isSelected');
      newIndentClasses.push("itemSelected");
    }
    setAllClasses(newIndentClasses);
      // console.log(newIndentClasses);
  //    console.log('isLineSelected', props.isLineSelected);    
  }, [isSelected]);
  
  let quoteModal = null;
  
  if(props.currentQuoteSelection === constants.MY_QUOTE_SELECTION.CATEGORIZED) {
    quoteModal = (<AyogiQuoteSelection 
                    showQuotePopup={showQuotePopup}
                    setShowQuotePopup={setShowQuotePopup}
                    item={props.c} />);
  }

  let returnVal = <div />;

  returnVal = (
    <React.Fragment>
      {quoteModal}
      {paragraph}
      <IonLabel
        onClick={() => {
          switch(props.currentQuoteSelection){
            case constants.MY_QUOTE_SELECTION.BASIC:
              setIsSelected(!isSelected);
              isSelected ? 
                props.removeSelectedQuote(props.c.chapterNumber, props.c.lineNumber, LINE_TYPE_ENUM.WISDOM) :
                props.addSelectedQuote(props.c.chapterNumber, props.c.lineNumber, LINE_TYPE_ENUM.WISDOM);
              break;
            case constants.MY_QUOTE_SELECTION.CATEGORIZED:
              setShowQuotePopup(true);
              setIsSelected(!isSelected);
              break;
          }
        }}
        id={props.c._id}
        // style={props.style}
        className={allClasses.join(" ")}
      >
        {props.c.text}
        <AyogiMetaItem c={props.c} />
      </IonLabel>
      {footnote}
    </React.Fragment>
  );
  return returnVal;
};

export default AyogiLine;
