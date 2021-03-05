import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './PoemListTab.css';
let aypoem = require('../aypoem.json');

const PoemListTab: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Poem List</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Poem List</IonTitle>
          </IonToolbar>
        </IonHeader>
        {JSON.stringify(aypoem, null, 2) }
      </IonContent>
    </IonPage>
  );
};

export default PoemListTab;
