import React, { useReducer, useEffect, useState } from "react";
import "./AyogiMyQuoteSort.css";
import AyogiQuote from "../AyogiQuote/AyogiQuote";
import AyogiQuoteChips from "../AyogiQuote/AyogiQuoteChips";
import AyogiWisdom from "../AyogiWisdom/AyogiWisdom";
import {
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonText,
} from "@ionic/react";
import {getParaLineQuoteFromPos, 
  getParagraphQuote, 
  getLinesInParagraph, 
  getQuotelinePos} from '../../../utility/quoteUtility';
import constants from "../../../store/constants";
import { uuidv4 } from "../../../utility/jsutility";
import { act } from "react-dom/test-utils";


const AyogiMyQuoteSort = (props) => {

  const [isLoading, setIsLoading] = useState(false);
  const [quoteGroups, setQuoteGroups] = useState([]);
  let allowSelected = false;
  let contentId = 0;
  
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

  let content = [];

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

  return (
    <div className="AyogiMyQuoteSort">
      {/* <AyogiQuoteChips
        categories={categories}
        categoryChips={categoryChips}
        selectedCategoryTags={quoteState.selectedCategoryTags}
      /> */}
      <IonList>{content.map(c => c)}</IonList>
    </div>
  );
};

export default AyogiMyQuoteSort;
