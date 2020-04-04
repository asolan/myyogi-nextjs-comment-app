import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import AyogiImageList from '../components/AyogiImageList/AyogiImageList.js';
//import ExploreContainer from '../components/ExploreContainer';
import './ImageListTab.css';
let ayimage = require('../ayimage.json');

const ImageListTab: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Image List</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Image List</IonTitle>
          </IonToolbar>
        </IonHeader>
        {/* {ayimage.map((a: any) => {
            return <li>{JSON.stringify(a, null, 2) }</li>
          }, <ul/>) } */}
        <AyogiImageList imageList={ayimage} />
      </IonContent>
    </IonPage>
  );
};

export default ImageListTab;

      //   {/* {ayimage.map((a: any) => {
      //     return <li>{JSON.stringify(a, null, 2) }</li>
      //   }, <ul/>) }*/
      // }
