import { fromJS } from "immutable";
import constants from "../constants";

const initialQuoteView = {
  sort: 'chapter',
  categoriesSelected: {},
  selectedCategoryTags: {},
  tags: []
};

let initialState = {
  tab: "aychap",
  chapter: 1,
  chapterLine: 1,
  image: "",
  poem: "",
  fontSize: 1,
  fontJustification: true,
  quoteViewSettings: {...initialQuoteView},
  myQuoteSelectionType: constants.MY_QUOTE_SELECTION_TYPE.METADATA,
  myQuoteTags: [{"category": "My Inspiration",
  "color": "primary",
  "tags": [
  "Healing",
  "Divine Feminine",
  "Health",
  "True Teaching"
]}
]
};

const autoyogiState = window.localStorage["autoyogiState"]
  ? JSON.parse(window.localStorage["autoyogiState"])
  : initialState;

const fullInitiatState = fromJS({ ...initialState, ...autoyogiState });

document.documentElement.style
.setProperty("--yogi-font-size", fullInitiatState.fontSize + "em");
document.documentElement.style
.setProperty("--yogi-text-align", fullInitiatState.fontJustification ? "justify" : "left");

function userData(state = fullInitiatState, action) {
  let newState, newTab, currentChapter;

  switch (action.type) {
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
      // console.log("ON_CHANGE_CHAPTER_LINE-reducer");
      // console.log(action);
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
    case constants.ON_CHANGE_MY_QUOTE_SELECTION_TYPE:
      console.log('ON_CHANGE_MY_QUOTE_SELECTION_TYPE', action);
      newState = state.set("myQuoteSelectionType", action.payload);
      console.log(newState);
      setStorageState(newState);
      return newState;
    case constants.ON_CHANGE_MY_QUOTE_TAGS:
      console.log('ON_CHANGE_MY_QUOTE_TAGS', action);
      newState = state.set("myQuoteTags", fromJS(action.payload));
      console.log(newState);
      setStorageState(newState);
      return newState;
    case constants.SET_QUOTE_VIEW_SETTINGS:
      console.log('SET_QUOTE_VIEW_SETTINGS', action);
      newState = state.set("quoteViewSettings", fromJS(action.payload));
      console.log(newState);
      setStorageState(newState);
      return newState;
    default:
      return state;
  }
}

function setStorageState(nowState) {
  window.localStorage["autoyogiState"] = JSON.stringify(nowState.toJS());
  // console.log('nowState');
  // console.log(window.localStorage["autoyogiState"]);
}

export default userData;
