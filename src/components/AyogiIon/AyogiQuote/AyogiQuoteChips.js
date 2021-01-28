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
//    console.log("categoryTags", props.categoryTags);

    let chips = (
      <IonGrid>
        {props.categories.map((c) => {
          if (props.categoryTags && props.categoryTags.hasOwnProperty(c)) {
            return (<IonRow key={`chiprow-${c}`}>{
              props.categoryTags[c].map((t) => {
//              console.log(t);
              return (
                <IonChip
                  // outline={true}
                  key={`tagchip-${t}`}
                  className="ion-padding"
                  color={categoryChips[c].color}
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
  }, [props.categoryTags]);

  const categoryChips = {
    mytags: {color: "primary", icon: "colorFilterOutline"},
    saintsPersonages: {color: "secondary", icon: "personOutline"},
    godheads: {color: "tertiary", icon: "infiniteOutline"},
    scriptures: {color: "success", icon: "bookOutline"},
    religions: {color: "medium", icon: "earthOutline"},
  };

  let returnVal = (
    <React.Fragment>
        {tagsChips}
    </React.Fragment>
  );
  return returnVal;
};

export default AyogiQuoteChips;
