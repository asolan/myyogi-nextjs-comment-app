import React, { useState, useEffect } from "react";
//import React from 'react';
import "./AyogiQuoteTags.css";
import {
  IonItem,
  IonModal,
  IonIcon,
  IonList,
  IonLabel,
  IonButton,
  IonContent,
  IonRadioGroup,
  IonCheckbox,
} from "@ionic/react";

const AyogiQuoteTags = (props) => {

  const [quoteTagsList, setQuoteTagsList] = useState([]);
  const [saintsPersonagesList, setSaintsPersonagesList] = useState([]);
  const [godheadsList, setGodheadsList] = useState([]);
  const [scripturesList, setScripturesList] = useState([]);
  const [religionsList, setReligionsList] = useState([]);

  useEffect(() => {
    setQuoteTagsList(
      (props.currentQuoteTags &&
        props.currentQuoteTags.map((s) => {
          const wasChecked =
            props.itemTags &&
            props.itemTags.length > 0 &&
            props.itemTags.indexOf(s) > -1;
          return { val: s, isChecked: wasChecked };
        })) ||
        []
    );
  }, [props.currentQuoteTags]);

  const getSelectedTags = () => {
    const selectedTags = [];
    if (quoteTagsList.length > 0)
      selectedTags.push(
        ...quoteTagsList.filter((t) => t.isChecked).map((t) => t.val)
      );
    return selectedTags;
  };

  const listMyTags =
    quoteTagsList.length > 0 ? (
      quoteTagsList.map(({ val, isChecked }, i) => (
        <IonItem key={i}>
          <IonLabel>{val}</IonLabel>
          <IonCheckbox
            slot="end"
            value={val}
            checked={isChecked}
            onIonChange={(e) =>
              setQuoteTagsList([
                ...quoteTagsList.slice(0, i),
                { ...quoteTagsList[i], isChecked: e.detail.checked },
                ...quoteTagsList.slice(i + 1),
              ])
            }
          />
        </IonItem>
      ))
    ) : (
      <IonItem>
        <IonLabel>Click here to set your tags</IonLabel>
      </IonItem>
    );

  let returnVal = (
    <React.Fragment>
      <IonModal isOpen={props.showQuotePopup} cssClass="">
        <IonItem>
          <h2 className="ion-margin-start">Quote Selection</h2>
        </IonItem>
        <IonLabel className="ion-margin-start">{props.item.text}</IonLabel>
        <IonContent>
          <IonList>
            <IonItem>
              <h4>My Tags</h4>
            </IonItem>
            {listMyTags}
          </IonList>
        </IonContent>
        <IonButton
          onClick={() => {
            const selTags = getSelectedTags();
            props.addSelectedQuote(
              props.item.chapterNumber,
              props.item.lineNumber,
              1,
              props.item.lineNumber, 
              props.item.text.length, 
              selTags);
            props.setIsSelected(true);
            props.setShowQuotePopup(false);
          }}
        >
          Save Quote
        </IonButton>
        <IonButton
          color="light"
          onClick={() => {
            props.removeSelectedQuote(
              props.item.chapterNumber, 
              props.item.lineNumber, 
              1);
            props.setIsSelected(false);
            props.setShowQuotePopup(false);
          }}
        >
          Remove Quote
        </IonButton>
      </IonModal>
    </React.Fragment>
  );
  return returnVal;
};

export default AyogiQuoteTags;
