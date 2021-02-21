//AMSTODO:DELETE
import React, { useState } from "react";
//import Button from '../Button/Button';
//import { Redirect, Route } from 'react-router-dom';
import { Link } from "react-router-dom";
import AyogiImage from "../AyogiIon/AyogiImage/AyogiImage";
import {
  IonList,
  IonItem,
  IonImg,
  IonInfiniteScroll,
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
  IonIcon,
} from "@ionic/react";
import {
  chevronDownOutline,
  chevronUpOutline,
  bookOutline,
  add,
  camera,
  settings,
  share,
  person,
  arrowForwardCircle,
  arrowBackCircle,
  arrowUpCircle,
  logoVimeo,
  logoFacebook,
  logoInstagram,
  logoTwitter,
} from "ionicons/icons";
import "../../theme/AyogiImage.css";
import "./AyogiImageListSimple.css";
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

const AyogiImageList = (props) => {
  console.log("AyogiImageList");
  console.log(props);
  const imageContent = [];
  const [showModal, setShowModal] = useState(false);
  const [popImage, setPopImage] = useState({});
  props.imageList.map((d, i) => {
    //    console.log(i, c);

    const thisImage = (
      <IonItem className="ion-text-center" key={"cs" + i}>
        <Link to={"/ayogi/" + d.chapterNumber + '/' + d.lineNumber} >
          <IonCard className="ion-text-center">
            <IonImg
              alt={d.text}
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
            <IonCardTitle>
              {d.text.slice(1).map((t, i) => {
                return <div className={d.class[i + 1]}>{t}</div>;
              })}
            </IonCardTitle>
          </IonCard>
        </Link>
      </IonItem>
    );

    imageContent.push(thisImage);
    return null;
  });

  const goToContent = (chapterNumber) => {
    console.log("gotocontent");
    //    history.push(`/ayogi/${chapterNumber}`);
  };

  return (
    <IonContent className="ImageListSimple">
      <IonList className="ion-text-center" >
        {imageContent.map((i, c) => {
          return i;
        })}
      </IonList>
    </IonContent>
  );
};

export default AyogiImageList;
