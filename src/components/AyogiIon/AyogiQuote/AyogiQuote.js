import React, {useReducer} from "react";
import "./AyogiQuote.css";
import AyogiQuoteSelectText from "./AyogiQuoteSelectText";
//import AyogiQuoteTags from "./AyogiQuoteTags";
import AyogiQuoteMetadata from "./AyogiQuoteMetadata";
import { IonItem, IonModal, IonButton } from "@ionic/react";
import constants from "../../../store/constants";

const initialQuote = {
    chapter: 0,
    startline: 0,
    startchar: 0,
    endline: 0,
    endchar: 0,
    tags: []
};

const AyogiQuote = (props) => {
    const [quote, dispatch] = useReducer(quoteReducer, initialQuote);

    
    function quoteReducer(state, action) {
      let newTags;
      switch (action.type) {
        case 'SET_POS':
            console.log('SET_POS', action);
            return {
                chapter: action.pos.chapter,
                startline: action.pos.startline,
                startchar: action.pos.startchar,
                endline: action.pos.endline,
                endchar: action.pos.endchar};
        case 'ADD_TAG':
            console.log('ADD_TAG',action);
            newTags = [...state.tags];
            newTags.push(action.tag);
                        console.log(newTags);
            return {...state, tags: newTags};
        case 'REMOVE_TAG':
            console.log('REMOVE_TAG',action);
            console.log(state.tags);
            newTags = [...state.tags].filter(t => t !== action.tag);
            console.log(newTags);
            return {...state, tags: newTags};
        default:
          throw new Error();
      }
    }
   
    const addTag = (tag) => {
        dispatch({ type: 'ADD_TAG', tag });
    };
      
    const removeTag = (tag) => {
        dispatch({ type: 'REMOVE_TAG', tag });
    };

    const setPos = (pos) => {
        dispatch({ type: 'SET_POS', pos });
    };
    
    return (
    <div className="AyogiQuote">
      <IonModal isOpen={props.showQuotePopup} cssClass="">
        <IonItem>
          <h2 className="ion-margin-start">Quote Selection</h2>
        </IonItem>
        <AyogiQuoteSelectText item={props.item} />
        {/* <AyogiQuoteTags
          showQuotePopup={props.showQuotePopup}
          setShowQuotePopup={props.setShowQuotePopup}
          setIsSelected={props.setIsSelected}
          item={props.c}
          {...props}
        /> */}
        {props.currentQuoteSelectionType === constants.MY_QUOTE_SELECTION_TYPE.TAGS &&
            <AyogiQuoteMetadata
            addTag={addTag}
            removeTag={removeTag}
            showQuotePopup={props.showQuotePopup}
            setShowQuotePopup={props.setShowQuotePopup}
            setIsSelected={props.setIsSelected}
            item={props.c}
            {...props}
            />
        }
        <IonButton
          onClick={() => {
            console.log('add-quote', quote.tags);
//            const selTags = getSelectedTags();
            props.addSelectedQuote(
              props.item.chapterNumber,
              props.item.lineNumber,
              1,
              props.item.lineNumber,
              props.item.text.length,
              quote.tags
            );
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
              1
            );
            props.setIsSelected(false);
            props.setShowQuotePopup(false);
          }}
        >
          Remove Quote
        </IonButton>
      </IonModal>
    </div>
  );
};

export default AyogiQuote;
