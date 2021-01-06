import React, { useState, useEffect } from "react";
//import React from 'react';
import "./AyogiQuoteMetadata.css";
//import AyogiQuoteTags from './AyogiQuoteTags';
import AyogiMetaItem from "../AyogiMeta/AyogiMetaItem/AyogiMetaItem";
import { parseParagraphData } from "../../../utility/parseUtility";
//import { LINE_TYPE_ENUM } from '../../../utility/dataTypes';
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

const AyogiQuoteMetadata = (props) => {
  const initialCategories = {
    mytags: false,
    saintsPersonages: false,
    godheads: false,
    scriptures: false,
    religions: false,
  };

  const [categoryShow, setCategoryShow] = useState({ ...initialCategories });
  const [quoteTagsList, setQuoteTagsList] = useState([]);

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

  const showSetting = (settingToShow, value) => {
    let newCategoryShow = { ...initialCategories };
    newCategoryShow[settingToShow] = value;
    setCategoryShow(newCategoryShow);
  };

  // const categories = ["mytags","saintsPersonages", "godheads","scriptures","religions"];
  const categories = [
    "saintsPersonages",
    "godheads",
    "scriptures",
    "religions",
  ];
  const categoryItems = {
    saintsPersonages: [
      "Yogananda",
      "Jesus Christ",
      "Lahiri Mahasaya",
      "Sri Yukteswar",
      "Babaji",
      "Krishna",
      "Buddha",
      "Ananamoya Ma",
      "Swami Pranabananda",
      "Ram Gopal Muzumdar",
      "Gandhi",
      "Bhagabati",
      "Therese Neumann",
      "Giri Bala",
    ],
    godheads: [
      "Brahma",
      "Vishnu",
      "Shiva",
      "Durga",
      "Kali",
      "Yoga Sutras",
      "Babaji",
      "Ram",
      "Sita",
    ],
    scriptures: [
      "Bible",
      "Bhagavad Gita",
      "Mahabharata",
      "Yoga Sutras",
      "Koran",
    ],
    religions: [
      "Christianity",
      "Buddhism",
      "Sikhism",
      "Hinduism",
      "Muslism",
      "Janoism",
    ],
  };

  console.log("categororyTags", props.categororyTags);

  const listMyTags =
    quoteTagsList.length > 0 ? (
      quoteTagsList.map(({ val, isChecked }, i) => (
        <IonItem key={i}>
          <IonLabel>{val}</IonLabel>
          <IonCheckbox
            slot="end"
            value={val}
            checked={isChecked}
            onIonChange={(e) => {
              if (e.detail.checked) {
                props.addTag({ name: e.detail.value, category: "mytags" });
              } else {
                props.removeTag({ name: e.detail.value, category: "mytags" });
              }
              setQuoteTagsList([
                ...quoteTagsList.slice(0, i),
                { ...quoteTagsList[i], isChecked: e.detail.checked },
                ...quoteTagsList.slice(i + 1),
              ]);
            }}
          />
        </IonItem>
      ))
    ) : (
      <IonItem>
        <IonLabel>Click here to set your tags</IonLabel>
      </IonItem>
    );

  let categoriesMarkup = categories.map((c) => {
    console.log(c);
    return (
      <React.Fragment>
        <IonButton
          expand="block"
          color="dark"
          fill={categoryShow[c] ? "solid" : "outline"}
          onClick={() => {
            showSetting(c, !categoryShow[c]);
          }}
        >
          <h4>{c}</h4>
        </IonButton>
        {categoryShow[c] &&
          categoryItems[c].map((val, i) => {
            const isChecked =
              props.categororyTags.hasOwnProperty(c) &&
              props.categororyTags[c].includes(val);
            return (
              <IonItem key={i}>
                <IonLabel>{val}</IonLabel>
                <IonCheckbox
                  slot="end"
                  value={val}
                  checked={isChecked}
                  onIonChange={(e) => {
                    console.log("onIonChange", e.detail);
                    if (e.detail.checked) {
                      props.addTag({ name: e.detail.value, category: c });
                    } else {
                      props.removeTag({ name: e.detail.value, category: c });
                    }
                  }}
                />
              </IonItem>
            );
          })}
      </React.Fragment>
    );
  });

  let returnVal = (
    <React.Fragment>
      {/* <IonModal isOpen={props.showQuotePopup} cssClass="">
        <IonItem>
          <h2 className="ion-margin-start">Quote Selection</h2>
        </IonItem>
        <IonLabel className="ion-margin-start">{props.item.text}</IonLabel> */}
      <IonContent>
        {/* <IonButton color="dark">Primary</IonButton>
        <IonButton color="secondary">Secondary</IonButton>
        <IonButton color="tertiary">Tertiary</IonButton>
        <IonButton color="success">Success</IonButton>
        <IonButton color="warning">Warning</IonButton>
        <IonButton color="danger">Danger</IonButton>
        <IonButton color="light">Light</IonButton>
        <IonButton color="medium">Medium</IonButton>
        <IonButton color="dark">Dark</IonButton>
        <IonButton fill="outline" color="dark">Primary</IonButton>
        <IonButton fill="outline" color="secondary">Secondary</IonButton>
        <IonButton fill="outline" color="tertiary">Tertiary</IonButton>
        <IonButton fill="outline" color="success">Success</IonButton>
        <IonButton fill="outline" color="warning">Warning</IonButton>
        <IonButton fill="outline" color="danger">Danger</IonButton>
        <IonButton fill="outline" color="light">Light</IonButton>
        <IonButton fill="outline" color="medium">Medium</IonButton>
        <IonButton fill="outline" color="dark">Dark</IonButton> */}
        <IonList>
          <IonButton
            //style={{ width: "100%" }}
            expand="block"
            //size="large"
            color="dark"
            fill={categoryShow["mytags"] ? "solid" : "outline"}
            onClick={() => {
              showSetting("mytags", !categoryShow("mytags"));
            }}
          >
            <h4>My Tags</h4>
          </IonButton>
          {categoryShow["mytags"] && listMyTags}
          {categoriesMarkup}
        </IonList>
      </IonContent>
    </React.Fragment>
  );
  return returnVal;
};

export default AyogiQuoteMetadata;
