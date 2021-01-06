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
  IonContent,
  IonRadioGroup,
  IonCheckbox,
} from "@ionic/react";

const AyogiQuoteSelectText = (props) => {
  const [selectorShow, setSelectorShow] = useState(false);

  let returnVal = (
    <React.Fragment>
        <IonLabel className="ion-margin-start">{props.item.text}</IonLabel>
    </React.Fragment>
  );
  return returnVal;
};

export default AyogiQuoteSelectText;
