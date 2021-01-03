import React, { useState, useEffect, useRef } from "react";
import {
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonItemDivider,
  IonRadio,
  IonRadioGroup,
} from "@ionic/react";
import "./AyogiSettingQuoteSelection.css";
import constants from "../../../store/constants";

const AyogiSettingQuoteSelection = (props) => {
  return (
    <IonList>
      {/* <IonItemDivider>
        <h2 className="ion-margin-start">Quote Selection</h2>
      </IonItemDivider> */}
      <IonItem>
        <IonList>
          <IonRadioGroup
            value={props.currentQuoteSelectionType}
            onIonChange={(e) => {
              if (e.detail.value === undefined) return;
              console.log(e.detail.value);
              props.onChangeMyQuoteSelectionType(e.detail.value);
            }}
          >
            <IonItem>
              <IonLabel className="ion-margin-start">
                No Quote Selection
              </IonLabel>
              <IonRadio
                slot="start"
                value={constants.MY_QUOTE_SELECTION.NONE}
              />
            </IonItem>
            <IonItem>
              <IonLabel className="ion-margin-start">Basic Selection</IonLabel>
              <IonRadio
                slot="start"
                value={constants.MY_QUOTE_SELECTION.BASIC}
              />
            </IonItem>
            <IonItem>
              <IonLabel className="ion-margin-start">
                Tag Quotes Selection
              </IonLabel>
              <IonRadio
                slot="start"
                value={constants.MY_QUOTE_SELECTION.TAGS}
              />
            </IonItem>
            <IonItem>
              <IonLabel className="ion-margin-start">
                Metadata and Tag Quotes Selection
              </IonLabel>
              <IonRadio
                slot="start"
                value={constants.MY_QUOTE_SELECTION.METADATA}
              />
            </IonItem>
          </IonRadioGroup>
        </IonList>
      </IonItem>
    </IonList>
  );
};

export default AyogiSettingQuoteSelection;
