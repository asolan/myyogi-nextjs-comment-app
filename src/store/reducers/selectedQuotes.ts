import { fromJS } from "immutable";
import constants from "../constants";
import { LINE_TYPE_ENUM } from "../../utility/dataTypes";

let initialState = {
  selectedQuotes: []
};

const newQuote = {
  chapter: 0,
  startline: 0,
  startchar: 0,
  endline: 0,
  endchar: 0,
  tags: []
};
// console.log(window.localStorage["autoyogiQuotes"] || initialState);

// https://stackoverflow.com/a/43762443
const autoyogiQuotes = window.localStorage["autoyogiQuotes"]
  ? JSON.parse(window.localStorage["autoyogiQuotes"])
  : initialState;

const fullInitiatState = fromJS({ ...initialState, ...autoyogiQuotes });

function selectedQuotes(state = fullInitiatState, action) {
  let newState, selQuotes, quoteIndex;

  const getQuoteIndex = (quotes: any[], chapter:number, startline:number, startchar:number) => {
    return quotes.findIndex(q => 
      q.chapter === chapter && 
      q.startline === startline &&
      q.startchar === startchar
      );
  };

  switch (action.type) {
    case constants.ADD_SELECTED_QUOTE:
    console.log('Add Quote', 
    action.chapter, action.startline, 
    action.startchar);
    selQuotes = [...state.get("selectedQuotes").toJS()];
      quoteIndex = getQuoteIndex(
        selQuotes, 
        action.chapter, 
        action.startline, 
        action.startchar);

      if(quoteIndex === -1){
        selQuotes.push({...newQuote, 
          chapter: action.chapter, 
          startline: action.startline,
          startchar: action.startchar,
          endline: action.endline,
          endchar: action.endchar,
          tags: action.tags});
      }

      newState = state.set("selectedQuotes", fromJS(selQuotes));
      setStorageState(newState);
      return newState;

    case constants.REMOVE_SELECTED_QUOTE:
      console.log('Remove Quote', action.chapter, action.startline);
      selQuotes = [...state.get("selectedQuotes").toJS()];

      quoteIndex = getQuoteIndex(
        selQuotes, 
        action.chapter, 
        action.startline, 
        action.startchar);

      if(quoteIndex !== -1){
        selQuotes.splice(quoteIndex, 1);
      }

      newState = state.set("selectedQuotes", fromJS(selQuotes));
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
