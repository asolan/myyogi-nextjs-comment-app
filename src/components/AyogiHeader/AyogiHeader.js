import React from "react";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonAvatar,
  IonHeader,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import "./AyogiHeader.css";

const AyogiHeader = (props) => {
  // console.log("AyogiHeader");
  // console.log(props);

  let headerContent = null;
  switch (props.headerType) {
    case "search":
      headerContent = (
        <IonRow className="yogananda-row">
          <IonCol className="otherheader">Search</IonCol>
        </IonRow>
      );
      break;
    case "quotes":
      headerContent = (
        <IonRow className="yogananda-row">
          <IonCol className="otherheader">My Quotes</IonCol>
        </IonRow>
      );
      break;
    case "settings":
      headerContent = (
        <IonRow className="yogananda-row">
          <IonCol className="otherheader">Font Size</IonCol>
        </IonRow>
      );
      break;
    case "chapterlist":
      headerContent = (
        <IonRow className="yogananda-row">
          <IonCol className="otherheader">Chapter List</IonCol>
        </IonRow>
      );
      break;
    case "image":
      headerContent = (
        <IonRow className="yogananda-row">
          <IonCol className="otherheader">Illustrations</IonCol>
        </IonRow>
      );
      break;
    case "poem":
      headerContent = (
        <IonRow className="yogananda-row">
          <IonCol className="otherheader">Poems</IonCol>
        </IonRow>
      );
      break;
    case "chapter":
    default:
      const headerHeader = props.headerNumber > 0 ? (<span>Chapter: <span>{props.headerNumber}</span></span>): null;
      headerContent = (
        <IonRow className="yogananda-row">
          <IonGrid>
            <IonRow>
              <IonCol className="chapterheader">
                {headerHeader}
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol className="chaptertitle">{props.headerTitle ? props.headerTitle : ''}</IonCol>
            </IonRow>
          </IonGrid>
        </IonRow>
      );
      break;
  }

  return (
    <IonHeader no-border className="AyogiHeader">
      <IonToolbar>
        <IonTitle size="small">
          <IonGrid>{headerContent}</IonGrid>
        </IonTitle>
        {/* <img src="/images/py.png" /> */}
        {/* <IonButtons slot="secondary">
                    <IonButton fill="clear">
                        <IonIcon slot="icon-only" name="listBox" />
                    </IonButton>
                    <IonButton fill="clear">
                        <IonIcon slot="icon-only" name="planet" />
                    </IonButton>
                </IonButtons>
                <IonButtons slot="primary">
                    <IonButton fill="clear">
                        <IonIcon slot="icon-only" name="more" />
                    </IonButton>
                </IonButtons> */}
      </IonToolbar>
    </IonHeader>
  );
};

export default AyogiHeader;
