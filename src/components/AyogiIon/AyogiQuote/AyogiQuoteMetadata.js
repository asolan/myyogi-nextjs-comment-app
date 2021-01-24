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
  IonCheckbox,
  IonChip,
  IonGrid,
  IonRow,
  IonCol,
  IonPopover,
} from "@ionic/react";
import {
  personOutline,
  bookOutline,
  infiniteOutline,
  earthOutline,
  colorFilterOutline,
} from "ionicons/icons";

const AyogiQuoteMetadata = (props) => {
  const initialCategories = {
    mytags: false,
    saintsPersonages: false,
    godheads: false,
    scriptures: false,
    religions: false,
  };

  // const [isAdding, setIsAdding] = useState(false);
  const [tagSelectorShow, setTagSelectorShow] = useState(false);
  const [categoryShow, setCategoryShow] = useState({ ...initialCategories });
  const [categoryItemsValues, setCategoryItemsValues] = useState({});

  useEffect(() => {
//  console.log('AyogiQuoteMetadata[]');
    buildCategoriesValues();
  }, []);

  useEffect(() => {
//    console.log('AyogiQuoteMetadata[props.currentQuoteTags]');
//  categoryItems.mytags = props.currentQuoteTags;
  
    buildCategoriesValues();
  }, [props.currentQuoteTags]);

  useEffect(() => {
//    console.log("AyogiQuoteMetadata[categororyTags]");
  }, [props.categororyTags]);

  // useEffect(() => {
  //   console.log('AyogiQuoteMetadata[props.currentQuoteTags]');
  //   categoryItems.mytags = props.currentQuoteTags;
  // }, [props.currentQuoteTags]);

  const showSetting = (settingToShow, value) => {
    let newCategoryShow = { ...initialCategories };
    newCategoryShow[settingToShow] = value;
    setCategoryShow(newCategoryShow);
  };

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

  const setMyTags = (
    <IonItem>
      <IonLabel>Click here to set your tags</IonLabel>
    </IonItem>
  );

  const buildCategoriesValues = () => {
    let newCategoriesItemValues = {...categoryItems};
    props.categories.map((c, i) => {
      categoryItems[c].length > 0 &&
        categoryItems[c].map((val, i) => {
              const isChecked =
                props.categororyTags &&
                props.categororyTags.hasOwnProperty(c) &&
                props.categororyTags[c].includes(val);
                newCategoriesItemValues[c][val] = isChecked;
        });
    });
    console.log('setCategoryItemsValues', newCategoriesItemValues);
    setCategoryItemsValues(newCategoriesItemValues);
  };

//   props.categories.map((c, i) => {
//     let newIsChecked = {};
//     categoryItems[c].length > 0 &&
//       categoryItems[c].map((val, i) => {
//         newIsChecked[c] =
//           props.categororyTags &&
//           props.categororyTags.hasOwnProperty(c) &&
//           props.categororyTags[c].includes(val);
//         setIsChecked({...isChecked, isChecked[c]: isThisChecked})
// });
//console.log(categoryItemsValues);
  let categoriesMarkup =
    // isAdding &&
    Object.keys(categoryItemsValues).length >  0 && 
    props.categories.map((c, i) => {
      if (c === "mytags" && props.currentQuoteTags.length === 0) {
        return setMyTags;
      } else {
        return (
          <React.Fragment key={`metadata-${c}`}>
            <IonButton
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
              {categoryItems[c].length > 0 &&
                categoryItems[c].map((val, i) => {
                  return(<IonItem key={`MetadatacategoryItems${i}`}>
                  <IonLabel>{val}</IonLabel>
                  <IonCheckbox
                    slot="end"
                    value={val}
                    checked={categoryItemsValues && categoryItemsValues[c] && categoryItemsValues[c][val]}
                    onIonChange={(e) => {
//                      e.stopPropagation();
                      console.log("onIonChange", e.detail);
                      categoryItemsValues[c][val] = e.detail.checked;
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
      }
    });

  // let reviewTags = (
  //   <IonButton
  //     color="primary"
  //     onClick={() => {
  //       setIsAdding(false);
  //     }}
  //   >
  //     <h4>Review Tags</h4>
  //   </IonButton>
  // );
  // console.log(categoriesMarkup);
  // let returnVal = (

  console.log(categoriesMarkup);
  
  return (
    <React.Fragment>
      <IonList>
        {tagSelectorShow &&
          categoriesMarkup &&
          categoriesMarkup.map((c) => {
            //          console.log(c);
            return c;
          })}
      </IonList>
      <IonItem>
        <IonButton
          color="primary"
          fill={"solid"}
          onClick={() => {
            setTagSelectorShow(!tagSelectorShow);
          }}
        >
          {tagSelectorShow ? "Done" : "Select Tags"}
        </IonButton>
      </IonItem>
      {/* {isAdding ? reviewTags : addedTags} */}
    </React.Fragment>
  );
  //  return returnVal;
};

export default AyogiQuoteMetadata;
