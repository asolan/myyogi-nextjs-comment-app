import React, { useState, useEffect, useRef } from "react";
import Loading from "../components/AyogiIon/Loading/Loading";
import { IonPage, IonContent, IonList, IonItem, IonLabel } from "@ionic/react";
import AyogiWisdom from "../components/AyogiIon/AyogiWisdom/AyogiWisdom";
import AyogiImage from "../components/AyogiIon/AyogiImage/AyogiImage";
import AyogiPoem from "../components/AyogiIon/AyogiPoem/AyogiPoem";
import AyogiFootnoteAlert from "../components/AyogiIon/AyogiFootnoteAlert/AyogiFootnoteAlert";
import AyogiHeader from "../components/AyogiIon/AyogiHeader/AyogiHeader";
import AyogiQuote from "../components/AyogiIon/AyogiQuote/AyogiQuote";
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
  const [quoteGroups, setQuoteGroups] = useState<any>([]);
  let allowSelected = false;
  let contentId: number = 0;
  const contentRef = useRef(null);

  // Page load
  useEffect(() => {
    console.log(props.selectedQuotes);
    let sortQuotes = [...props.selectedQuotes];
    sortQuotes.sort(quoteSort);
    console.log(sortQuotes);

    let sortQuotesItems = sortQuotes.map((a,i) => {
      let thisItem = props.aydata.find(c => {
        return c._id === a.chapter + '-' + a.line;
      });

//      console.log('thisItem', thisItem);
      return thisItem;

    });

    let sortQuoteGroups = groupBy(sortQuotes, "chapter");
//    console.log(sortQuoteGroups);
    setQuoteGroups(sortQuoteGroups);
    // let sortQuotesText = <AyogiWisdom items={sortQuotesItems} {...props} />

    // console.log('sortQuotesText', sortQuotesText);

    // setQuoteText(sortQuotesText);

  }, [props.selectedQuotes]);

  function groupBy(array, property) {
    var hash = {};
    for (var i = 0; i < array.length; i++) {
        if (!hash[array[i][property]]) {
          hash[array[i][property]] = [];
        }
        hash[array[i][property]].push(array[i]);
    }
    return hash;
  }

  const quoteSort = (a,b) => {
    if(a.chapter>b.chapter){
        return 1;
    } 
    if(a.chapter<b.chapter){
        return -1;
    }
    return a.line-b.line;
  };

  let content:any = [];

  if (
    !isLoading &&
    quoteGroups 
  ) {
    // console.log('chapterContent');
    // console.log(chapterContent);
    //const _getKeyValue_ = (key: string) => (obj: Record<string, any>) => obj[key];
    // for (var key of Object.entries(quoteGroups)) {
    //   console.log(key + " -> " + quoteGroups[key]);
    // }

//    console.log(props.aydata);
    Object.keys(quoteGroups).forEach(key => {
//      quoteContent.push(JSON.stringify(props.aydata.slice(key, (key+1))));
//      quoteContent.push(props.aydata.slice(key, (key+1)).text);

    content.push(<h3>Chapter: {key}</h3>); 

    quoteGroups[key].map(c => {
//        console.log(c.chapter + '-' + c.line);
          let item = props.aydata.filter(i => i._id === c.chapter + '-' + c.startline);
          //console.log(props.aydata[dIndex].text);
          content.push(<AyogiWisdom key={"AyogiWisdom" + contentId} alloweSelected={allowSelected} items={item} {...props} />);
    });

      // console.log(quoteGroups[key]);
    });

    // const quoteWisom = quote
    // content = (
    //   <AyogiQuote currentQuoteText={quoteText}>
    //   </AyogiQuote>
    // );
  } else {
    content.push(<IonItem><IonLabel>"No Quotes were selected. Click twice on a paragraph to selected a quote.</IonLabel></IonItem>);
  }

  //  return (<main>{buttons}{content}</main>);
  return (
    <IonPage>
      <AyogiHeader
        headerType="quotes"
      ></AyogiHeader>
      <IonContent className="AyogiMyQuote">
        <IonList>{content.map(c => c)}</IonList>
      </IonContent>
    </IonPage>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    removeSelectedQuote: (chapter:number, startline:number, startchar:number) =>
      dispatch(actions.removeSelectedQuote(chapter, startline, startchar)),
  };
};

const mapStateToProps = () =>
  createStructuredSelector({
    currentFontSize: selectors.makeSelectFontSize(),
    selectedQuotes: selectors.makeSelectSelectedQuotes(),
    currentQuoteTags: selectors.makeSelectMyQuoteTags(),
  });

export default connect(mapStateToProps, mapDispatchToProps)(AyogiMyQuote);
