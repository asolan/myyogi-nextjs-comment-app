import React, { useState, useEffect } from "react";
//import React from 'react';
import "./AyogiQuoteSelection.css";
import AyogiMetaItem from "../AyogiMeta/AyogiMetaItem/AyogiMetaItem";
import { parseParagraphData } from "../../../utility/parseUtility";
//import { LINE_TYPE_ENUM } from '../../../utility/dataTypes';
import {
  IonItemDivider,
  IonModal,
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonRadio,
  IonRadioGroup,
} from "@ionic/react";
import { checkboxOutline, squareOutline } from "ionicons/icons";
import { is, setIn } from "immutable";
import { LINE_TYPE_ENUM } from "../../../utility/dataTypes";
import constants from "../../../store/constants";
import { isTemplateExpression } from "typescript";

const AyogiQuoteSelection = (props) => {
  const [selectedCategory, setSelectedCategory] = useState("yogananda");
  let saintsPersonages = [
    "Yogananda",
    "Jesus Christ",
    "Lahiri Mahasaya",
    "Sri Yukteswar",
    "Babaji",
    "Krishna",
    "Buddha",
    "SAnanamoya Ma",
    "Swami Pranabananda",
    "Ram Gopal Muzumdar",
    "Gandhi",
    "Bhagabati",
    "Therese Neumann",
    "Giri Bala"
  ];
  let godhead = [
    "Brahma",
    "Vishnu",
    "Shiva",
    "Durga",
    "Kali",
    "Yoga Sutras",
    "Babaji",
    "Ram",
    "Sita"
  ];
  let scriptures = [
    "Bible",
    "Bhagavad Git",
    "Mahabharata",
    "Yoga Sutras",
    "Koran",
  ];
  let religions = [
    "Christianity",
    "Buddhism",
    "Sikhism",
    "Hinduism",
    "Muslism",
    "Janoism",
  ];
  // isSelected ?
  // props.removeSelectedQuote(props.c.chapterNumber, props.c.lineNumber, LINE_TYPE_ENUM.WISDOM) :
  // props.addSelectedQuote(props.c.chapterNumber, props.c.lineNumber, LINE_TYPE_ENUM.WISDOM);

  let returnVal = (
    <React.Fragment>
      <IonModal isOpen={props.showQuotePopup} cssClass="">
        <IonItemDivider>
          <h2 className="ion-margin-start">Quote Selection</h2>
        </IonItemDivider>
          <IonLabel className="ion-margin-start">{props.item.text}</IonLabel>
\        <IonList>
          <IonRadioGroup
            value={selectedCategory}
            onIonChange={(e) => {
              if (e.detail.value === undefined) return;
              setSelectedCategory(e.detail.value);
            }}
          >
            {saintsPersonages.map((c) => {
              return (
                <IonItem>
                  <IonLabel className="ion-margin-start">{c}</IonLabel>
                  <IonRadio slot="start" value={c} />
                </IonItem>
              );
            })}
            {godhead.map((c) => {
              return (
                <IonItem>
                  <IonLabel className="ion-margin-start">{c}</IonLabel>
                  <IonRadio slot="start" value={c} />
                </IonItem>
              );
            })}
            {scriptures.map((c) => {
              return (
                <IonItem>
                  <IonLabel className="ion-margin-start">{c}</IonLabel>
                  <IonRadio slot="start" value={c} />
                </IonItem>
              );
            })}
            {religions.map((c) => {
              return (
                <IonItem>
                  <IonLabel className="ion-margin-start">{c}</IonLabel>
                  <IonRadio slot="start" value={c} />
                </IonItem>
              );
            })}
            </IonRadioGroup>
        </IonList>
        <IonButton
          onClick={() => {
            props.setShowQuotePopup(false);
          }}
        >
          Save Quote
        </IonButton>
      </IonModal>
    </React.Fragment>
  );
  return returnVal;
};

export default AyogiQuoteSelection;
