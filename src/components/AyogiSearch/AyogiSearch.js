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
    IonButton,
    IonInput,
    IonList,
    IonSpinner,
    IonContent
} from "@ionic/react";
import './AyogiSearch.css';
import { notChapterTitleHeader, buildSection } from "../../utility/parseUtility";
import { LINE_TYPE_ENUM } from "../../utility/dataTypes";
//import parseBookData from '../../utility/parseBookData';
//import {useTraceUpdate} from '../../utility/helpUtility';


const AyogiSearch = (props) => {

    const [searchTerm, setSearchTerm] = useState([]);
    const [searchResultsContent, setSearchResultsContent] = useState([]);
    const [disableSearch, setDisableSearch] = useState(true);
    const [searchLoading, setSearchLoading] = useState(false);

    const quoteOnly = false;

    useEffect(() => {
//        buildSearchText('');
    }, []);

      // useEffect(() => {
    //     buildSearchText(searchTerm);
    // }, [searchTerm]);

    const doSearch = (c) => {
      //Search in footnotes too?
//      console.log(c, this, searchTerm);
      let found = false;

      if(c && c !== undefined){
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
      return found;
    };

    const doSearch2 = (a, c) => {
      //Search in footnotes too?
//      console.log(a, c);
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
      if(found){
        a.push({chapterNumber: c.chapterNumber, paragraphNumber: c.paragraphNumber});
      }
      return a;
    };
      
    const buildSearchText = (newSearchTerm) => {
      let contentId = 0;
      let nextContentList = [];
      setDisableSearch(true);
      setSearchLoading(true);

      if (!props.aydata) {
        console.log("buildchaptext-notext");
        return;
      }
      let matchedPar = props.aydata.reduce(doSearch2, [])
      console.log('matchedPar', matchedPar);
      let nextText = props.aydata.reduce((a,c) => {
        if(matchedPar.some(m => m.chapterNumber === c.chapterNumber && 
          m.paragraphNumber === c.paragraphNumber)){
            a.push(c);
        }
        return a;
        }, []);
//        .filter(doSearch,newSearchTerm);
//TODO Remove image in illustrations?
//        .filter(notChapterTitleHeader);
  
      // Build array with positions of each type of content
      if(nextText.length > 0){
        let nextContent = nextText.reduce(
          (acc, curr, pos, src) => {
            if (pos > 1 && curr.type !== src[pos - 1].type) {
              acc.push({ pos: pos, type: curr.type });
          }
            return acc;
          },
          [{ pos: 0, type: LINE_TYPE_ENUM.WISDOM }]
        );
    
        const last = nextText.length;
        nextContent.push({ pos: last, type: LINE_TYPE_ENUM.UNUSED });
        console.log(nextContent);
    
        nextContent &&
          nextContent.slice(1).forEach((c, i) => {
            let newItems = nextText.slice(nextContent[i].pos, c.pos);
    //        console.log(newItems);
            nextContentList.push(buildSection(newItems, ++contentId, props, quoteOnly, newSearchTerm, true));
          });
        }
  
      setSearchResultsContent(nextContentList);
      setSearchLoading(false);
    };

    const searchBar = (
      <IonItem>
        <IonSearchbar
            value={searchTerm} 
            onIonChange={e => {
              setSearchTerm(e.detail.value.toLowerCase());
              setDisableSearch(e.detail.value.length < 4);
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
              if(searchTerm.length > 3){
              buildSearchText(searchTerm);
              }
  //                    props.history.push(`/ayogi/${chNum}/1`);
            }}>Search
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
          <div>{searchBar}</div>
          {searchLoading && <IonSpinner name="crescent"></IonSpinner>}
          {!searchLoading && 
            <IonContent
              scrollEvents={true}
              onIonScrollStart={() => { }}
              onIonScroll={() => { }}
              onIonScrollEnd={() => {  }}
            >
              <div>
                {searchResultsContent.map((c) => {
                    //                console.log(c);
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
