import React, { useReducer, useEffect, useState } from "react";
import "./AyogiQuote.css";
import AyogiQuoteSelectText from "./AyogiQuoteSelectText";
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
  IonText,
} from "@ionic/react";
import {getParaLineQuoteFromPos, 
  getParagraphQuote, 
  getLinesInParagraph, 
  getQuotelinePos} from '../../../utility/quoteUtility';
import constants from "../../../store/constants";
import { uuidv4 } from "../../../utility/jsutility";
import { act } from "react-dom/test-utils";

const initialQuote = {
  chapter: 0,
  startline: 0,
  startchar: 0,
  endline: 0,
  endchar: 0,
  categoryTags: {},
  tags: [],
  linePos: [],
  paragraphLines: [],
  paragraphLine: '',
  paragraphLineQuote: [],
  edit: constants.QUOTE_EDIT.NONE
};

const AyogiQuote = (props) => {
  const [quoteState, dispatch] = useReducer(quoteReducer, initialQuote);
  const [categories, setCategories] = useState([]);
  const [categoryItems, setCategoryItems] = useState([]);
  const [categoryChips, setCategoryChips] = useState([]);
  


  useEffect(() => {
    const newCategories = props.aycategories.map(c => c.category);
//    console.log(newCategories);
    setCategories(newCategories);

    const newCategoryItems = props.aycategories.reduce(function(map, obj) {
      map[obj.category] = obj.items;
      return map;
    }, {});
    console.log(newCategoryItems);
    setCategoryItems(newCategoryItems);

    const newCategoryChips = props.aycategories.reduce(function(map, obj) {
      map[obj.category] = obj.color;
      return map;
    }, {});
    console.log(newCategoryChips);
    setCategoryChips(newCategoryChips);
}, []);

  useEffect(() => {
    setQuoteState();
}, [props.items]);

  const setQuoteState = () => {
    let para = getLinesInParagraph(props.c, props.items);
    if(para.length > 0){
      //      debugger;
      let quote = getParagraphQuote(para, props.selectedQuotes);
      if(!quote || !quote.chapter){
        const endLineNum = para.length -1;
        const endCharNum = para.reduce((n,l) => n + l.text.length,0);
//        console.log(endCharNum);
        quote = {...initialQuote, 
          quoteId: uuidv4(),
          chapter: para[0].chapterNumber,
          startline: para[0].lineNumber,
          endline: para[endLineNum].lineNumber,
          endchar: endCharNum,
        };
      }

      const pline = para.reduce((t,l) => t + l.text, '');
      const plineQuote = getParaLineQuoteFromPos(
        pline, 
        quote.startchar, 
        quote.endchar);
      quote.paragraphLines = para;
      quote.paragraphLine = pline;
      quote.paragraphLineQuote = plineQuote;

      console.log(quote);
      dispatch({ type: "UPDATE", quote });
    }
  };

    // this.setState({ dealersOverallTotal: total }, () => {
  //   console.log(this.state.dealersOverallTotal, 'dealersOverallTotal1');
  // }); 

  // useEffect(() => {
  //   if(props.showQuotePopup){
  //     console.log('AyogiQuote[props.showQuotePopup]', quoteState);
  //   }
  // }, [props.showQuotePopup]);

  function quoteReducer(state, action) {
    let newTags;
    let newCategoryTags;
    switch (action.type) {
      case "EDIT_STATE":
        console.log("EDIT_STATE", action);
        return {...state, 
          edit: action.edit
        };
      case "UPDATE":
        let newQuote;
          newQuote = {...action.quote};
       return {...state, ...action.quote}
      case "SET_POS":
        console.log("SET_POS", action);
        const plineQuoteNew = getParaLineQuoteFromPos(
          state.paragraphLine, 
          action.pos.startchar, 
          action.pos.endchar);
  
        return {...state, 
          chapter: action.pos.chapter,
          startline: action.pos.startline,
          startchar: action.pos.startchar,
          endline: action.pos.endline,
          endchar: action.pos.endchar,
          paragraphLineQuote: plineQuoteNew
        };
      case "ADD_TAG":
        //            console.log('ADD_TAG',action);
        newTags = [...state.tags];
        if (!newTags.includes) {
          newTags.push(action.tag.name);
        }
        newCategoryTags = { ...state.categoryTags };
        //            console.log(newCategoryTags);
        newCategoryTags[action.tag.category] =
          newCategoryTags[action.tag.category] || [];
        if (!newCategoryTags[action.tag.category].includes(action.tag.name)) {
          newCategoryTags[action.tag.category].push(action.tag.name);
        }
        // console.log(newTags);
        // console.log(newCategoryTags);
        return { ...state, tags: newTags, categoryTags: newCategoryTags };
      case "REMOVE_TAG":
        //            console.log('REMOVE_TAG',action);
        newTags = [...state.tags].filter((t) => t !== action.tag.name);
        newCategoryTags = { ...state.categoryTags };
//        debugger;
        // console.log(newCategoryTags);
        if (newCategoryTags.hasOwnProperty(action.tag.category)) {
          newCategoryTags[action.tag.category] = newCategoryTags[action.tag.category].filter(
            (t) => t !== action.tag.name
          );
        }
                    console.log(newCategoryTags);
        return { ...state, tags: newTags, categoryTags: newCategoryTags };
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

  const setQuoteEdit = (edit) => {
    dispatch({ type: "EDIT_STATE", edit });
  };

  return (
    <div className="AyogiQuote">
      <IonModal isOpen={props.showQuotePopup} cssClass="">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Quote Selection</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
          {quoteState.edit !== constants.QUOTE_EDIT.SELECT_TEXT 
          && (<IonText className="ion-margin-start">
            {quoteState.paragraphLineQuote.slice(1,2).map((q,i) => <span key={`itemquoteselt${props.item._id}${i}`} className={q.className}>{q.text}</span>)}
          </IonText>)}
          <AyogiQuoteChips
            categories={categories}
            categoryChips={categoryChips}
            categoryTags={quoteState.categoryTags}
          />

          {quoteState.edit === constants.QUOTE_EDIT.NONE && (<IonItem>
            <IonButton
              slot="start"
              color="primary"
              fill={"solid"}
              onClick={() => {
                setQuoteEdit(constants.QUOTE_EDIT.SELECT_TEXT);
              }}
            >
              Change Text
            </IonButton>
            <IonButton
              slot="end"
              color="primary"
              fill={"solid"}
              onClick={() => {
                setQuoteEdit(constants.QUOTE_EDIT.SELECT_TAGS);
              }}
            >
              Change Tags
            </IonButton>
          </IonItem>)}

            {quoteState.edit === constants.QUOTE_EDIT.SELECT_TEXT 
            && (<AyogiQuoteSelectText
              setPos={setPos} 
              setQuoteEdit={setQuoteEdit}
              item={props.item}
              quoteState={quoteState} />)}
            {(quoteState.edit === constants.QUOTE_EDIT.SELECT_TAGS &&
              (props.currentQuoteSelectionType ===
              constants.MY_QUOTE_SELECTION_TYPE.TAGS ||
              props.currentQuoteSelectionType ===
                constants.MY_QUOTE_SELECTION_TYPE.METADATA)) && (
              <AyogiQuoteMetadata
                categories={categories}
                categoryItems={categoryItems}
                categoryTags={quoteState.categoryTags}
                addTag={addTag}
                removeTag={removeTag}
                setQuoteEdit={setQuoteEdit}
                {...props}
              />
            )}
            {quoteState.edit === constants.QUOTE_EDIT.NONE 
            && (<IonItem>
              <IonButton
                slot="start"
                onClick={() => {
                  console.log("add-quote", quoteState.tags);
                  const newLinePos = getQuotelinePos(quoteState);
                  //            const selTags = getSelectedTags();
                  props.addSelectedQuote(
                    quoteState.quoteId,
                    quoteState.chapter,
                    quoteState.startline,
                    quoteState.startchar,
                    quoteState.endline,
                    quoteState.endchar,
                    newLinePos,
                    quoteState.categoryTags,
                    quoteState.tags
                  );
                  props.setIsSelected(true);
                  props.updateQuote(quoteState);
                  props.setShowQuotePopup(false);
                }}
              >
                Save Quote
              </IonButton>
              <IonButton
                slot="end"
                color="light"
                onClick={() => {
                  props.setIsSelected(false);
                  props.setShowQuotePopup(false);
                }}
              >
                TODO-Cancel
              </IonButton>
              <IonButton
                className="ion-padding-start"
                slot="end"
                color="light"
                onClick={() => {
                  props.removeSelectedQuote(quoteState.quoteId);
                  props.setIsSelected(false);
                  props.setShowQuotePopup(false);
                }}
              >
                Remove Quote
              </IonButton>
            </IonItem>)}
          </IonCardContent>
        </IonCard>
      </IonModal>
    </div>
  );
};

export default AyogiQuote;
