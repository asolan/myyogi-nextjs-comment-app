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

// https://stackoverflow.com/a/43762443
const autoyogiQuotes = window.localStorage["autoyogiQuotes"]
  ? JSON.parse(window.localStorage["autoyogiQuotes"])
  : initialState;

const fullInitiatState = fromJS({ ...initialState, ...autoyogiQuotes });

function selectedQuotes(state = fullInitiatState, action) {
  let newState, selQuotes, quoteIndex;

  const getQuoteIndex = (quotes: any[], chapter:string, line:string, lineType:string) => {
    return quotes.findIndex(q => 
      q.chapter === chapter && 
      q.line === line && 
      q.lineType === lineType 
      );
  };

  switch (action.type) {
    case constants.ADD_SELECTED_QUOTE:
      selQuotes = [...state.get("selectedQuotes").toJS()];
      quoteIndex = getQuoteIndex(selQuotes, action.chapter, action.line, action.lineType);

      if(quoteIndex === -1){
        selQuotes.push({...newQuote, chapter: action.chapter, line: action.line, lineType: action.lineType});
      }

      newState = state.set("selectedQuotes", fromJS(selQuotes));
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

    default:
      return state;
  }
}

function setStorageState(newState) {
  window.localStorage["autoyogiQuotes"] = JSON.stringify(newState.toJS());
  // console.log('nowState');
  // console.log(window.localStorage["autoyogiQuotes"]);
}

export default selectedQuotes;
