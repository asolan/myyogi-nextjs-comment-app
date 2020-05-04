import { fromJS } from "immutable";
import constants from "../constants";
import { IonTabs } from '@ionic/react';

let initialState = {
  tab: "aychap",
  chapter: 1,
  chapterLine: 1,
  image: "",
  poem: "",
  font: "",
};

console.log(window.localStorage["autoyogiState"] || initialState);

const autoyogiState = window.localStorage["autoyogiState"]
  ? JSON.parse(window.localStorage["autoyogiState"])
  : initialState;

const fullInitiatState = fromJS({ ...initialState, ...autoyogiState });

function userData(state = fullInitiatState, action) {
  let newState, newTab, currentChapter;

  switch (action.type) {
    case constants.ON_CHANGE_TAB:
      console.log("ON_CHANGE_TAB-reducer");
      console.log(action);
      newState = state.set("tab", action.tabName);
      setStorageState(newState);
      return newState;
    case constants.ON_CHANGE_CHAPTER:
      console.log("ON_CHANGE_CHAPTER-reducer");
      console.log(action);
      newTab = `/ayogi/${action.payload}/1`;
      newState = state.set("chapter", action.payload).set("tab", newTab);
      setStorageState(newState);
      return newState;
    case constants.ON_CHANGE_CHAPTER_LINE:
      console.log("ON_CHANGE_CHAPTER_LINE-reducer");
      console.log(action);
      currentChapter = state.get("chapter");
      newTab = `/ayogi/${currentChapter}/${action.payload}`;
      newState = state.set("chapterLine", action.chapterLineNumber).set("tab", newTab);
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
    case constants.ON_CHANGE_FONT:
      newState = state.set("font", action.font);
      setStorageState(newState);
      return newState;
    default:
      return state;
  }
}

function setStorageState(nowState) {
  window.localStorage["autoyogiState"] = JSON.stringify(nowState.toJS());
  console.log('nowState');
  console.log(window.localStorage["autoyogiState"]);
}

export default userData;
