import React, { useReducer, useEffect, useState } from "react";
import "./AyogiQuoteViewMain.css";
import AyogiQuoteViewSetting from "./AyogiQuoteViewSetting";
import AyogiWisdom from "../AyogiWisdom/AyogiWisdom";
import { buildQuoteViewSettings } from "../../../utility/quoteUtility";
import { IonItem, IonList, IonButton } from "@ionic/react";
import constants from "../../../store/constants";

const AyogiQuoteViewMain = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showQuoteViewPopup, setShowQuoteViewPopup] = useState(false);
  const [sortByVal, setSortByVal] = useState("chapter");
  const [quoteGroups, setQuoteGroups] = useState([]);
  const [categories, setCategories] = useState([]);
  // const [categoryTags, setCategoryTags] = useState([]);
  // const [categoryChips, setCategoryChips] = useState([]);
  let contentId = 0;

//  console.log('AyogiQuoteViewMain', quoteGroups, sortByVal);
  
  useEffect(() => {
    setIsLoading(true);
    setupCategories();
    buildQuotes([...props.selectedQuotes], { ...props.quoteViewSettings }, categories);
  }, []);

  useEffect(() => {
    setupCategories();
  }, [props.aycategories, props.currentQuoteTags]);

  useEffect(() => {
    buildQuotes([...props.selectedQuotes], { ...props.quoteViewSettings }, categories);
  }, [props.selectedQuotes, props.quoteViewSettings, categories]);

  const setupCategories = () => {
    // console.log('setupCategories');
    const allCategories = [...props.aycategories].concat(
      props.currentQuoteTags
    );

    let newCategories = allCategories.map((c) => c.category);

    // let newCategoryTags = allCategories.reduce(function (map, obj) {
    //   map[obj.category] = obj.tags;
    //   return map;
    // }, {});

//    console.log(newCategories);
    //console.log(newCategoryTags);
    // console.log(newCategoryChips);
    setCategories(newCategories);
    //setCategoryTags(newCategoryTags);
    //    setCategoryChips(newCategoryChips);
  };

  const buildQuotes = (quotes, settings, cagtegories) => {
//    console.log("buildQuotes", quotes, settings, cagtegories);
    const viewSettings = buildQuoteViewSettings(settings, categories);

    if (
      quotes && quotes.length > 0 &&
      cagtegories && cagtegories.length > 0 &&
      viewSettings && viewSettings.categoriesSelected &&
      Object.keys(viewSettings.categoriesSelected).length > 0
    ) {
      const showUntaggedQuotes = viewSettings.categoriesSelected[constants.SHOW_UNTAGGED];

      const doSortBy = viewSettings.sort;
      setSortByVal(doSortBy);

      const filteredQuotes = quotes.filter((q) => {
//        console.log("filteredQuotes", q);
        if(Object.keys(q.selectedCategoryTags).length === 0){
          if(showUntaggedQuotes){
 //           console.log('showUntaggedQuotes', q);
            return true;
          }
        } else {
          // If and category associated with quote is show
          if(Object.keys(q.selectedCategoryTags).reduce((prev, key) => 
            {return prev || (viewSettings.categoriesSelected[key] || false);}, false)){
 //             console.log('show', q);
              return true;
            }
        }
        return false;
      });

//      console.log('filteredQuotes', filteredQuotes);
      // filteredQuotes.sort(quoteSort);
      // console.log(filteredQuotes);

      let sortQuotesItems = filteredQuotes.map((a, i) => {
//        console.log(a);
        let thisItem = props.aydata.find((c) => {
          return c.chapterNumber === a.chapter && 
            c.paragraphNumber === a.paragraph;
        });
        thisItem['selectedCategoryTags'] = a.selectedCategoryTags;
        thisItem['tags'] = a.tags;
        thisItem['chapter'] = props.aychapttitle[thisItem.chapterNumber].text;

        //      console.log('thisItem', thisItem);
        return thisItem;
      });

 //     console.log('sortQuotesItems', sortQuotesItems);

      let sortQuoteGroups = groupBy(sortQuotesItems, doSortBy);
//      console.log('sortQuoteGroups', sortQuoteGroups);
      setQuoteGroups(sortQuoteGroups);
      // let sortQuotesText = <AyogiWisdom items={sortQuotesItems} {...props} />

      // console.log('sortQuotesText', sortQuotesText);

      // setQuoteText(sortQuotesText);
      setIsLoading(false);
    }
  };

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

  const quoteSort = (a, b) => {
    if (a.chapter > b.chapter) {
      return 1;
    }
    if (a.chapter < b.chapter) {
      return -1;
    }
    return a.line - b.line;
  };

  let content = [];

  if (!isLoading && quoteGroups) {
    // console.log('chapterContent');
    // console.log(chapterContent);
    //const _getKeyValue_ = (key: string) => (obj: Record<string, any>) => obj[key];
    // for (var key of Object.entries(quoteGroups)) {
    //   console.log(key + " -> " + quoteGroups[key]);
    // }

    // console.log('quoteGroups', quoteGroups);
    Object.keys(quoteGroups).forEach((key) => {
      // console.log('quoteGroup', key);
      // console.log(quoteGroups[key]);
      //      quoteContent.push(JSON.stringify(props.aydata.slice(key, (key+1))));
      //      quoteContent.push(props.aydata.slice(key, (key+1)).text);

      content.push(
        <h3 key={`quoteGroup${key}`}>
          {sortByVal}: {key}
        </h3>
      );

      quoteGroups[key].map((c) => {
        // console.log(c);
        //console.log(props.aydata[dIndex].text);
        content.push(
          <AyogiWisdom
            key={`AyogiQuoteViewMain${c._id}`}
            items={[c]}
            {...props}
          />
        );
      });

      // console.log(quoteGroups[key]);
    });
  }

  let quoteViewSettingsModal = showQuoteViewPopup ? (
    <AyogiQuoteViewSetting
      categories={categories}
      showQuoteViewPopup={showQuoteViewPopup}
      setShowQuoteViewPopup={setShowQuoteViewPopup}
      {...props}
    />
  ) : (
    <IonItem lines="full">
      <IonButton
        slot="end"
        color="primary"
        fill={"outline"}
        onClick={() => {
          setShowQuoteViewPopup(true);
        }}
      >
        Sort and Filter
      </IonButton>
    </IonItem>
  );
  return (
    <div className="AyogiQuoteViewMain" key="AyogiQuoteViewMain">
      {quoteViewSettingsModal}
      <IonList>{content.map((c) => c)}</IonList>
    </div>
  );
};

export default AyogiQuoteViewMain;
