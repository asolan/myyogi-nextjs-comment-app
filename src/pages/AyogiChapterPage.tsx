import React, { useState, useEffect } from 'react';
import Loading from '../components/AyogiIon/Loading/Loading';
import {
  // IonCard,
  // IonCardContent,
  // IonCardHeader,
  // IonCardSubtitle,
  // IonCardTitle,
  // IonIcon,
  // IonItem,
  // IonLabel,
  // IonList,
  // IonListHeader,
  // IonButtons,
  // IonButton,
  // IonIcon,
  // IonHeader,
  // IonTitle,
  // IonToolbar
  IonContent,
  IonPage,
} from '@ionic/react';

//import { book, build, colorFill, grid } from 'ionicons/icons';
import AyogiHeader from '../components/AyogiIon/AyogiHeader/AyogiHeader';
import AyogiChapterList from '../components/AyogiIon/AyogiChapterList/AyogiChapterList';
//import { fetchAYChapterList } from '../utility/fetchData';
//import { LINE_TYPE_ENUM } from '../utility/dataTypes';
import './AyogiPage.css';
let aychaptlist = require('../aychaptlist.json');


const AyogiChapterPage = (props: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [chaptersList, setChaptersList] = useState<any>([]);

  // useEffect(() => {
  //   console.log(`AyogiChapterPage-chapter changed - ${props.type}`)
  //   setToContentType(props.type);
  // }, [props.chapter]);

  // Page load
  useEffect(() => {
//    fetchAYChapterList().then(d => setChaptersList(d));
    setChaptersList(aychaptlist);
    setIsLoading(false);

  }, []);

  // const setCurrentChapter = (chapterNumber: number) => {
  //   console.log(chapterNumber);
  // };

  let content = <Loading loading={isLoading} />;

  if (!isLoading && (chaptersList && chaptersList.length > 0)) {
//    typeItems={contentTypeText[contentType]}

// setCurrentChapter={setCurrentChapter}
    content = (
      <AyogiChapterList 
        chaptersList={chaptersList}
         />
      );
  }

  if (!isLoading && chaptersList.length === 0) {
    content = (<p>Found no content. Try again later.</p>);
  }

//  return (<main>{buttons}{content}</main>);  
  return (
    <IonPage>
      <AyogiHeader
        headerType="chapterlist"
        headerNumber={0}
        headerTitle="">
      </AyogiHeader>
      <IonContent>
        {content}
      </IonContent>
    </IonPage>

  );
};

export default AyogiChapterPage;
