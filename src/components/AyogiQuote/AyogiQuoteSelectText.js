import React, { useState, useEffect } from "react";
//import React from 'react';
import "./AyogiQuoteSelectText.css";
import {
  IonItem,
  IonModal,
  IonIcon,
  IonList,
  IonLabel,
  IonButton,
  IonTextarea,
  IonRadioGroup,
  IonText,
  IonRange,
} from "@ionic/react";
import {getParaQuoteFromPos, getParaLineQuoteFromPos} from '../../utility/quoteUtility';
import { book, bookOutline, list, listOutline, chatbubble } from "ionicons";
import { get } from "https";
import constants from "../../store/constants";

const AyogiQuoteSelectText = (props) => {
  // const [selectorShow, setSelectorShow] = useState(false);
  const [startPos, setStartPos] = useState(0);
  const [endPos, setEndPos] = useState(0);
//  const [paraQuote, setParaQuote] = useState([]);

  useEffect(() => {
  }, []);

  useEffect(() => {
    // if(props.quoteState.chapter > 0 && props.quoteState.startline > 0){
      console.log('AyogiQuoteSelectText[props.quoteState]', props.quoteState);
      if(props.quoteState.chapter > 0 || props.quoteState.startline > 0){
        const schar = props.quoteState.startchar;
        const echar = props.quoteState.endchar;

        setStartPos(schar);
        setEndPos(echar);
        console.log(props.quoteState.paragraphLine);
        // const newParaQuote = getParaLineQuoteFromPos(props.quoteState.paragraphLine, {...props.quoteState, startchar:schar ,endchar: echar});
        // console.log(newParaQuote);
        // setParaQuote(newParaQuote);
      }
  }, [props.quoteState]);

  // useEffect(() => {
  //   const newParaQuote = getParaLineQuoteFromPos(props.quoteState.paragraphLine, {...quote, startchar:startPos ,endchar: endPos});
  //   setParaQuote(newParaQuote);
  // }, [props.quoteState.paragraphLine]);

//  const textQuote = getTextQuoteFromPos(props.item, {...quote, startchar:startPos ,endchar: endPos});
  // console.log(quote);
//  console.log(paraQuote);
  let realEnd = endPos > 0 ? endPos : props.quoteState.paragraphLine.length;
  const paraQuote = getParaLineQuoteFromPos(props.quoteState.paragraphLine, startPos, endPos);

  const adjustPos = (amount, isStart, isAdd) => {
    if (
      isStart && ((!isAdd && startPos - amount >= 0) ||
      (isAdd && startPos + amount <= endPos))
    ) {
      setStartPos(isAdd ? startPos + amount : startPos - amount);
    }
// AMSTODO: adjust by + 1 to end not working
    if (
      !isStart && ((!isAdd && endPos - amount >= startPos) ||
      (isAdd && endPos + amount <= props.item.text.length))
    ) {
      setEndPos(isAdd ? endPos + amount : endPos - amount);
    }
  };

  let rangeSelector = (
    <React.Fragment>
      <IonText className="ion-margin-start">
        {paraQuote.map((q, i) => <span key={`itemquotesels${props.item._id}${i}`} className={q.className}>{q.text}</span>)}
      </IonText>
      <IonRange
        className="quoterange"
        //          debounce={5}
        dualKnobs={true}
        min={0}
        max={props.quoteState.paragraphLine.length}
        step={3}
        snaps={false}
        //          pin
        value={{ lower: startPos, upper: realEnd }}
        onIonChange={(e) => {
          //          console.log(e.detail.value);
          setStartPos(e.detail.value.lower);
          setEndPos(e.detail.value.upper);
        }}
      >
        <ion-icon
          slot="start"
          size="small"
          color="secondary"
          name="chatbubble"
        ></ion-icon>
        <ion-icon slot="end" color="secondary" name="chatbubble"></ion-icon>
      </IonRange>
      <IonItem>
        {/* <IonButton fill="outline" slot="start" onClick={() => { adjustPos(5,true,false) }}>
            <ion-icon size="small" color="secondary" name="bookOutline"></ion-icon>
        </IonButton> */}
        <IonButton
          fill="outline"
          slot="start"
          onClick={() => {
            adjustPos(1, true, false);
          }}
        >-
          {/* <ion-icon
            size="small"
            color="secondary"
            name="bookOutline"
          ></ion-icon> */}
        </IonButton>
        <IonText className="ion-padding" slot="start">Start</IonText>
        <IonButton
          fill="outline"
          slot="start"
          onClick={() => {
            adjustPos(1, true, true);
          }}
        >+
          {/* <ion-icon
            size="small"
            color="primary"
            name="bookOutline"
          ></ion-icon> */}
        </IonButton>
        {/* <IonButton fill="outline" slot="start" onClick={() => { adjustPos(5,true,true) }}>
            <ion-icon size="small" color="secondary" name="bookOutline"></ion-icon>
        </IonButton> */}
        {/* </IonItem>
        <IonItem> */}
        {/* <IonButton fill="outline" slot="end" onClick={() => { adjustPos(5,false,false)}}>
            <ion-icon size="small" color="secondary" name="listOutline"></ion-icon>
        </IonButton> */}
        <IonButton
          fill="outline"
          slot="end"
          onClick={() => {
            adjustPos(1, false, false);
          }}
        >-
          {/* <ion-icon
            size="tiny"
            color="secondary"
            name="list"
          ></ion-icon> */}
        </IonButton>
        <IonText className="ion-padding" slot="end">End</IonText>
        <IonButton
          fill="outline"
          slot="end"
          onClick={() => {
            adjustPos(1, false, true);
          }}
        >+
          {/* <ion-icon
            color="primary"
            name="list"
          ></ion-icon> */}
        </IonButton>
        {/* <IonButton fill="outline" slot="end" onClick={() => { adjustPos(5,false,true)}}>
            <ion-icon size="small" color="secondary" name="listOutline"></ion-icon>
        </IonButton> */}
      </IonItem>
      <IonItem>
        <IonButton
          color="primary"
          fill={"solid"}
          onClick={() => {
            let pos = {...props.quoteState, startchar: startPos, endchar: endPos };
            props.setPos(pos);
            props.setQuoteEdit(constants.QUOTE_EDIT.NONE);
          }}
        >
          Set
        </IonButton>
      </IonItem>
    </React.Fragment>
  );

  let returnVal = (
    <div className="AyogiQuoteSelectText">
      {rangeSelector}
    </div>
  );
  return returnVal;
};

export default AyogiQuoteSelectText;
