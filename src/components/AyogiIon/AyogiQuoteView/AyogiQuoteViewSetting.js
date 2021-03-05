import React, { useReducer, useEffect, useState } from "react";
import "./AyogiQuoteViewSetting.css";
import AyogiQuoteChips from "../AyogiQuote/AyogiQuoteChips";
import AyogiQuoteViewSort from "./AyogiQuoteViewSort";
import AyogiQuoteViewMetadata from "./AyogiQuoteViewMetadata";
import AyogiQuoteViewCategories from "./AyogiQuoteViewCategories";
import {buildQuoteViewSettings} from "../../../utility/quoteUtility";
import {
  IonItem,
  IonModal,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonText,
} from "@ionic/react";
import constants from "../../../store/constants";

const initialQuoteView = {
  isUpdated: false,
  sort: constants.QUOTE_SORT_VALUES.CHAPTER,
  categoriesSelected: {},
  selectedCategoryTags: {},
  tags: [],
};

const AyogiQuoteViewSetting = (props) => {
  const [quoteViewState, dispatch] = useReducer(
    quoteViewReducer,
    initialQuoteView
  );

  useEffect(() => {}, []);

  useEffect(() => {
    setQuoteViewState();
  }, [props.quoteViewSettings, props.categories]);

  const setQuoteViewState = () => {
//    debugger;
    const newViewSettings = buildQuoteViewSettings(props.quoteViewSettings, props.categories);
    console.log(newViewSettings);

    if(newViewSettings && newViewSettings.categoriesSelected &&
      Object.keys(newViewSettings.categoriesSelected).length > 0 ){
      let quoteView = { ...initialQuoteView, ...newViewSettings };
        console.log(quoteView);
        dispatch({ type: "UPDATE", quoteView });
    }
  };

  // this.setState({ dealersOverallTotal: total }, () => {
  //   console.log(this.state.dealersOverallTotal, 'dealersOverallTotal1');
  // });

  // useEffect(() => {
  //   if(props.showQuoteViewPopup){
  //     console.log('AyogiQuoteViewSetting[props.showQuoteViewPopup]', quoteViewState);
  //   }
  // }, [props.showQuoteViewPopup]);

  function quoteViewReducer(state, action) {
    let newTags;
    let newCategoryTags;
    switch (action.type) {
      case "UPDATE":
        let newQuote;
        newQuote = { ...action.quoteView };
        return { ...state, ...action.quoteView };
      case "SET_CATEGORIES_SELECTED":
        console.log("SET_CATEGORIES_SELECTED", action);
        return {
          ...state,
          isUpdated: true,
          categoriesSelected: action.categoriesSelected,
        };
      case "SET_SORT":
        console.log("SET_SORT", action);
        return { ...state, isUpdated: true, sort: action.sort };
      case "ADD_TAG":
        //            console.log('ADD_TAG',action);
        newTags = [...state.tags];
        if (!newTags.includes(action.tag.name)) {
          newTags.push(action.tag.name);
        }
        newCategoryTags = { ...state.selectedCategoryTags };
        //            console.log(newCategoryTags);
        newCategoryTags[action.tag.category] =
          newCategoryTags[action.tag.category] || [];
        if (!newCategoryTags[action.tag.category].includes(action.tag.name)) {
          newCategoryTags[action.tag.category].push(action.tag.name);
        }
        // console.log(newTags);
        // console.log(newCategoryTags);
        return {
          ...state,
          isUpdated: true,
          tags: newTags,
          selectedCategoryTags: newCategoryTags,
        };
      case "REMOVE_TAG":
        //            console.log('REMOVE_TAG',action);
        newTags = [...state.tags].filter((t) => t !== action.tag.name);
        newCategoryTags = { ...state.selectedCategoryTags };
        //        debugger;
        // console.log(newCategoryTags);
        if (newCategoryTags.hasOwnProperty(action.tag.category)) {
          newCategoryTags[action.tag.category] = newCategoryTags[
            action.tag.category
          ].filter((t) => t !== action.tag.name);
        }
        //        console.log(newCategoryTags);
        return {
          ...state,
          isUpdated: true,
          tags: newTags,
          selectedCategoryTags: newCategoryTags,
        };
      default:
        throw new Error();
    }
  }

  const addTag = (tag) => {
    dispatch({ type: "ADD_TAG", tag });
  };

  const removeTag = (tag) => {
    dispatch({ type: "REMOVE_TAG", tag });
  };

  const setSort = (sort) => {
    dispatch({ type: "SET_SORT", sort });
  };

  const setCategoriesSelected = (categoriesSelected) => {
    dispatch({ type: "SET_CATEGORIES_SELECTED", categoriesSelected });
  };

  const cardStyle = {
    maxHeight: "100%",
    display: "flex",
    flexDirection: "column",
  };
  const cardContentStyle = { overflow: "scroll" };

  return (
    <div className="AyogiQuoteViewSetting">
      <IonModal isOpen={props.showQuoteViewPopup} cssClass="">
        <IonCard style={cardStyle}>
          <IonCardHeader>
            <IonCardTitle>Sort and Filter Quotes</IonCardTitle>
          </IonCardHeader>
          <IonCardContent style={cardContentStyle}>
            <AyogiQuoteViewSort
              setSort={setSort}
              quoteViewState={quoteViewState}
            />
            {(props.currentQuoteSelectionType ===
              constants.MY_QUOTE_SELECTION_TYPE.TAGS ||
              props.currentQuoteSelectionType ===
                constants.MY_QUOTE_SELECTION_TYPE.METADATA) && (
              <AyogiQuoteViewCategories
                // categories={props.categories}
                // categoryTags={props.categoryTags}
                categoriesSelected={quoteViewState.categoriesSelected}
                setCategoriesSelected={setCategoriesSelected}
                {...props}
              />
              // <AyogiQuoteViewMetadata
              //   categories={props.categories}
              //   categoryTags={props.categoryTags}
              //   selectedCategoryTags={quoteViewState.selectedCategoryTags}
              //   addTag={addTag}
              //   removeTag={removeTag}
              //   {...props}
              // />
            )}
            {quoteViewState.isUpdated && (
              <React.Fragment>
                <IonItem lines="full">
                  <IonButton
                    slot="start"
                    onClick={() => {
                      console.log("add-quote", {
                        sort: quoteViewState.sort,
                        categoriesSelected: quoteViewState.categoriesSelected,
                        selectedCategoryTags:
                          quoteViewState.selectedCategoryTags,
                        tags: quoteViewState.tags,
                      });
                      props.setQuoteViewSettings({
                        sort: quoteViewState.sort,
                        categoriesSelected: quoteViewState.categoriesSelected,
                        selectedCategoryTags:
                          quoteViewState.selectedCategoryTags,
                        tags: quoteViewState.tags,
                      });
                      props.setShowQuoteViewPopup(false);
                    }}
                  >
                    Save Changes
                  </IonButton>
                  <IonButton
                    slot="end"
                    color="light"
                    onClick={() => {
                      props.setShowQuoteViewPopup(false);
                    }}
                  >
                    Cancel
                  </IonButton>
                </IonItem>
              </React.Fragment>
            )}
            {!quoteViewState.isUpdated && (
              <IonItem lines="full">
                <IonButton
                  slot="start"
                  color="light"
                  onClick={() => {
                    props.setShowQuoteViewPopup(false);
                  }}
                >
                  Close
                </IonButton>
              </IonItem>
            )}
          </IonCardContent>
        </IonCard>
      </IonModal>
    </div>
  );
};

export default AyogiQuoteViewSetting;
