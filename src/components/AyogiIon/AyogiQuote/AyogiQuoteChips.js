import React, { useState, useEffect } from "react";
//import React from 'react';
import "./AyogiQuoteChips.css";
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

const AyogiQuoteChips = (props) => {

  const [tagsChips, setTagsChips] = useState(null);

  useEffect(() => {
//    console.log("selectedCategoryTags", props.selectedCategoryTags);

    let chips = (
      <IonGrid>
        {props.categories.map((c) => {
          if (props.selectedCategoryTags && props.selectedCategoryTags.hasOwnProperty(c)) {
            return (<IonRow key={`chiprow-${c}`}>{
              props.selectedCategoryTags[c].map((t) => {
//              console.log(t);
              return (
                <IonChip
                  // outline={true}
                  key={`tagchip-${t}`}
                  className="ion-padding"
                  color={props.categoryChips[c]}
                >
                  {/* <IonIcon icon={categoryChips[c].icon}></IonIcon> */}
                  {t}
                </IonChip>
              );
              })}
              </IonRow>);
            };
        })}
      </IonGrid>
    );

    setTagsChips(chips);
  }, [props.selectedCategoryTags]);

  let returnVal = (
    <React.Fragment>
        {tagsChips}
    </React.Fragment>
  );
  return returnVal;
};

export default AyogiQuoteChips;
