//import { fromJS, toJS, Map } from "immutable";
import { createSelector } from "reselect";
//import { select } from "redux-saga/effects";
// ??? import selectors from "../index.js";
//import { TActionCreatorType, TReducerExtraData, TUserDataInitialState } from "../types";

//const selectUserData = (state: RootState) => state["userData"];
const selectQuotes = (state) => state["selectedQuotes"];

const makeSelectSelectedQuotes = () =>
  createSelector(selectQuotes, (sq) => sq.get("selectedQuotes").toJS());

export {
  makeSelectSelectedQuotes
};
