import React, { useState, useEffect } from "react";
//import React from 'react';
import "./AyogiQuoteMetadata.css";
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
  IonRadioGroup,
  IonCheckbox,
} from "@ionic/react";
import { checkboxOutline, squareOutline } from "ionicons/icons";
import { is, setIn } from "immutable";
import { LINE_TYPE_ENUM } from "../../../utility/dataTypes";
import constants from "../../../store/constants";
import { isTemplateExpression } from "typescript";

const AyogiQuoteMetadata = (props) => {
  const [myTagsShow, setMyTagsShow] = useState(false);
  const [saintsPersonagesShow, setSaintsPersonagesShow] = useState(false);
  const [godheadsShow, setGodheadsShow] = useState(false);
  const [scripturesShow, setScripturesShow] = useState(false);
  const [religionsShow, setReligionsShow] = useState(false);

  const [quoteTagsList, setQuoteTagsList] = useState([]);
  const [saintsPersonagesList, setSaintsPersonagesList] = useState([]);
  const [godheadsList, setGodheadsList] = useState([]);
  const [scripturesList, setScripturesList] = useState([]);
  const [religionsList, setReligionsList] = useState([]);

  useEffect(() => {
    setSaintsPersonagesList([
      ...saintsPersonages.map((s) => {
        return { val: s, isChecked: false };
      }),
    ]);
    setGodheadsList([
      ...godheads.map((s) => {
        return { val: s, isChecked: false };
      }),
    ]);
    setScripturesList([
      ...scriptures.map((s) => {
        return { val: s, isChecked: false };
      }),
    ]);
    setReligionsList([
      ...religions.map((s) => {
        return { val: s, isChecked: false };
      }),
    ]);
  }, []);

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

  const getSelectedTags = () => {
    const selectedTags = [];
    if (quoteTagsList.length > 0)
      selectedTags.push(
        ...quoteTagsList.filter((t) => t.isChecked).map((t) => t.val)
      );
    if (saintsPersonagesList.length > 0)
      selectedTags.push(
        ...saintsPersonagesList.filter((t) => t.isChecked).map((t) => t.val)
      );
    if (godheadsList.length > 0)
      selectedTags.push(
        ...godheadsList.filter((t) => t.isChecked).map((t) => t.val)
      );
    if (scripturesList.length > 0)
      selectedTags.push(
        ...scripturesList.filter((t) => t.isChecked).map((t) => t.val)
      );
    if (religionsList.length > 0)
      selectedTags.push(
        ...religionsList.filter((t) => t.isChecked).map((t) => t.val)
      );
    console.log(selectedTags);
    return selectedTags;
  };

  const showSetting = (settingToShow) => {
    setMyTagsShow(false);
    setSaintsPersonagesShow(false);
    setGodheadsShow(false);
    setScripturesShow(false);
    setReligionsShow(false);

    switch (settingToShow) {
      case QUOTE_CATEGORY.MY_TAGS:
        setMyTagsShow(true);
        break;
      case QUOTE_CATEGORY.SAINTS_PERSONAGES:
        setSaintsPersonagesShow(true);
        break;
      case QUOTE_CATEGORY.GODHEADS:
        setGodheadsShow(true);
        break;
      case QUOTE_CATEGORY.SCRIPTURES:
        setScripturesShow(true);
        break;
      case QUOTE_CATEGORY.RELIGIONS:
        setReligionsShow(true);
        break;
    }
  };

  // const updateCategory = (category, i, newValue) => {
  //   switch (category) {
  //     case QUOTE_CATEGORY.MY_TAGS:
  //       setQuoteTagsList([...quoteTagsList.slice(0, i),{...quoteTagsList[i], checked: newValue},...quoteTagsList.slice(i + 1)]);
  //       break;
  //     case QUOTE_CATEGORY.SAINTS_PERSONAGES:
  //       setSaintsPersonagesList([...saintsPersonagesList.slice(0, i),{...saintsPersonagesList[i], checked: newValue},...saintsPersonagesList.slice(i + 1)]);
  //       break;
  //     case QUOTE_CATEGORY.GODHEADS:
  //       setGodheadsList([...godheadsList.slice(0, i),{...godheadsList[i], checked: newValue},...godheadsList.slice(i + 1)]);
  //       break;
  //     case QUOTE_CATEGORY.SCRIPTURES:
  //       setScripturesList([...scripturesList.slice(0, i),{...scripturesList[i], checked: newValue},...scripturesList.slice(i + 1)]);
  //       break;
  //     case QUOTE_CATEGORY.RELIGIONS:
  //       setReligionsList([...religionsList.slice(0, i),{...religionsList[i], checked: newValue},...religionsList.slice(i + 1)]);
  //       break;
  //   }
  // };

  const saintsPersonages = [
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
  ];
  let godheads = [
    "Brahma",
    "Vishnu",
    "Shiva",
    "Durga",
    "Kali",
    "Yoga Sutras",
    "Babaji",
    "Ram",
    "Sita",
  ];
  let scriptures = [
    "Bible",
    "Bhagavad Git",
    "Mahabharata",
    "Yoga Sutras",
    "Koran",
  ];
  let religions = [
    "Christianity",
    "Buddhism",
    "Sikhism",
    "Hinduism",
    "Muslism",
    "Janoism",
  ];

  // isSelected ?
  // props.removeSelectedQuote(props.c.chapterNumber, props.c.lineNumber, LINE_TYPE_ENUM.WISDOM) :
  // props.addSelectedQuote(props.c.chapterNumber, props.c.lineNumber, LINE_TYPE_ENUM.WISDOM);
  const listMyTags =
    quoteTagsList.length > 0 ? (
      quoteTagsList.map(({ val, isChecked }, i) => (
        <IonItem key={i}>
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
      <IonModal isOpen={props.showQuotePopup} cssClass="">
        <IonItem>
          <h2 className="ion-margin-start">Quote Selection</h2>
        </IonItem>
        <IonLabel className="ion-margin-start">{props.item.text}</IonLabel>
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
                fill={myTagsShow ? "solid" :"outline"}
                onClick={() => {
                  showSetting(
                    myTagsShow ? QUOTE_CATEGORY.NONE : QUOTE_CATEGORY.MY_TAGS
                  );
                }}
              >
                <h4>My Tags</h4>
              </IonButton>
            {myTagsShow && listMyTags}
              <IonButton
                //style={{ width: "100%" }}
                expand="block"
                //size="large"
                color="dark"
                fill={saintsPersonagesShow ? "solid" :"outline"}
                onClick={() => {
                  showSetting(
                    saintsPersonagesShow
                      ? QUOTE_CATEGORY.NONE
                      : QUOTE_CATEGORY.SAINTS_PERSONAGES
                  );
                }}
              >
                <h4>Personages</h4>
              </IonButton>
            {saintsPersonagesShow &&
              saintsPersonagesList.map(({ val, isChecked }, i) => (
                <IonItem key={i}>
                  <IonLabel>{val}</IonLabel>
                  <IonCheckbox
                    slot="end"
                    value={val}
                    checked={isChecked}
                    onIonChange={(e) => {
                      console.log(e);
                      setSaintsPersonagesList([
                        ...saintsPersonagesList.slice(0, i),
                        {
                          ...saintsPersonagesList[i],
                          isChecked: e.detail.checked,
                        },
                        ...saintsPersonagesList.slice(i + 1),
                      ]);
                    }}
                  />
                </IonItem>
              ))}
              <IonButton
                //style={{ width: "100%" }}
                expand="block"
                //size="large"
                color="dark"
                fill={godheadsShow ? "solid" :"outline"}
                onClick={() => {
                  showSetting(
                    godheadsShow ? QUOTE_CATEGORY.NONE : QUOTE_CATEGORY.GODHEADS
                  );
                }}
              >
                <h4>Godheads</h4>
              </IonButton>
            {godheadsShow &&
              godheadsList.map(({ val, isChecked }, i) => (
                <IonItem key={i}>
                  <IonLabel>{val}</IonLabel>
                  <IonCheckbox
                    slot="end"
                    value={val}
                    checked={isChecked}
                    onIonChange={(e) =>
                      setGodheadsList([
                        ...godheadsList.slice(0, i),
                        { ...godheadsList[i], isChecked: e.detail.checked },
                        ...godheadsList.slice(i + 1),
                      ])
                    }
                  />
                </IonItem>
              ))}
              <IonButton
                //style={{ width: "100%" }}
                expand="block"
                //size="large"
                color="dark"
                fill={scripturesShow ? "solid" :"outline"}
                onClick={() => {
                  showSetting(
                    scripturesShow
                      ? QUOTE_CATEGORY.NONE
                      : QUOTE_CATEGORY.SCRIPTURES
                  );
                }}
              >
                <h4>Scriptures</h4>
              </IonButton>
            {scripturesShow &&
              scripturesList.map(({ val, isChecked }, i) => (
                <IonItem key={i}>
                  <IonLabel>{val}</IonLabel>
                  <IonCheckbox
                    slot="end"
                    value={val}
                    checked={isChecked}
                    onIonChange={(e) =>
                      setScripturesList([
                        ...scripturesList.slice(0, i),
                        { ...scripturesList[i], isChecked: e.detail.checked },
                        ...scripturesList.slice(i + 1),
                      ])
                    }
                  />
                </IonItem>
              ))}
              <IonButton
                //style={{ width: "100%" }}
                expand="block"
                //size="large"
                color="dark"
                fill={religionsShow ? "solid" :"outline"}
                onClick={() => {
                  showSetting(
                    religionsShow
                      ? QUOTE_CATEGORY.NONE
                      : QUOTE_CATEGORY.RELIGIONS
                  );
                }}
              >
                <h4>Religions</h4>
              </IonButton>
            {religionsShow &&
              religionsList.map(({ val, isChecked }, i) => (
                <IonItem key={i}>
                  <IonLabel>{val}</IonLabel>
                  <IonCheckbox
                    slot="end"
                    value={val}
                    checked={isChecked}
                    onIonChange={(e) =>
                      setReligionsList([
                        ...religionsList.slice(0, i),
                        { ...religionsList[i], isChecked: e.detail.checked },
                        ...religionsList.slice(i + 1),
                      ])
                    }
                  />
                </IonItem>
              ))}
          </IonList>
        </IonContent>
        <IonButton
          onClick={() => {
            const selTags = getSelectedTags();
            props.addSelectedQuote(
              props.item.chapterNumber,
              props.item.lineNumber,
              1,
              props.item.lineNumber, 
              props.item.text.length, 
              selTags);
            props.setIsSelected(true);
            props.setShowQuotePopup(false);
          }}
        >
          Save Quote
        </IonButton>
        <IonButton
          color="light"
          onClick={() => {
            props.removeSelectedQuote(
              props.item.chapterNumber, 
              props.item.lineNumber, 
              1);
            props.setIsSelected(false);
            props.setShowQuotePopup(false);
          }}
        >
          Remove Quote
        </IonButton>
      </IonModal>
    </React.Fragment>
  );
  return returnVal;
};

export default AyogiQuoteMetadata;
