import React, { useState, useEffect } from 'react';
import Loading from '../components/Loading/Loading';
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

import AyogiHeader from '../components/AyogiHeader/AyogiHeader';
import AyogiType from '../components/AyogiType/AyogiType';
//import { fetchAYDataOfType } from '../utility/fetchData';
//import { fetchAYDataOfType } from '../utility/fetchDataJson';
import { LINE_TYPE_ENUM } from '../utility/dataTypes';
import './AyogiPage.css';
let aypoem = require('../aypoem.json');
let ayimage = require('../ayimage.json');

const AyogiTypePage = (props: any) => {
  const isLoading = false;
//  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [contentType, setContentType] = useState<string>(LINE_TYPE_ENUM.UNUSED);
  const [contentTypeText, setContentTypeText] = useState<any>([]);

  // Change contentType
  useEffect(() => {
    console.log(`AyogiTypePage-content type changed - ${props.type}`)
    console.log(aypoem);
    console.log(ayimage);

    setToContentType(props.type);
  }, [props.type]);

  //AMSTODO:Needed?
  // Page load
  // useEffect(() => {
  //   console.log(`AyogiTypePage-content type set - ${props.type}`)
  //   setToContentType(props.type);
  //   //
  //   setIsLoading(false);

  // }, []);

  const setToContentType = (type: string) =>  {
    setContentType(type);
    if(type === 'POEM'){
      setContentTypeText(aypoem);
    }

    if(type === 'IMAGE'){
      setContentTypeText(ayimage);
    }
console.log(`pre-typeloaded-${type}`);
//    setContentTypeText(fetchAYDataOfType(type));
    // fetchAYDataOfType(type).then((ct: [any]) => {
    //   console.log(`typeloaded-${type}`);
    //   console.log(ct);
    //   setContentTypeText(ct);
    // });
  }

  let content = <Loading loading={isLoading} />;

  if (!isLoading && (contentType && contentType.length > 0)) {
//    typeItems={contentTypeText[contentType]}

    content = (
      <AyogiType 
        typeItems={contentTypeText}
        type={contentType} />
      );
  }

  if (!isLoading && contentTypeText.length === 0) {
    content = (<p>Found no content. Try again later.</p>);
  }

  return (
    <IonPage>
      <AyogiHeader
        headerType={props.type.toLowerCase()}
        headerNumber={0}
        headerTitle="">
      </AyogiHeader>
      <IonContent>
        {content}
      </IonContent>
    </IonPage>

  );
};

export default AyogiTypePage;
