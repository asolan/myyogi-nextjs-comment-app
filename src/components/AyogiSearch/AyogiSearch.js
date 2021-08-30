import React, {useState, useEffect} from 'react';
//import { Link } from 'react-router-dom';
//import AyogiFooters from '../AyogiFooters/AyogiFooters';
import Button from '../Button/Button';
//import classes from './AyogiSearch.css';
import {
    IonSearchbar,
    IonRow,
    IonCol,
    IonIcon,
    IonItem,
    IonInput,
    IonList,
    IonSpinner,
    IonContent,
    IonLoading
} from "@ionic/react";
import './AyogiSearch.css';
import { closeCircleOutline, searchOutline } from "ionicons/icons";
import { notChapterTitleHeader, buildSection } from "../../utility/parseUtility";
import { LINE_TYPE_ENUM } from "../../utility/dataTypes";
//import parseBookData from '../../utility/parseBookData';
//import {useTraceUpdate} from '../../utility/helpUtility';


const AyogiSearch = (props) => {
  const [showLoading, setShowLoading] = useState(false);
  const [searchFocus, setSearchFocus] = useState(false);
  const [searchTerm, setSearchTerm] = useState([]);
  const [searchResultsContent, setSearchResultsContent] = useState([]);
  const [disableSearch, setDisableSearch] = useState(true);
  const [isSearchDone, setIsSearchDone] = useState(false);

  const quoteOnly = false;
  const minSearchLength = 3;

    useEffect(() => {
//        buildSearchText('');
    }, []);


    const doSearch = (a, c) => {
      let found = false;

      if(c && c !== undefined && c.type === 'WISDOM'){
        if(typeof c.text === 'string'){
          if(c.text.toLowerCase().indexOf(searchTerm) > -1) {
            found = true;
          }
        } else {
           if(c.text.length > 0 && 
            c.text.findIndex(f => f.toLowerCase().indexOf(searchTerm)> -1) > -1){
              found = true;
          }
        }
        if((c.footnote && 
          c.footnote.length > 0 && 
          c.footnote.findIndex(f => f.toLowerCase().indexOf(searchTerm)> -1) > -1)){
            found = true;
        }
      }
      if(found && !a.find(f => {
        return f.chapterNumber === c.chapterNumber && 
          f.paragraphNumber === c.paragraphNumber
        })){
        a.push({chapterNumber: c.chapterNumber, paragraphNumber: c.paragraphNumber});
      }
      return a;
    };
      
    const buildSearchText = (newSearchTerm) => {
      let contentId = 0;
      let nextContentList = [];
      setDisableSearch(true);
      setShowLoading(true);
      console.log('search.1');
      setTimeout(setShowLoading(false), 5000);
      if (!props.aydata) {
        console.log("buildchaptext-notext");
        return;
      }

      let matchedPar = props.aydata.reduce(doSearch, [])
      let currentChapter = -1;
      let nextText = matchedPar.map((m) => {
          const a = [];

          if(currentChapter === -1){
            a.push(<hr key={`hr${m.chapterNumber}${m.paragraphNumber}`}/>);
          }

          if(m.chapterNumber !== currentChapter){
              currentChapter = m.chapterNumber;
              let chapTitle = m.chapterNumber === 0 ? 
              <span className="chapterheader" key={`searchChapterNumber${m.chapterNumber}`}>Introduction</span> :
              <span className="chapterheader" key={`searchChapterNumber${m.chapterNumber}`}>Chapter: <span>{m.chapterNumber}</span></span>
              a.push(chapTitle);
              a.push(<hr key={`hrtop${m.chapterNumber}${m.paragraphNumber}`}/>);
            }

            const parItems = props.aydata.filter((c) => { 
              return c.chapterNumber === m.chapterNumber && 
                c.paragraphNumber === m.paragraphNumber
            });

            a.push(buildSection(
              parItems,
              ++contentId, 
              props, 
              quoteOnly, 
              newSearchTerm, 
              true));

            a.push(<hr key={`hr${m.chapterNumber}${m.paragraphNumber}`}/>);
            return a;
        });
  
      setSearchResultsContent(nextText);
//      console.log('search.5');
//      setShowLoading(false);
      setIsSearchDone(true);
    };

    const searchBar = (
      <IonItem>
        <IonSearchbar
            value={searchTerm} 
            onIonBlur={e => {setSearchFocus(false)}}
            onIonFocus={e => {setSearchFocus(true)}}
            onIonChange={e => {
              setSearchTerm(e.detail.value.toLowerCase());
              setDisableSearch(e.detail.value.length < minSearchLength);
              setIsSearchDone(false);
            }}
            >
        </IonSearchbar>
        <Button
            title="Search"
            alt="Search"
            key={'searchButton'}
            disabled={disableSearch}
            onClick={() => {
              //todo-validate and give error
              if(searchTerm.length >= minSearchLength){
                buildSearchText(searchTerm);
              }
  //                    props.history.push(`/ayogi/${chNum}/1`);
            }}><IonIcon slot="start" icon={searchOutline}></IonIcon>
        </Button>
      </IonItem>
  );

//     const searchBar = (
//             <IonItem>
//                 <IonInput 
//                     value={searchTerm} 
//                     placeholder="Enter search term" 
//                     onIonChange={e => {setSearchTerm(e.detail.value.toLowerCase());}}
//                     >
//                 </IonInput>

//             <Button
//                 title="Search"
//                 alt="Search"
//                 key={'searchButton'}
//                 onClick={() => {
//                   //todo-validate and give error
//                   if(searchTerm.length > 3){
//                    buildSearchText(searchTerm);
//                   }
// //                    props.history.push(`/ayogi/${chNum}/1`);
//                 }}>
//             </Button>
//             </IonItem>
//         );

    return (
      <div className="AyogiSearch">
        <IonLoading
//          cssClass='my-custom-class'
          isOpen={showLoading}
          onDidDismiss={() => setShowLoading(false)}
          message={'Searching...'}
          duration={5000}
        />        
          {/* {searchLoading && <IonSpinner name="crescent"></IonSpinner>} */}
          {<div>{searchBar}</div>}
          {searchFocus && (<div className="ion-text-center"><Button
              title="closeKeyboard"
              alt="closeKeyboard"
              key={'closeKeyboard'}
              color="light"
              onClick={() => {}}>
                <IonIcon slot="start" icon={closeCircleOutline}></IonIcon>
                Close Keyboard
          </Button></div>)}
          {!isSearchDone && 
            <div className="ion-padding ion-text-center">Enter a search term, and click "Search". E.g. Kriya or Jesus</div>
          }
          {isSearchDone && 
            <IonContent
              scrollEvents={true}
              onIonScrollStart={() => { }}
              onIonScroll={() => { }}
              onIonScrollEnd={() => {  }}
            >
              <div key="searchResultsContent">
                {searchResultsContent.length === 0 ? 
                  <div className="ion-margin ion-padding ion-text-center">No Results Found</div> :
                  searchResultsContent.map((c) => {
                    return c;
                    })
                  }
                {/* <IonList>
                {searchResultsContent.map((c) => {
                    //                console.log(c);
                    return <IonItem>{c}</IonItem>
                  })
                }
                </IonList> */}
              </div>
            </IonContent>
          }
      </div>
    )
};

export default AyogiSearch;
