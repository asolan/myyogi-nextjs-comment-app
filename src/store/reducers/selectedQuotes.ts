import { fromJS } from "immutable";
import constants from "../constants";
import { LINE_TYPE_ENUM } from "../../utility/dataTypes";

let initialState = {
  selectedQuotes: []
};

const newQuote = {
  quoteId: '',
  chapter: 0,
  startline: 0,
  startchar: 0,
  endline: 0,
  endchar: 0,
  linePos: [],
  categoryTags: {},
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

//  const getQuoteIndex = (quotes: any[], chapter:number, startline:number, startchar:number) => {
//   const getQuoteIndex = (quotes: any[], chapter:number, startline:number) => {
//     return quotes.findIndex(q => 
//       q.chapter === chapter && 
//       q.startline === startline 
// //&&      q.startchar === startchar
//       );
//   };
const getQuoteIndex = (quotes: any[], quoteId: string) => {
  return quotes.findIndex(q => q.quoteId === quoteId);
};
  
  switch (action.type) {
    case constants.ADD_SELECTED_QUOTE:
    console.log('Add Quote', 
    action,
    action.chapter, 
    action.startline, 
    action.startchar,
    action.quoteId);

    selQuotes = [...state.get("selectedQuotes").toJS()];

      quoteIndex = getQuoteIndex(selQuotes, action.quoteId ); 
      
      if(quoteIndex !== -1){
        selQuotes.splice(quoteIndex, 1);
      }

      selQuotes.push({...newQuote, 
        quoteId: action.quoteId,
        chapter: action.chapter, 
        startline: action.startline,
        startchar: action.startchar,
        endline: action.endline,
        endchar: action.endchar,
        linePos: action.linePos,
        categoryTags: action.categoryTags,
        tags: action.tags});

      newState = state.set("selectedQuotes", fromJS(selQuotes));
      setStorageState(newState);
      return newState;

    case constants.REMOVE_SELECTED_QUOTE:
      console.log('Remove Quote', action.quoteId);
      selQuotes = [...state.get("selectedQuotes").toJS()];

      quoteIndex = getQuoteIndex(selQuotes, action.quoteId); 

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
