//import { fromJS, toJS, Map } from "immutable";
import { createSelector } from "reselect";
//import { select } from "redux-saga/effects";
// ??? import selectors from "../index.js";
//import { TActionCreatorType, TReducerExtraData, TUserDataInitialState } from "../types";

//const selectUserData = (state: RootState) => state["userData"];
const selectUserData = (state: any) => state["userData"];

const makeSelectTab: any = () =>
  createSelector(selectUserData, (ud) => ud.get("tab"));
const makeSelectChapter: any = () =>
  createSelector(selectUserData, (ud) => ud.get("chapter"));
const makeSelectChapterLine: any = () =>
  createSelector(selectUserData, (ud) => ud.get("chapterLine"));
const makeSelectImage: any = () =>
  createSelector(selectUserData, (ud) => ud.get("image"));
const makeSelectPoem: any = () =>
  createSelector(selectUserData, (ud) => ud.get("poem"));
const makeSelectFont: any = () =>
  createSelector(selectUserData, (ud) => ud.get("font"));

export {
  makeSelectTab,
  makeSelectChapter,
  makeSelectChapterLine,
  makeSelectImage,
  makeSelectPoem,
  makeSelectFont,
};
