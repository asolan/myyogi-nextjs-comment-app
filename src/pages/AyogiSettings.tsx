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
import AyogiSettingsMain from "../components/AyogiSettings/AyogiSettingsMain";
import AyogiSettingFontSize from "../components/AyogiSettings/AyogiSettingFontSize";
//import AyogiContext from '../context/AyogiContext';
import "./AyogiSettings.css";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import selectors from "../store/selectors";
import actions from "../store/actions";
import constants from "../store/constants";
import { LINE_TYPE_ENUM } from "../utility/dataTypes";

const AyogiSettings = (props: any) => {

  return (
    <IonPage className="AyogiSettings AyogiChapter">
      <IonContent>
        <AyogiHeader headerType="settings"></AyogiHeader>
        <AyogiSettingFontSize {...props} />
        {/* <AyogiSettingsMain {...props} /> */}
      </IonContent>{" "}
    </IonPage>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onChangeFontSize: (size: number) =>
      dispatch(actions.onChangeFontSize(size)),
    onChangeFontJustification: (justified: boolean) =>
      dispatch(actions.onChangeFontJustification(justified)),
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
    currentQuoteSelectionType: selectors.makeSelectMyQuoteSelectionType(),
    currentQuoteTags: selectors.makeSelectMyQuoteTags(),
  });

export default connect(mapStateToProps, mapDispatchToProps)(AyogiSettings);
