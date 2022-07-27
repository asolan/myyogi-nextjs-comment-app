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
  IonCardContent,
  IonCardTitle,
  //  IonCardSubtitle,
  // IonIcon,
  // IonFab,
  //  IonRouterLink
} from '@ionic/react';
import './AyogiChapterList.css';
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

const AyogiChapterList = props => {

  const imageCard = (<IonItem>
    <IonCard
    button="true"
    class="ion-text-center"
    onClick={(e) => { e.preventDefault(); props.history.push(`/imagelist`);}}
    >
    <IonCardContent className="chaptertitle" slot="end">
    </IonCardContent>
    <IonCardTitle>
      <div className="chapterheader">
      </div>
      <div className="chaptertitle">
        Illustrations
      </div>
    </IonCardTitle>
  </IonCard>
</IonItem>
);
console.log()
  return (
    <IonContent className="ChapterList">
      {imageCard}
      <IonList>
        {props.chaptersList.map((c, i) => {
          const headerHeader = c.chapterNumber > 0 ? (<span>Chapter: <span>{c.chapterNumber}</span></span>): null;
          return (<IonItem key={'cs' + i}>
            {/* <Button key={'cb'+i} onClick={()=>props.setCurrentChapter(c.chapterNumber-1)}> */}
            <IonCard
              button="true"
              class="ion-text-center"
              onClick={(e) => {
                e.preventDefault();
                props.goToChapter(c.chapterNumber);
              }
              }
            >
              {/* <ion-icon slot="end" name="paper">
                </ion-icon> */}
              {/* <IonCardSubtitle slot="start">
                {c.chapterNumber}
                </IonCardSubtitle> */}
              {/* <ion-fab right top>
                    <ion-icon name="paper"></ion-icon>
                </ion-fab>                 */}
              <IonCardContent className="chaptertitle" slot="end">
              </IonCardContent>
              <IonCardTitle>
                <div className="chapterheader">
                  {headerHeader}
                </div>
                <div className="chaptertitle">
                  {c.text}
                </div>
              </IonCardTitle>
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
        )}
        )
        }
      </IonList>
    </IonContent>

  )
};

export default AyogiChapterList;
