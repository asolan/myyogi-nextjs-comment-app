import React from 'react';
import {   IonGrid,
  IonRow,
  IonCol,
IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import AyogiImage from '../components/AyogiImage/AyogiImage';
import AyogiHeader from '../components/AyogiHeader/AyogiHeader';
import './ImageListTab.css';
let ayimage = require('../ayimage.json');

const ImageListTab: React.FC = () => {
  return (
    <IonPage>
      <AyogiHeader
        headerType="image"
        headerNumber={0}
        headerTitle="">
      </AyogiHeader>
      <IonContent>
        {/* <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Illustrations</IonTitle>
          </IonToolbar>
        </IonHeader> */}
        <AyogiImage 
            items={ayimage}
            key={'AyogiImageList'} >
        </AyogiImage>);
      </IonContent>
    </IonPage>
  );
};

export default ImageListTab;

      //   {/* {ayimage.map((a: any) => {
      //     return <li>{JSON.stringify(a, null, 2) }</li>
      //   }, <ul/>) }*/
      // }
