import React, { useState, useEffect } from "react";
//import React from 'react';
import "./AyogiLine.css";
import AyogiMetaItem from "../AyogiMeta/AyogiMetaItem/AyogiMetaItem";
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

const AyogiLine = (props) => {
  const [indentClasses, setIndentClasses] = useState([]);
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
    let newIndent = [...indentClasses];
    newIndent.concat(ic);
    setIndentClasses(newIndent);

  }, [props.c, props.i, props.type]);

  useEffect(() => {
//    console.log('isLineSelected', props.isLineSelected);    
    let newIndent = [...indentClasses];
    if (props.isLineSelected) {
      newIndent.push("itemSelected")
      setIndentClasses(newIndent);
    } else {
      const sIndex = newIndent.indexOf("itemSelected");
      if (sIndex !== -1) {
        // console.log(indentClasses.splice(sIndex, 1));
        setIndentClasses(newIndent.splice(sIndex, 1));
      }
    }
  }, [props.isLineSelected]);
  
  let returnVal = <div />;
  if(typeof indentClasses === 'number'){
    console.log(props.c, indentClasses);
    returnVal = <React.Fragment>{props.c.text}</React.Fragment>
  } else {
  returnVal = (
    <React.Fragment>
      {paragraph}
      <IonLabel
        onClick={() => {
          props.isLineSelected ? 
            props.removeSelectedQuote(props.c.chapterNumber, props.c.lineNumber, LINE_TYPE_ENUM.WISDOM) :
            props.addSelectedQuote(props.c.chapterNumber, props.c.lineNumber, LINE_TYPE_ENUM.WISDOM);
        }}
        id={props.c._id}
        // style={props.style}
        className={indentClasses.join(" ")}
      >
        {props.c.text}
        <AyogiMetaItem c={props.c} />
      </IonLabel>
      {footnote}
    </React.Fragment>
  );
      }
  return returnVal;
};

export default AyogiLine;
