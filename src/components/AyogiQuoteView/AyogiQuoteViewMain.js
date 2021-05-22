import React, { useReducer, useEffect, useState } from "react";
import "./AyogiQuoteViewMain.css";
import AyogiQuoteViewSetting from "./AyogiQuoteViewSetting";
import AyogiWisdom from "../AyogiWisdom/AyogiWisdom";
import { buildQuoteViewSettings, quoteSort } from "../../utility/quoteUtility";
import { sendCategoryToFirebaseStorage } from "../../utility/firebaseSend";
import { IonItem, IonList, IonButton, useIonAlert } from "@ionic/react";
import constants from "../../store/constants";
import { uuidv4 } from "../../utility/jsutility";

const AyogiQuoteViewMain = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showQuoteViewPopup, setShowQuoteViewPopup] = useState(false);
  const [sortByVal, setSortByVal] = useState(constants.QUOTE_SORT_VALUES.CHAPTER);
  const [quoteGroups, setQuoteGroups] = useState([]);
  const [categories, setCategories] = useState([]);
  const [present] = useIonAlert();
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
        if(a && a.selectedCategoryTags && a.selectedCategoryTags !== 'undefined'){
          let thatItems = props.aydata.filter((c) => {
            return c.chapterNumber === a.chapter && 
              c.paragraphNumber === a.paragraph;
          });
//          console.log(thatItems);
          thatItems.forEach(function(part, index) {
            this[index]['selectedCategoryTags'] = a.selectedCategoryTags;
            this[index]['tags'] = a.tags;
            this[index]['chapter'] = this[index].chapterNumber + ' - ' + props.aychapttitle[this[index].chapterNumber].text;
            }, thatItems); // use thatItems as this

          //      console.log('thisItem', thisItem);
          return thatItems;
        }
      });

//      console.log('sortQuotesItems', sortQuotesItems, doSortBy);

      let sortQuoteGroups = groupBy(sortQuotesItems, doSortBy.toLowerCase());
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
      if (!hash[array[i][0][property]]) {
        hash[array[i][0][property]] = [];
      }
      hash[array[i][0][property]].push(array[i]);
    }
    return hash;
  }

  let content = [];

  if (!isLoading && quoteGroups) {
    // console.log('chapterContent');
    // console.log(chapterContent);
    //const _getKeyValue_ = (key: string) => (obj: Record<string, any>) => obj[key];
    // for (var key of Object.entries(quoteGroups)) {
    //   console.log(key + " -> " + quoteGroups[key]);
    // }

//    console.log('quoteGroups', quoteGroups);
    Object.keys(quoteGroups).forEach((key) => {
      // console.log('quoteGroup', key);
      // console.log(quoteGroups[key]);
      //      quoteContent.push(JSON.stringify(props.aydata.slice(key, (key+1))));
      //      quoteContent.push(props.aydata.slice(key, (key+1)).text);

      content.push(
        <h3 key={`quoteGroup${key}`}>
          {sortByVal} {key}
        </h3>
      );


      quoteGroups[key].map((c) => {
        //console.log(props.aydata[dIndex].text);
        content.push(
          <AyogiWisdom key={`AyogiQuoteViewMain${c[0]._id}`} items={c} {...props} />
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
    <React.Fragment>
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
    </React.Fragment>
  );
  console.log(content);
  return (
    <div className="AyogiQuoteViewMain" key="AyogiQuoteViewMain">
      {quoteViewSettingsModal}
      <IonList>{content.map((c) => c)}</IonList>
      <IonItem lines="full">
        <IonButton
          slot="end"
          color="primary"
          fill={"outline"}
          onClick={() => {
            present({
//              cssClass: 'my-css',
              header: 'Submit Quotes?',
              message: 'Submit quotes to firebase',
              buttons: [
                'Cancel',
                { text: 'Ok', handler: (d) => {
                  console.log('Submit quotes to firebase', props.selectedQuotes);
                  sendCategoryToFirebaseStorage(uuidv4(), props.selectedQuotes);
                }},
              ],
              onDidDismiss: (e) => console.log('did dismiss'),
            })
          }            
          }
        >
          Send Quotes to Firebase
        </IonButton>
      </IonItem>

    </div>
  );
};

export default AyogiQuoteViewMain;
