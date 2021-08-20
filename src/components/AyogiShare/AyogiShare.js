import React, {useState, useEffect} from 'react';
//import { Link } from 'react-router-dom';
//import AyogiFooters from '../AyogiFooters/AyogiFooters';
import Button from '../Button/Button';
//import classes from './AyogiShare.css';
import {
    IonGrid,
    IonRow,
    IonCol,
    IonIcon,
    IonButton
} from "@ionic/react";
import { SocialSharing } from '@ionic-native/social-sharing';
//import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import './AyogiShare.css';
import { chatboxEllipsesOutline, mailOutline, logoFacebook, logoInstagram, logoTwitter, logoWhatsapp } from "ionicons/icons";
import { notChapterTitleHeader, buildSection } from "../../utility/parseUtility";
import { LINE_TYPE_ENUM } from "../../utility/dataTypes";
//import parseBookData from '../../utility/parseBookData';
//import {useTraceUpdate} from '../../utility/helpUtility';


const AyogiShare = (props) => {
  const [showLoading, setShowLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState([]);
  const [searchResultsContent, setSearchResultsContent] = useState([]);
  const [disableSearch, setDisableSearch] = useState(true);
  const [isSearchDone, setIsSearchDone] = useState(false);

  const quoteOnly = false;
  const minSearchLength = 3;
  const ayPrefix = "Paramhansa Yogananda writes, '";
  const ayPostfix = "' in Autobiography of a Yogi";

  const shareType = {
    FACEBOOK: 'FACEBOOK', 
    TWITTER: 'TWITTER', 
    WHATSAPP: 'WHATSAPP', 
    INSTAGRAM: 'INSTAGRAM', 
    SMS: 'SMS',
    EMAIL: 'EMAIL'
  };

    useEffect(() => {
//        buildSearchText('');
    }, []);

    const shareItem = (thisShareType) => {
      const url = "SocialUrl";
      // console.log('shareItem', thisShareType);
      // console.log('message', props.message);
      // console.log('title', props.title);
      const fullQuote = ayPrefix + props.message + ayPostfix + ' ' + props.title;
//      console.log('shareItem', thisShareType, fullQuote);

      switch(thisShareType){
        case shareType.FACEBOOK:
          SocialSharing.shareViaFacebookWithPasteMessageHint('', '', '', fullQuote).then(() => {
          })
          break;
        case shareType.TWITTER:
          SocialSharing.shareViaTwitter(fullQuote, null, null).then(() => {
        })
        break;
        case shareType.WHATSAPP:
          SocialSharing.shareViaWhatsApp(fullQuote, null, null).then(() => {
          })
          break;
        case shareType.INSTAGRAM:
//          SocialSharing.shareViaInstagram(message, image).then(() => {
          SocialSharing.shareViaInstagram(fullQuote, '').then(() => {
          })
          break;
        case shareType.SMS:
//          SocialSharing.shareViaSMS(message, phoneNumber).then(() => {
          SocialSharing.shareViaSMS(fullQuote, null).then(() => {
          })
          break;
        case shareType.EMAIL:
          SocialSharing.shareViaEmail(fullQuote, props.message.substring(0,50), null, null, null, null).then(() => {
          })
      }
    };

    const socialList = (
      <IonGrid>
        <IonRow class="ion-align-items-center">
          <IonCol class="ion-align-self-center">
            <IonButton color="light" onClick={() => {shareItem(shareType.SMS);}}>
              <IonIcon icon={chatboxEllipsesOutline}></IonIcon>
            </IonButton>
          </IonCol>
          <IonCol class="ion-align-self-center">
            <IonButton color="light" onClick={() => {shareItem(shareType.EMAIL);}}>
              <IonIcon icon={mailOutline}></IonIcon>
            </IonButton>
          </IonCol>
          <IonCol class="ion-align-self-center">
            <IonButton color="light" onClick={() => {
              shareItem(shareType.FACEBOOK);}}>
              <IonIcon icon={logoFacebook}></IonIcon>
            </IonButton>
          </IonCol>
          {/* </IonRow>
          <IonRow class="ion-align-items-center"> */}
          <IonCol class="ion-align-self-center">
            <IonButton color="light" onClick={() => {shareItem(shareType.WHATSAPP);}}>
              <IonIcon icon={logoWhatsapp}></IonIcon>
            </IonButton>
          </IonCol>
          <IonCol class="ion-align-self-center">
            <IonButton color="light" onClick={() => {shareItem(shareType.TWITTER);}}>
              <IonIcon icon={logoTwitter}></IonIcon>
            </IonButton>
          </IonCol>
          <IonCol class="ion-align-self-center">
            <IonButton color="light" onClick={() => {shareItem(shareType.INSTAGRAM);}}>
              <IonIcon icon={logoInstagram}></IonIcon>
            </IonButton>
          </IonCol>
        </IonRow>
  </IonGrid>);        

    return (
      <div className="AyogiShare">
        {socialList}
      </div>
    )
};

export default AyogiShare;
