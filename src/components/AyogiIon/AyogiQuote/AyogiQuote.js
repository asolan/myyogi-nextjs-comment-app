import React, { useReducer, useEffect } from "react";
import "./AyogiQuote.css";
import AyogiQuoteSelectText from "./AyogiQuoteSelectText";
//import AyogiQuoteTags from "./AyogiQuoteTags";
import AyogiQuoteChips from "./AyogiQuoteChips";
import AyogiQuoteMetadata from "./AyogiQuoteMetadata";
import {
  IonItem,
  IonModal,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
} from "@ionic/react";
import constants from "../../../store/constants";

const initialQuote = {
  chapter: 0,
  startline: 0,
  startchar: 0,
  endline: 0,
  endchar: 0,
  categororyTags: {},
  tags: [],
};

const AyogiQuote = (props) => {
  const [quoteState, dispatch] = useReducer(quoteReducer, initialQuote);
  //    const categories = ["mytags","saintsPersonages", "godheads","scriptures","religions"];
  const categories = [
//    "mytags",
    "saintsPersonages",
    "godheads",
    "scriptures",
    "religions",
  ];

  useEffect(() => {
    console.log(props.selectedQuotes);
    // if(props.selectedQuotes){
    //   dispatch({ type: 'UPDATE', payload: quotes })
    // }
  }, [props.selectedQuotes]);

  function quoteReducer(state, action) {
    let newTags;
    let newCategoryTags;
    switch (action.type) {
//      case "UPDATE":
      case "SET_POS":
        console.log("SET_POS", action);
        return {...state, 
          chapter: action.pos.chapter,
          startline: action.pos.startline,
          startchar: action.pos.startchar,
          endline: action.pos.endline,
          endchar: action.pos.endchar,
        };
      case "ADD_TAG":
        //            console.log('ADD_TAG',action);
        newTags = [...state.tags];
        if (!newTags.includes) {
          newTags.push(action.tag.name);
        }
        newCategoryTags = { ...state.categororyTags };
        //            console.log(newCategoryTags);
        newCategoryTags[action.tag.category] =
          newCategoryTags[action.tag.category] || [];
        if (!newCategoryTags[action.tag.category].includes(action.tag.name)) {
          newCategoryTags[action.tag.category].push(action.tag.name);
        }
        // console.log(newTags);
        // console.log(newCategoryTags);
        return { ...state, tags: newTags, categororyTags: newCategoryTags };
      case "REMOVE_TAG":
        //            console.log('REMOVE_TAG',action);
        newTags = [...state.tags].filter((t) => t !== action.tag.name);
        newCategoryTags = { ...state.categororyTags };
        // console.log(newCategoryTags);
        if (newCategoryTags.hasOwnProperty(action.tag.category)) {
          newCategoryTags[action.tag.category].filter(
            (t) => t !== action.tag.name
          );
        }
        //            console.log(newCategoryTags);
        return { ...state, tags: newTags, categororyTags: newCategoryTags };
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

  const setPos = (pos) => {
    dispatch({ type: "SET_POS", pos });
  };

  return (
    <div className="AyogiQuote">
      <IonModal isOpen={props.showQuotePopup} cssClass="">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Quote Selection</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <AyogiQuoteSelectText
              setPos={setPos} 
              item={props.item} />
            {/* <AyogiQuoteTags
          showQuotePopup={props.showQuotePopup}
          setShowQuotePopup={props.setShowQuotePopup}
          setIsSelected={props.setIsSelected}
          item={props.c}
          {...props}
        /> */}
            <AyogiQuoteChips
              categories={categories}
              categororyTags={quoteState.categororyTags}
            />
            {(props.currentQuoteSelectionType ===
              constants.MY_QUOTE_SELECTION_TYPE.TAGS ||
              props.currentQuoteSelectionType ===
                constants.MY_QUOTE_SELECTION_TYPE.METADATA) && (
              <AyogiQuoteMetadata
                categories={categories}
                categororyTags={quoteState.categororyTags}
                addTag={addTag}
                removeTag={removeTag}
                showQuotePopup={props.showQuotePopup}
                setShowQuotePopup={props.setShowQuotePopup}
                setIsSelected={props.setIsSelected}
                item={props.c}
                {...props}
              />
            )}
            <IonItem>
              <IonButton
                slot="start"
                onClick={() => {
                  console.log("add-quote", quoteState.tags);
                  //            const selTags = getSelectedTags();
                  props.addSelectedQuote(
                    quoteState.chapter,
                    quoteState.startline,
                    quoteState.startchar,
                    quoteState.endline,
                    quoteState.endchar,
                    quoteState.categororyTags,
                    quoteState.tags
                  );
                  props.setIsSelected(true);
                  props.setShowQuotePopup(false);
                }}
              >
                Save Quote
              </IonButton>
              <IonButton
                slot="end"
                color="light"
                onClick={() => {
                  props.removeSelectedQuote(
                    props.item.chapterNumber,
                    props.item.lineNumber,
                    1
                  );
                  props.setIsSelected(false);
                  props.setShowQuotePopup(false);
                }}
              >
                Remove Quote
              </IonButton>
            </IonItem>
          </IonCardContent>
        </IonCard>
      </IonModal>
    </div>
  );
};

export default AyogiQuote;
