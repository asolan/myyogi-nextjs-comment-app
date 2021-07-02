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
const makeSelectFontSize = () =>
  createSelector(selectUserData, (ud) => ud.get("fontSize"));
const makeSelectFontJustification = () =>
  createSelector(selectUserData, (ud) => ud.get("fontJustification"));
const makeSelectFootnotePopup = () =>
  createSelector(selectUserData, (ud) => ud.get("footnotePopup"));
const makeSelectDefinitionPopup = () =>
  createSelector(selectUserData, (ud) => ud.get("definitionPopup"));
const makeSelectMyQuoteSelectionType = () =>
  createSelector(selectUserData, (ud) => ud.get("myQuoteSelectionType"));
const makeSelectMyQuoteTags = () =>
  createSelector(selectUserData, (ud) => ud.get("myQuoteTags").toJS());
const makeSelectQuoteViewSettings = () =>
  createSelector(selectUserData, (ud) => ud.get("quoteViewSettings").toJS());
export {
  makeSelectTab,
  makeSelectChapter,
  makeSelectChapterLine,
  makeSelectImage,
  makeSelectPoem,
  makeSelectFontSize,
  makeSelectFontJustification,
  makeSelectMyQuoteSelectionType,
  makeSelectMyQuoteTags,
  makeSelectQuoteViewSettings,
  makeSelectFootnotePopup,
  makeSelectDefinitionPopup
};
