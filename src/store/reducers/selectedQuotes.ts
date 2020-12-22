import { fromJS } from "immutable";
import constants from "../constants";
import { LINE_TYPE_ENUM } from "../../utility/dataTypes";

let initialState = {
  selectedQuotes: []
};

const newQuote = {
  chapter: '',
  line: '',
  lineType: LINE_TYPE_ENUM.WISDOM
};
// console.log(window.localStorage["autoyogiQuotes"] || initialState);

const autoyogiQuotes = window.localStorage["autoyogiQuotes"]
  ? JSON.parse(window.localStorage["autoyogiQuotes"])
  : initialState;

const fullInitiatState = fromJS({ ...initialState, ...autoyogiQuotes });

function selectedQuotes(state = fullInitiatState, action) {
  let newState, newTab, currentChapter, selQuotes, quoteIndex;

  const getQuoteIndex = (quotes: any[], chapter:string, line:string, lineType:string) => {
    return quotes.findIndex(q => 
      q.chapter === chapter && 
      q.line === line && 
      q.lineType === lineType 
      );
  };

  switch (action.type) {
    case constants.ADD_SELECTED_QUOTE:
      selQuotes = [...state.get("selectedQuotes")];
      quoteIndex = getQuoteIndex(selQuotes, action.chapter, action.line, action.lineType);

      if(quoteIndex === -1){
        selQuotes.push({...newQuote, chapter: action.chapter, line: action.line, lineType: action.lineType});
      }

      newState = state.set("selectedQuotes", selQuotes);
      setStorageState(newState);
      return newState;

    case constants.REMOVE_SELECTED_QUOTE:
      selQuotes = [...state.get("selectedQuotes")];

      if(quoteIndex !== -1){
        selQuotes.splice(quoteIndex, 1);
      }

      newState = state.set("selectedQuotes", selQuotes);
      setStorageState(newState);
      return newState;

    case constants.ON_CHANGE_TAB:
      // console.log("ON_CHANGE_TAB-reducer");
      // console.log(action);
      newState = state.set("tab", action.tabName);
      setStorageState(newState);
      return newState;
    case constants.ON_CHANGE_CHAPTER:
      // console.log("ON_CHANGE_CHAPTER-reducer");
      // console.log(action);
      const chapterNum = action.payload || '1'; 
//      const chapterNum = action.payload; 
      newTab = `/ayogi/${chapterNum}/1`;
      newState = state.set("chapter", chapterNum).set("tab", newTab);
      setStorageState(newState);
      return newState;
    case constants.ON_CHANGE_CHAPTER_LINE:
      console.log("ON_CHANGE_CHAPTER_LINE-reducer");
      console.log(action);
      currentChapter = state.get("chapter");
      const lineNum = Math.round(action.payload);
      newTab = `/ayogi/${currentChapter}/${lineNum}`;
      newState = state.set("chapterLine", lineNum).set("tab", newTab);
      setStorageState(newState);
      return newState;
    case constants.ON_CHANGE_IMAGE:
      newState = state.set("image", action.imageId);
      setStorageState(newState);
      return newState;
    case constants.ON_CHANGE_POEM:
      newState = state.set("poem", action.poemId);
      setStorageState(newState);
      return newState;
    case constants.ON_CHANGE_FONT_SIZE:
      newState = state.set("fontSize", action.payload);
      setStorageState(newState);
      return newState;
    case constants.ON_CHANGE_FONT_JUSTIFICATION:
      newState = state.set("fontJustification", action.payload);
      setStorageState(newState);
      return newState;
    default:
      return state;
  }
}

function setStorageState(nowState) {
  window.localStorage["autoyogiQuotes"] = JSON.stringify(nowState.toJS());
  // console.log('nowState');
  // console.log(window.localStorage["autoyogiQuotes"]);
}

export default selectedQuotes;
