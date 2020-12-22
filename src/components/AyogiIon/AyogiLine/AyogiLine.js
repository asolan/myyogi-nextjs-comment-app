import React, { useState } from "react";
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
import { is } from "immutable";
import { LINE_TYPE_ENUM } from "../../../utility/dataTypes";

const AyogiLine = (props) => {
  // <div className={classes.AyogiChapter}>
  const [isSelected, setIsSelected] = useState(0);

  const setSelectedQuote = (count) => {
    setIsSelected(count);
    if(count % 3 === 2){
        props.addSelectedQuote(props.c.chapterNumber, props.c.lineNumber, LINE_TYPE_ENUM.WISDOM);
    }

    if(count % 3 === 0){
        props.removeSelectedQuote(props.c.chapterNumber, props.c.lineNumber, LINE_TYPE_ENUM.WISDOM);
    }
  };

  let [paragraph, footnote, indentClasses] = parseParagraphData(
    props.c,
    props.i
  );

  indentClasses.push(props.type.toLowerCase());
  //    console.log([paragraph, footnote, indentClasses]);
  let pFab = null;

  if (isSelected % 3 > 0) {
    indentClasses.push("itemSelected");

    let fabIc = isSelected % 3 === 1 ? squareOutline : checkboxOutline;
    pFab = (<IonIcon icon={fabIc} />);
  }

  let returnVal = <div />;

  returnVal = (
    <React.Fragment>
      {paragraph}
      {pFab}
      <IonLabel
        onClick={() => setSelectedQuote(isSelected+1)}
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

  return returnVal;
};

export default AyogiLine;
