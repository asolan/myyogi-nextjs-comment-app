import { fromJS } from "immutable";
import constants from "../constants";
import { TActionCreatorType, TReducerExtraData, TUserDataInitialState } from "../types";

let initialState: TUserDataInitialState = fromJS({
  tab: 'aychap',
  chapter: 1,
  chapterLine: 1,
  image: "",
  poem: "",
  font: "",
});

function userData(
  state: TUserDataInitialState = initialState,
  action: TActionCreatorType
) {
  switch (action.type) {
    case constants.ON_CHANGE_TAB:
       console.log("ON_CHANGE_TAB-reducer");
       console.log(action);
       //            return state.set(action.payload);
       return state;
     case constants.ON_CHANGE_CHAPTER:
      console.log("ON_CHANGE_CHAPTER-reducer");
      console.log(action);
      //            return state.set(action.payload);
      return state;
    case constants.ON_CHANGE_CHAPTER_LINE:
      return state;
    case constants.ON_CHANGE_IMAGE:
      return state;
    case constants.ON_CHANGE_POEM:
      return state;
    case constants.ON_CHANGE_FONT:
      return state;
    default:
      return state;
  }
}

export default userData;
