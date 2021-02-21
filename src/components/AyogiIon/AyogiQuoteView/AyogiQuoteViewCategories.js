import React, { useState, useEffect } from "react";
import "./AyogiQuoteViewCategories.css";
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
  IonPopover,
} from "@ionic/react";
import constants from "../../../store/constants";
import { networkInterfaces } from "os";

const AyogiQuoteViewCategories = (props) => {

  const [categoriesMarkup, setCategoriesMarkup] = useState([]);

  useEffect(() => {
    //  console.log('AyogiQuoteViewCategories[]');
//    buildCategoriesValues();
  }, []);

  useEffect(() => {
    //    console.log('AyogiQuoteViewCategories[props.currentQuoteTags]');
    //  props.categoryTags.mytags = props.currentQuoteTags;
    console.log(props.categoriesSelected);
    if(props.categoriesSelected  &&
      Object.keys(props.categoriesSelected).length > 0){
      buildCategoriesValues();
    }
  }, [props.categoriesSelected]);

  // const isCategoriesSelected = (settingToSelect, value) => {
  //   let newCategoriesSelected = { ...categoriesSelected };
  //   newCategoriesSelected[settingToSelect] = value;
  //   setCategoriesSelected(newCategoriesSelected);
  // };

  const buildCategoriesValues = () => {
    console.log(props.categoriesSelected);

    // let newCategories = props.categoriesSelected.reduce(function(map, obj) {
    //   map[obj] = false;
    //   return map;
    // }, {});
    // console.log(newCategories);
    // setCategoriesSelected(newCategories);

  let newCategoriesMarkup = Object.keys(props.categoriesSelected).map((c, i) => {
      console.log(c);
      return(<IonItem key={`AyogiQuoteViewCategories${i}`}>
        <IonLabel>{c}</IonLabel>
        <IonCheckbox
          slot="end"
          value={c}
          checked={props.categoriesSelected[c]}
          onIonChange={(e) => {
            console.log(props.categoriesSelected);
            let newCategoriesSelected = {...props.categoriesSelected};
            newCategoriesSelected[c] = !newCategoriesSelected[c];
            props.setCategoriesSelected(newCategoriesSelected);
          }}
        />
      </IonItem>
      );
    });
    setCategoriesMarkup(newCategoriesMarkup);
  };

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

export default AyogiQuoteViewCategories;
