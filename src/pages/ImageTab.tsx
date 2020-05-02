import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './ImageTab.css';

const ImageTab: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Image title</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Image</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Image page" />
      </IonContent>
    </IonPage>
  );
};

export default ImageTab;
