import React, { useState } from 'react';
//import Button from '../Button/Button';
//import { Redirect, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

import {
  IonList,
  IonItem,
  IonImg,
  IonInfiniteScroll,
  IonGrid,
  IonRow,
  IonCol,
  IonLabel,
  IonContent,
  //  IonButton,
  IonCard,
  //  IonCardContent,
  IonCardTitle,
  IonCardSubtitle,
  // IonIcon,
  IonModal,
  IonButton,
  IonFab,
  IonFabButton,
  IonIcon

} from '@ionic/react';
import { chevronDownOutline, chevronUpOutline, add, camera, settings, share, person, arrowForwardCircle, arrowBackCircle, arrowUpCircle, logoVimeo, logoFacebook, logoInstagram, logoTwitter } from 'ionicons/icons';

import './AyogiImageList.css';
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

const AyogiImageList = props => {

  const imageContent = [];
  const [showModal, setShowModal] = useState(false);
  const [popImage, setPopImage] = useState({});
  props.imageList.map((c, i) => {

    //    console.log(i, c);

    const thisImage =
      (<IonCol class="ion-justify-content-end" size-lg="3" size-md="3" size-xs="6" key={'cs' + i}>
        <IonCard class="ion-text-center">
        {/* <IonFab vertical="bottom" horizontal="center">
            <IonFabButton color="primary">Primary</IonFabButton>
        </IonFab> */}
          <IonFab vertical="bottom" horizontal="center">
            <IonFabButton color="primary" onClick={() => showImage(i)}>
              <IonIcon icon={chevronDownOutline}></IonIcon>
            </IonFabButton>
          </IonFab>
          <IonImg
            alt={c.text}
            height={200}
            src={c.src}
            border={c.border}
            id={c.id}
            name={c.name}
            key={c.id}
          ></IonImg>
          <IonCardTitle>
            {c.text[0]}
          </IonCardTitle>

        </IonCard>
      </IonCol>);

    imageContent.push(thisImage);
    return null;
  });

  const showImage = (imageNum) => {
    let d = props.imageList[imageNum];
    //    console.log(`showimage-${d.src}`);
    console.log(d.text);
    console.log(d.class);
    //    console.log(d.text);
    setPopImage(
      <IonCard button="true" class="ion-text-center">
        <IonImg
          alt={d.text}
          height={d.height}
          width={d.width}
          src={d.src}
          border={d.border}
          id={d.id}
          name={d.name}
          key={d.id}
        />
        {/* <IonCardTitle>
        {d.text[0]}
      </IonCardTitle> */}
        <IonCardSubtitle>
          {
            d.text.slice(1).map((t, i) => {
              return <div className={d.class[i + 1]}>
                {t}
              </div>
            })
          }
        </IonCardSubtitle>
      </IonCard>);
    setShowModal(true);
  }

  return (
    <IonContent className="ImageList">
    <IonFabButton color="secondary">Secondary</IonFabButton>
    <IonFabButton color="danger">Danger</IonFabButton>
    <IonFabButton color="light">Light</IonFabButton>
    <IonFabButton color="dark">Dark</IonFabButton>      
      <IonModal isOpen={showModal}>
        <IonInfiniteScroll>
          {popImage}
          <IonFab vertical="bottom" horizontal="start" slot="fixed">
            <IonFabButton onClick={() => setShowModal(false)} fill="outline">
              Close
              <IonIcon icon={add} />
            </IonFabButton>
          </IonFab>
        </IonInfiniteScroll>
      </IonModal>
      <IonGrid>
        <IonRow class="justify-content-center align-items-center" >
          {imageContent.map((i, c) => {
            return i;
          })
          }
        </IonRow>
      </IonGrid>
    </IonContent>

  )
};

export default AyogiImageList;
