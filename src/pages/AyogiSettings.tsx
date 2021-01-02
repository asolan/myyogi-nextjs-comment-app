import React, { useState, useEffect, useRef } from "react";
import Loading from "../components/AyogiIon/Loading/Loading";
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

import AyogiHeader from "../components/AyogiIon/AyogiHeader/AyogiHeader";
import AyogiWisdom from "../components/AyogiIon/AyogiWisdom/AyogiWisdom";
import AyogiSettingsMain from "../components/AyogiIon/AyogiSettings/AyogiSettingsMain";
//import AyogiContext from '../context/AyogiContext';
import "./AyogiSettings.css";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import selectors from "../store/selectors";
import actions from "../store/actions";
import constants from "../store/constants";
import { LINE_TYPE_ENUM } from "../utility/dataTypes";
//let aydata = require('../aydata.json');
//let aychaptlist = require('../aychaptlist.json');

const AyogiSettings = (props: any) => {
  // console.log("AyogiSettings");
  // console.log(props);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fontSize, setFontSize] = useState<number>(1);
  const [fontJustified, setFontJustified] = useState<boolean>(true);
  // const [testContent, setTestContent] = useState<string>(LINE_TYPE_ENUM.WISDOM);

  return (
    <IonPage className="AyogiSettings AyogiChapter">
      <IonContent>
        <AyogiHeader headerType="settings"></AyogiHeader>
        <AyogiSettingsMain {...props} />
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
    onChangeMyQuoteSelection: (myQuoteSelection: string) =>
      dispatch(actions.onChangeMyQuoteSelection(myQuoteSelection)),
    onChangeMyQuoteTags: (myQuoteTags: string[]) =>
      dispatch(actions.onChangeMyQuoteTags(myQuoteTags)),
  };
};

const mapStateToProps = () =>
  createStructuredSelector({
    currentFontSize: selectors.makeSelectFontSize(),
    currentFontJustification: selectors.makeSelectFontJustification(),
    currentQuoteSelection: selectors.makeSelectMyQuoteSelection(),
    currentQuoteTags: selectors.makeSelectMyQuoteTags(),
  });

export default connect(mapStateToProps, mapDispatchToProps)(AyogiSettings);
