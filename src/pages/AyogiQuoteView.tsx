import React, { useState, useEffect, useRef } from "react";
import Loading from "../components/Loading/Loading";
import { IonPage, IonContent, IonList, IonItem, IonLabel } from "@ionic/react";
import AyogiQuoteViewMain from "../components/AyogiQuoteView/AyogiQuoteViewMain";
import AyogiImage from "../components/AyogiImage/AyogiImage";
import AyogiHeader from "../components/AyogiHeader/AyogiHeader";
import { LINE_TYPE_ENUM } from "../utility/dataTypes";
//import AyogiContext from '../context/AyogiContext';
import "./AyogiQuoteView.css";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import selectors from "../store/selectors";
import actions from "../store/actions";

const AyogiQuoteView = (props: any) => {
  // console.log("AyogiQuoteView");
  // console.log(props);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    console.log(props.quoteViewSettings);
  }, [props.quoteViewSettings]);

  return (
    <IonPage>
      <AyogiHeader
        headerType="quotes"
      ></AyogiHeader>
      <IonContent className="AyogiQuoteView">
        <AyogiQuoteViewMain {...props} />
      </IonContent>
    </IonPage>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    addSelectedQuote: (quoteId: string, chapter:number,  paragraph:number, startline:number, startchar:number, endline:number, endchar:number, linePos:any[], selectedCategoryTags:any, tags:string[]) =>
      dispatch(actions.addSelectedQuote(quoteId, chapter, paragraph, startline, startchar, endline, endchar, linePos, selectedCategoryTags, tags)),
    removeSelectedQuote: (quoteId: string) =>
      dispatch(actions.removeSelectedQuote(quoteId)),
    setQuoteViewSettings: (quoteViewSettings:any) =>
      dispatch(actions.setQuoteViewSettings(quoteViewSettings)),
  };
};

const mapStateToProps = () =>
  createStructuredSelector({
    currentFontSize: selectors.makeSelectFontSize(),
    selectedQuotes: selectors.makeSelectSelectedQuotes(),
    currentQuoteSelectionType: selectors.makeSelectMyQuoteSelectionType(),
    currentQuoteTags: selectors.makeSelectMyQuoteTags(),
    quoteViewSettings: selectors.makeSelectQuoteViewSettings(),
  });

export default connect(mapStateToProps, mapDispatchToProps)(AyogiQuoteView);
