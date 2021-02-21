import React, { useEffect, useState } from "react";
import "./AyogiQuoteViewSort.css";import {
  IonItem,
  IonLabel,
  IonList,
  IonButton,
  IonRadio,
  IonRadioGroup,
  IonListHeader,
} from "@ionic/react";
import constants from "../../../store/constants";

const AyogiQuoteViewSort = (props) => {

  const quoteSortBy = 
  (<IonList>
    <IonRadioGroup value={props.quoteViewState && props.quoteViewState.sort} onIonChange={e => {
      props.setSort(e.detail.value);
    }}>
      <IonListHeader>
        <IonItem lines="full">
          <IonLabel><h2>Sort By</h2></IonLabel>
        </IonItem>
      </IonListHeader>

      <IonItem lines="none">
        <IonLabel>Chapter</IonLabel>
        <IonRadio slot="start" value="chapter" />
      </IonItem>
      <IonItem lines="none">
        <IonLabel>Tags</IonLabel>
        <IonRadio slot="start" value="tags" />
      </IonItem>
      </IonRadioGroup>
    </IonList>);
  return (
    <div className="AyogiQuoteViewSort" key="AyogiQuoteViewSort"> 
      {quoteSortBy}
    </div>
  );
};

export default AyogiQuoteViewSort;
