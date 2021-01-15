import React, { useState, useEffect } from "react";
import "./AyogiQuoteTags.css";
import {
  IonItem,
  IonModal,
  IonIcon,
  IonList,
  IonLabel,
  IonButton,
  IonContent,
  IonCheckbox,
} from "@ionic/react";

const [quoteTagsList, setQuoteTagsList] = useState([]);

const AyogiQuoteTags = (props) => {

  useEffect(() => {
    setQuoteTagsList(
      (props.currentQuoteTags &&
        props.currentQuoteTags.map((s) => {
          const wasChecked =
            props.itemTags &&
            props.itemTags.length > 0 &&
            props.itemTags.indexOf(s) > -1;
          return { val: s, isChecked: wasChecked };
        })) ||
        []
    );
  }, [props.currentQuoteTags]);

  const QUOTE_CATEGORY = {
    NONE: "NONE",
    MY_TAGS: "MY_TAGS",
    SAINTS_PERSONAGES: "SAINTS_PERSONAGES",
    GODHEADS: "GODHEADS",
    SCRIPTURES: "SCRIPTURES",
    RELIGIONS: "RELIGIONS",
  };

  const listMyTags =
    quoteTagsList.length > 0 ? (
      quoteTagsList.map(({ val, isChecked }, i) => (
        <IonItem key={`mytags-${i}`}>
          <IonLabel>{val}</IonLabel>
          <IonCheckbox
            slot="end"
            value={val}
            checked={isChecked}
            onIonChange={(e) =>
              setQuoteTagsList([
                ...quoteTagsList.slice(0, i),
                { ...quoteTagsList[i], isChecked: e.detail.checked },
                ...quoteTagsList.slice(i + 1),
              ])
            }
          />
        </IonItem>
      ))
    ) : (
      <IonItem>
        <IonLabel>Click here to set your tags</IonLabel>
      </IonItem>
    );

  let returnVal = (
    <React.Fragment>
      {listMyTags}
    </React.Fragment>
  );
  return returnVal;
};

export default AyogiQuoteTags;
