import React from 'react';
import {   IonGrid,
  IonRow,
  IonCol,
IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
//import AyogiImageList from '../components/AyogiImageList/AyogiImageList.js';
//import AyogiImageListSimple from '../components/AyogiImageListSimple/AyogiImageListSimple.js';
//import AyogiImage from '../components/AyogiIon/AyogiImageOld/AyogiImage';
import AyogiImage from '../components/AyogiIon/AyogiImage/AyogiImage';
//import AyogiImageList from '../components/AyogiImageList/AyogiImageList.js';
import './ImageListTab.css';
let ayimage = require('../ayimage.json');

const ImageListTab: React.FC = () => {
  return (
    <IonPage>
      <IonHeader no-border>
        <IonToolbar>
          <IonTitle  size="small">
          <IonGrid>
            <IonRow className="yogananda-row">
              <IonCol className="otherheader">Illustrations</IonCol>
            </IonRow>
          </IonGrid>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Illustrations</IonTitle>
          </IonToolbar>
        </IonHeader>
        {/* {ayimage.map((a: any) => {
            return <li>{JSON.stringify(a, null, 2) }</li>
          }, <ul/>) } */}
        {/* <AyogiImageList imageList={ayimage} /> */}
        <AyogiImage 
            items={ayimage}
            key={'AyogiImageList'} >
        </AyogiImage>);

        {/* <AyogiImageListSimple imageList={ayimage} /> */}
      </IonContent>
    </IonPage>
  );
};

export default ImageListTab;

      //   {/* {ayimage.map((a: any) => {
      //     return <li>{JSON.stringify(a, null, 2) }</li>
      //   }, <ul/>) }*/
      // }
