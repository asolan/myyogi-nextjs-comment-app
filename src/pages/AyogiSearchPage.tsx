import React, { useState, useEffect, useRef } from "react";
import Loading from "../components/Loading/Loading";
import {
  IonPage,
  IonContent,
} from "@ionic/react";

import AyogiHeader from "../components/AyogiHeader/AyogiHeader";
import AyogiSearch from "../components/AyogiSearch/AyogiSearch";
import { LINE_TYPE_ENUM } from "../utility/dataTypes";
//import AyogiContext from '../context/AyogiContext';
import "./AyogiSearchPage.css";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import selectors from "../store/selectors";
import actions from "../store/actions";

const AyogiSearchPage = (props: any) => {
  //  console.log("AyogiSearchPage");
  //  console.log(props);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Page load
  useEffect(() => {
  }, []);

  return (
    <IonPage>
      <AyogiHeader
        headerType="search"
        headerTitle={"Search"}
      ></AyogiHeader>
        <AyogiSearch {...props} />
    </IonPage>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
  };
};

const mapStateToProps = () =>
  createStructuredSelector({
    currentFontSize: selectors.makeSelectFontSize(),
    selectedQuotes: selectors.makeSelectSelectedQuotes(),
    currentQuoteSelectionType: selectors.makeSelectMyQuoteSelectionType(),
    currentQuoteTags: selectors.makeSelectMyQuoteTags(),
  });

export default connect(mapStateToProps, mapDispatchToProps)(AyogiSearchPage);
