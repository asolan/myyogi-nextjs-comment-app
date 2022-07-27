import React, { useState, useEffect, useRef } from "react";
import {
  IonContent,
  IonList,
  IonItem,
  IonRange,
  IonIcon,
  IonLabel,
  IonCheckbox
} from "@ionic/react";
import { textOutline, sunny } from "ionicons/icons";

import AyogiWisdom from "../AyogiWisdom/AyogiWisdom";
//import AyogiContext from '../context/AyogiContext';
import "./AyogiSettingPopup.css";
import constants from "../../store/constants";

const AyogiSettingPopup = (props) => {
  // const [footnotePopup, setFootnotePopup] = useState(true);
  // const [definitionPopup, setDefinitionPopup] = useState(true);

  // // Page load
  // useEffect(() => {
  //   setFootnotePopup(props.currentFootnotePopup);
  //   setDefinitionPopup(props.currentDefinitionPopup);
  //   // TODO: Load local state from props
  // }, []);

  // const doSetFootnotePopup = (value) => {
  //   setFootnotePopup(value);
  //   props.onChangeFootnotePopup(value);
  // };

  // const doSetDefinitionPopup = (value) => {
  //   setDefinitionPopup(value);
  //   props.onChangeDefinitionPopup(value);
  // };

  return (
    <React.Fragment>
      <IonList>
        {/* <IonItemDivider>
          <h2 className="ion-margin-start">Font Size</h2>
        </IonItemDivider> */}
        <IonItem>
            <IonLabel>Show Footnote Popup Button</IonLabel>
            <IonCheckbox checked={props.currentFootnotePopup} onIonChange={e => props.onChangeFootnotePopup(e.detail.checked)} />
        </IonItem>
        {/* <IonItem>
            <IonLabel>Show Definition Popup Button</IonLabel>
            <IonCheckbox checked={props.currentDefinitionPopup} onIonChange={e => props.onChangeDefinitionPopup(e.detail.checked)} />
        </IonItem> */}
      </IonList>
    </React.Fragment>
  );
};

export default AyogiSettingPopup;
