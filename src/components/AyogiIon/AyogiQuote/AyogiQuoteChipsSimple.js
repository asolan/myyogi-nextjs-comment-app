import React, { useState, useEffect } from "react";
//import React from 'react';
import "./AyogiQuoteChipsSimple.css";
import {
  IonItem,
  IonModal,
  IonIcon,
  IonList,
  IonLabel,
  IonButton,
  IonContent,
  IonCheckbox,
  IonChip,
  IonGrid,
  IonRow,
  IonCol,
  IonPopover
} from "@ionic/react";
//import { personOutline, bookOutline, infiniteOutline, earthOutline, colorFilterOutline } from "ionicons/icons";

const AyogiQuoteChipsSimple = (props) => {

  const [tagsChips, setTagsChips] = useState(null);

  useEffect(() => {
//  console.log("itemTags", props.itemTags);

  let chipStyle = { color: "black", height: "24px" };
  let chips = null;

  if(props.itemTags && props.itemTags.length > 0){
    chips = (
      <IonGrid>
        <IonRow>
        {props.itemTags.map((t) => {
              return (
                <IonCol key={`AyogiQuoteChipsSimple${t}`}>
                  <IonChip
                    style={chipStyle}
                    // outline={true}
                    key={`tagchip-${t}`}
                    className="ion-padding-start ion-padding-end"
                    color="medium"
                  >
                    {t}
                  </IonChip>
               </IonCol> 
              )
              })}
        </IonRow>
      </IonGrid>
      );
    }

    setTagsChips(chips);
  }, [props.itemTags]);

  let returnVal = (
    <React.Fragment>
        {tagsChips}
    </React.Fragment>
  );
  return returnVal;
};

export default AyogiQuoteChipsSimple;
