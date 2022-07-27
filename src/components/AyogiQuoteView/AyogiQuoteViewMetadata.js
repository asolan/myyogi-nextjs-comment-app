import React, { useState, useEffect } from "react";
import "./AyogiQuoteViewMetadata.css";
import AyogiMetaItem from "../AyogiMeta/AyogiMetaItem/AyogiMetaItem";
import { parseParagraphData } from "../../utility/parseUtility";
//import { LINE_TYPE_ENUM } from '../../utility/dataTypes';
import {
  IonItem,
  IonModal,
  IonIcon,
  IonList,
  IonLabel,
  IonButton,
  IonContent,
  IonCheckbox,
  IonPopover,
} from "@ionic/react";
import constants from "../../store/constants";

const AyogiQuoteViewMetadata = (props) => {
  // const [isAdding, setIsAdding] = useState(false);
  const [categoryShow, setCategoryShow] = useState({});
  const [categoryTagsValues, setCategoryTagsValues] = useState({});

  useEffect(() => {
    //  console.log('AyogiQuoteViewMetadata[]');
    buildCategoriesValues();
  }, []);

  useEffect(() => {
    //    console.log('AyogiQuoteViewMetadata[props.currentQuoteTags]');
    //  props.categoryTags.mytags = props.currentQuoteTags;

    buildCategoriesValues();
  }, [props.currentQuoteTags, props.categories]);

  useEffect(() => {
    //    console.log("AyogiQuoteViewMetadata[categoryTags]");
  }, [props.categoryTags]);

  //   useEffect(() => {
  //     console.log('AyogiQuoteViewMetadata[props.selectedCategoryTags]',
  //       props.selectedCategoryTags);
  // //    props.categoryTags.mytags = props.currentQuoteTags;
  //   }, [props.selectedCategoryTags]);

  const showSetting = (settingToShow, value) => {
    let newCategoryShow = { ...props.categories };
    newCategoryShow[settingToShow] = value;
    setCategoryShow(newCategoryShow);
  };

  const buildCategoriesValues = () => {
    console.log(props.categories);
    console.log(props.currentQuoteTags);

    let newCategories = props.categories.reduce(function (map, obj) {
      map[obj] = false;
      return map;
    }, {});
    //    console.log(newCategories);
    setCategoryShow(newCategories);

    let newCategoriesTagValues = { ...props.categoryTags };
    // console.log(props.categories);
    // console.log(props.categoryTags);
    // console.log(props.selectedCategoryTags);
    props.categories.map((c, i) => {
      props.categoryTags[c].length > 0 &&
        props.categoryTags[c].map((val, i) => {
          const isChecked =
            props.selectedCategoryTags &&
            props.selectedCategoryTags.hasOwnProperty(c) &&
            props.selectedCategoryTags[c].includes(val);
          newCategoriesTagValues[c][val] = isChecked;
        });
    });
    //AMSTODOBUG: object or array? not both
    //     My Inspiration: Array(4)
    // 0: "Healing"
    // 1: "Divine Feminine"
    // 2: "Health"
    // 3: "True Teaching"
    // Divine Feminine: false
    // Healing: false
    // Health: false
    // True Teaching: false
    console.log("setCategoryTagsValues", newCategoriesTagValues);
    setCategoryTagsValues(newCategoriesTagValues);
  };

  let categoriesMarkup =
    // isAdding &&
    Object.keys(categoryTagsValues).length > 0 &&
    props.categories.map((c, i) => {
      return (
        <React.Fragment key={`metadata-${c}`}>
          <IonButton
            className="ion-margin-end ion-margin-bottom"
            // expand="block"
            color="dark"
            fill={categoryShow[c] ? "solid" : "outline"}
            onClick={() => {
              console.log(categoryShow[c]);
              showSetting(c, !categoryShow[c]);
            }}
          >
            <h4>{c}</h4>
          </IonButton>
          <IonPopover
            cssClass="metadatapop"
            event={null}
            isOpen={categoryShow[c]}
            onDidDismiss={() => showSetting(c, false)}
          >
            {props.categoryTags[c].length > 0 &&
              props.categoryTags[c].map((val, i) => {
                return (
                  <IonItem key={`MetadatacategoryTags${i}`}>
                    <IonLabel>{val}</IonLabel>
                    <IonCheckbox
                      slot="end"
                      value={val}
                      checked={
                        categoryTagsValues &&
                        categoryTagsValues[c] &&
                        categoryTagsValues[c][val]
                      }
                      onIonChange={(e) => {
                        //                      e.stopPropagation();
                        console.log("onIonChange", e.detail);
                        categoryTagsValues[c][val] = e.detail.checked;
                        if (e.detail.checked) {
                          props.addTag({
                            name: e.detail.value,
                            category: c,
                          });
                        } else {
                          props.removeTag({
                            name: e.detail.value,
                            category: c,
                          });
                        }
                      }}
                    />
                  </IonItem>
                );
              })}
            <IonItem>
              <IonButton
                // expand="block"
                color="primary"
                onClick={() => {
                  showSetting(c, false);
                }}
              >
                <h4>Close</h4>
              </IonButton>
            </IonItem>{" "}
          </IonPopover>
        </React.Fragment>
      );
    });

  return (
    <React.Fragment>
      <IonList>
        <IonItem lines="full"><h2>Filter</h2></IonItem>
        {categoriesMarkup &&
          categoriesMarkup.map((c) => {
            //          console.log(c);
            return c;
          })}
      </IonList>
    </React.Fragment>
  );
};

export default AyogiQuoteViewMetadata;
