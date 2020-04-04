import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './PoemTab.css';

const PoemTab: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Poem</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Poem</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Poem page" />
      </IonContent>
    </IonPage>
  );
};

export default PoemTab;
