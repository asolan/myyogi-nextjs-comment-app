import React, { useState, useEffect, useRef } from "react";
import Loading from "../components/Loading/Loading";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonRange,
  IonListHeader,
  IonLabel,
  IonIcon,
  IonItemDivider,
  IonRadio,
  IonRadioGroup,
  IonToggle,
} from "@ionic/react";
import { textOutline, sunny } from "ionicons/icons";

import AyogiHeader from "../components/AyogiHeader/AyogiHeader";
import AyogiWisdom from "../components/AyogiWisdom/AyogiWisdom";
import AyogiMore from "../components/AyogiMore/AyogiMoreMain";
//import AyogiContext from '../context/AyogiContext';
import "./AyogiMorePage.css";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import selectors from "../store/selectors";
import actions from "../store/actions";
import constants from "../store/constants";
import { LINE_TYPE_ENUM } from "../utility/dataTypes";
let ayimage = require('../ayimage.json');

const AyogiMorePage = (props: any) => {

  return (
    <AyogiMore ayimage={ayimage} {...props} />
    // <IonPage className="AyogiMorePage">
    //   <IonContent>
    //     <AyogiMore ayimage={ayimage} {...props} />
    //   </IonContent>{" "}
    // </IonPage>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onChangeFontSize: (size: number) =>
      dispatch(actions.onChangeFontSize(size)),
    onChangeFontJustification: (justified: boolean) =>
      dispatch(actions.onChangeFontJustification(justified)),
    onChangeFootnotePopup: (show: boolean) =>
      dispatch(actions.onChangeFootnotePopup(show)),
    onChangeDefinitionPopup: (show: boolean) =>
      dispatch(actions.onChangeDefinitionPopup(show)),
    onChangeMyQuoteSelectionType: (myQuoteSelectionType: string) =>
      dispatch(actions.onChangeMyQuoteSelectionType(myQuoteSelectionType)),
    onChangeMyQuoteTags: (myQuoteTags: string[]) =>
      dispatch(actions.onChangeMyQuoteTags(myQuoteTags)),
  };
};

const mapStateToProps = () =>
  createStructuredSelector({
    currentFontSize: selectors.makeSelectFontSize(),
    currentFontJustification: selectors.makeSelectFontJustification(),
    currentFootnotePopup: selectors.makeSelectFootnotePopup(),
    currentDefinitionPopup: selectors.makeSelectDefinitionPopup(),
    currentQuoteSelectionType: selectors.makeSelectMyQuoteSelectionType(),
    currentQuoteTags: selectors.makeSelectMyQuoteTags(),
  });

export default connect(mapStateToProps, mapDispatchToProps)(AyogiMorePage);
