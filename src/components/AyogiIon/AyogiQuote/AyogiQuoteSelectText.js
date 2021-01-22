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
import {getParaQuoteFromPos} from '../../../shared/helper';
import { book, bookOutline, list, listOutline, chatbubble } from "ionicons";
import { get } from "https";

const AyogiQuoteSelectText = (props) => {
  const [selectorShow, setSelectorShow] = useState(false);
  const [startPos, setStartPos] = useState(0);
  const [endPos, setEndPos] = useState(0);
  const [quote, setQuote] = useState({});

  useEffect(() => {
    setNewEndPos(props.paragraphLines);
  }, []);

  useEffect(() => {
    setNewEndPos(props.paragraphLines);
  }, [props.paragraphLines]);

  const setNewEndPos = (para) => {
    let newEndPos = para.reduce((l,p) => l + p.text.length);
    setEndPos(newEndPos);
  };

  useEffect(() => {
    if(props.quoteState.chapter > 0 && props.quoteState.startline > 0){
      console.log('AyogiQuoteSelectText[props.quoteState]', props.quoteState);
      setQuote({...props.quoteState});
      setStartPos(props.quoteState.startchar);
      setEndPos(props.quoteState.endchar);
    } else {
      const lastLine = props.paragraphLines.length-1;
      setQuote({
        chapter: props.paragraphLines[0].chapterNumber,
        startline: props.paragraphLines[0].lineNumber,
        startchar: 0,
        endline: props.paragraphLines[lastLine].lineNumber,
        endchar: props.paragraphLines[lastLine].text ? props.paragraphLines[lastLine].text : 0,
        categororyTags: {},
        tags: [],
      });
    }
  }, [props.quoteState]);

//  const textQuote = getTextQuoteFromPos(props.item, {...quote, startchar:startPos ,endchar: endPos});
  const paraQuote = getParaQuoteFromPos(props.paragraphLines, {...quote, startchar:startPos ,endchar: endPos});
  // console.log(quote);
  console.log(paraQuote);
  let realEnd = endPos > 0 ? endPos : props.item.text.length;

  let textSelected = (
    <React.Fragment>
      <IonText className="ion-margin-start">
      {paraQuote.slice(1,2).map((q,i) => <span key={`itemquoteselt${props.item._id}${i}`} className={q.className}>{q.text}</span>)}
      </IonText>
      {/* <IonText className="ion-margin-start">
      {props.paragraphLines && props.paragraphLines.map(l => {
        return l.text
      })}
      </IonText> */}
      <IonItem>
        <IonButton
          color="primary"
          fill={"solid"}
          onClick={() => {
            setSelectorShow(!selectorShow);
          }}
        >
          Change Text
        </IonButton>
      </IonItem>{" "}
    </React.Fragment>
  );

  let rangeSelector = null;

  const adjustPos = (amount, isStart, isAdd) => {
    if (
      isStart && ((!isAdd && startPos - amount >= 0) ||
      (isAdd && startPos + amount <= endPos))
    ) {
      setStartPos(isAdd ? startPos + amount : startPos - amount);
    }

    if (
      !isStart && ((!isAdd && endPos - amount >= startPos) ||
      (isAdd && endPos + amount <= props.item.text.length))
    ) {
      setEndPos(isAdd ? endPos + amount : endPos - amount);
    }
  };

  rangeSelector = (
    <React.Fragment>
      <IonText className="ion-margin-start">
        {paraQuote.map((q, i) => <span key={`itemquotesels${props.item._id}${i}`} className={q.className}>{q.text}</span>)}
      </IonText>
      <IonRange
        className="quoterange"
        //          debounce={5}
        dualKnobs={true}
        min={0}
        max={props.item.text.length}
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
            let pos = {
              chapter: props.item.chapterNumber,
              startline: props.item.lineNumber,
              startchar: startPos,
              endline: props.item.lineNumber,
              endchar: endPos,
            };
            props.setPos(pos);
            setSelectorShow(!selectorShow);
          }}
        >
          Set
        </IonButton>
      </IonItem>
    </React.Fragment>
  );

  let returnVal = (
    <div className="AyogiQuoteSelectText">
      {selectorShow ? rangeSelector : textSelected}
    </div>
  );
  return returnVal;
};

export default AyogiQuoteSelectText;
