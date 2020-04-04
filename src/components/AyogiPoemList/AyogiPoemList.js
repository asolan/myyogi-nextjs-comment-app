import React from 'react';
//import Button from '../Button/Button';
//import { Redirect, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

import {
  IonList,
  IonItem,
//  IonLabel,
  IonContent,
//  IonButton,
  IonCard,
//  IonCardContent,
  IonCardTitle,
//  IonCardSubtitle,
  // IonIcon,
  // IonFab,
//  IonRouterLink
}  from '@ionic/react';
import './AyogiPoemList.css';
//import { paper } from 'ionicons/icons';
//import { book, build, colorFill, grid } from 'ionicons/icons';


import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

const AyogiPoemList = props => {

  return (
    <IonContent className="PoemList">
      <IonList>
        {props.chaptersList.map((c, i) => (
          <IonItem key={'cs' + i}>
            {/* <Button key={'cb'+i} onClick={()=>props.setCurrentChapter(c.chapterNumber-1)}> */}
            <IonCard 
              button="true"
              class="ion-text-center"
              // onClick={()=>props.setCurrentChapter(c.chapterNumber)}>
              // routerLink={'/detail/' + c.chapterNumber} 
              // routerDirection="forward"
              >
              <Link to={'/ayogi/' + c.chapterNumber}>
                {/* <ion-icon slot="end" name="paper">
                </ion-icon> */}
                {/* <IonCardSubtitle slot="start">
                {c.chapterNumber}
                </IonCardSubtitle> */}
                {/* <ion-fab right top>
                    <ion-icon name="paper"></ion-icon>
                </ion-fab>                 */}
                <IonCardTitle>
                  {c.chapterNumber}
                </IonCardTitle>
                <div className="chaptertitle" slot="middle">
                  {c.text}
                </div>
              </Link>
                            {/* <IonItem
              button="true"
              no-padding>
                <IonLabel
                 position="stacked">
                  {c.chapterNumber} {c.text}
                </IonLabel>
              </IonItem> */}
              {/* <IonButton
                  expand="full"
                  fill="outline"
                  // no-padding
                  // no-margin
                  key={'cb' + i} >
                  {c.chapterNumber} {c.text}
                </IonButton> */}
            </IonCard>
          </IonItem>
        ))
        }
      </IonList>
    </IonContent>

  )
};

export default AyogiPoemList;
