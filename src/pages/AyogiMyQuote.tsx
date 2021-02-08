import React, { useState, useEffect, useRef } from "react";
import Loading from "../components/AyogiIon/Loading/Loading";
import { IonPage, IonContent, IonList, IonItem, IonLabel } from "@ionic/react";
import AyogiMyQuoteSort from "../components/AyogiIon/AyogiMyQuoteSort/AyogiMyQuoteSort";
import AyogiImage from "../components/AyogiIon/AyogiImage/AyogiImage";
import AyogiHeader from "../components/AyogiIon/AyogiHeader/AyogiHeader";
import { LINE_TYPE_ENUM } from "../utility/dataTypes";
//import AyogiContext from '../context/AyogiContext';
import "./AyogiMyQuote.css";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import selectors from "../store/selectors";
import actions from "../store/actions";

const AyogiMyQuote = (props: any) => {
  // console.log("AyogiMyQuote");
  // console.log(props);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <IonPage>
      <AyogiHeader
        headerType="quotes"
      ></AyogiHeader>
      <IonContent className="AyogiMyQuote">
        <AyogiMyQuoteSort {...props} />
      </IonContent>
    </IonPage>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    removeSelectedQuote: (quoteId: string) =>
      dispatch(actions.removeSelectedQuote(quoteId)),
  };
};

const mapStateToProps = () =>
  createStructuredSelector({
    currentFontSize: selectors.makeSelectFontSize(),
    selectedQuotes: selectors.makeSelectSelectedQuotes(),
    currentQuoteTags: selectors.makeSelectMyQuoteTags(),
  });

export default connect(mapStateToProps, mapDispatchToProps)(AyogiMyQuote);
