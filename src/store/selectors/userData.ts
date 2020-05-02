//import { fromJS, toJS, Map } from "immutable";
import { createSelector } from "reselect";
//import { select } from "redux-saga/effects";
// ??? import selectors from "../index.js";
//import { TActionCreatorType, TReducerExtraData, TUserDataInitialState } from "../types";

//const selectUserData = (state: RootState) => state["userData"];
const selectUserData = (state) => state["userData"];

const makeSelectTab = () =>
  createSelector(selectUserData, (ud) => ud.get("tab"));
const makeSelectChapter = () =>
  createSelector(selectUserData, (ud) => ud.get("chapter"));
const makeSelectChapterLine = () =>
  createSelector(selectUserData, (ud) => ud.get("chapterLine"));
const makeSelectImage = () =>
  createSelector(selectUserData, (ud) => ud.get("image"));
const makeSelectPoem = () =>
  createSelector(selectUserData, (ud) => ud.get("poem"));
const makeSelectFont = () =>
  createSelector(selectUserData, (ud) => ud.get("font"));

export {
  makeSelectTab,
  makeSelectChapter,
  makeSelectChapterLine,
  makeSelectImage,
  makeSelectPoem,
  makeSelectFont,
};
