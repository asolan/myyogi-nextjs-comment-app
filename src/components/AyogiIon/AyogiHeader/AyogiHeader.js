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
  console.log("AyogiHeader");
  console.log(props);

  let headerContent = null;
  switch (props.headerType) {
    case "settings":
      headerContent = (
        <IonRow className="yogananda-row">
          <IonCol className="otherheader">Settings</IonCol>
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
          <IonCol className="otherheader">Images</IonCol>
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
      headerContent = (
        <IonRow className="yogananda-row">
          <IonGrid>
            <IonRow>
              <IonCol className="chapterheader">
                Chapter: <span>{props.headerNumber}</span>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol className="chaptertitle">{props.headerTitle}</IonCol>
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
