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
import { share, closeOutline, chatboxEllipsesOutline, mailOutline, logoFacebook, logoInstagram, logoTwitter, logoWhatsapp } from "ionicons/icons";
import { notChapterTitleHeader, buildSection } from "../../utility/parseUtility";
import { LINE_TYPE_ENUM } from "../../utility/dataTypes";
//import parseBookData from '../../utility/parseBookData';
//import {useTraceUpdate} from '../../utility/helpUtility';


const AyogiShare = (props) => {
  const ayPrefix = "Paramhansa Yogananda writes, '";
  const ayPostfix = "' in Autobiography of a Yogi";

  const shareType = {
    SHARE: 'SHARE',
    FACEBOOK: 'FACEBOOK', 
    TWITTER: 'TWITTER', 
    WHATSAPP: 'WHATSAPP', 
    INSTAGRAM: 'INSTAGRAM', 
    SMS: 'SMS',
    EMAIL: 'EMAIL'
  };

    useEffect(() => {
//      console.log(props.message);
//        buildSearchText('');
    }, []);

    const shareItem = (thisShareType) => {
      const url = "SocialUrl";
      // console.log('shareItem', thisShareType);
      // console.log('message', props.message);
      // console.log('title', props.title);
      const fullQuote = ayPrefix + props.message + ayPostfix + ' ' + props.title;
      const shareHeader = props.message.substring(0,50);
//      console.log('shareItem', thisShareType, fullQuote);

      switch(thisShareType){
        case shareType.SHARE:
          var shareOptions = {
            message: fullQuote,
            subject: shareHeader, // fi. for email
//            files: ['', ''], // an array of filenames either locally or remotely
//            url: 'https://www.website.com/foo/#bar?a=b',
//            chooserTitle: 'Pick an app', // Android only, you can override the default share sheet title
//            appPackageName: 'com.apple.social.facebook', // Android only, you can provide id of the App you want to share with
//            iPadCoordinates: '0,0,0,0' //IOS only iPadCoordinates for where the popover should be point.  Format with x,y,width,height
          };          
          SocialSharing.shareWithOptions(shareOptions).then(() => {
          })
          break;
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
        <IonRow class="ion-margin">
          <IonCol class="">
            <IonButton color="light" onClick={() => {shareItem(shareType.SHARE);}}>
              <IonIcon icon={share}></IonIcon>
            </IonButton>
          </IonCol>
          <IonCol class="">
            <IonButton color="light" onClick={() => {shareItem(shareType.SMS);}}>
              <IonIcon icon={chatboxEllipsesOutline}></IonIcon>
            </IonButton>
          </IonCol>
          <IonCol class="">
            <IonButton color="light" onClick={() => {shareItem(shareType.EMAIL);}}>
              <IonIcon icon={mailOutline}></IonIcon>
            </IonButton>
          </IonCol>
          <IonCol class="">
            <IonButton color="light" onClick={() => {
              shareItem(shareType.FACEBOOK);}}>
              <IonIcon icon={logoFacebook}></IonIcon>
            </IonButton>
          </IonCol>
          {/* </IonRow>
          <IonRow class="ion-align-items-center"> */}
          <IonCol class="">
            <IonButton color="light" onClick={() => {shareItem(shareType.WHATSAPP);}}>
              <IonIcon icon={logoWhatsapp}></IonIcon>
            </IonButton>
          </IonCol>
          <IonCol class="">
            <IonButton color="light" onClick={() => {shareItem(shareType.TWITTER);}}>
              <IonIcon icon={logoTwitter}></IonIcon>
            </IonButton>
          </IonCol>
          {/* <IonCol class="">
            <IonButton color="light" onClick={() => {shareItem(shareType.INSTAGRAM);}}>
              <IonIcon icon={logoInstagram}></IonIcon>
            </IonButton>
          </IonCol> */}
          <IonCol class="">
            <IonButton color="light" onClick={() => {props.closeShare();}}>
              <IonIcon icon={closeOutline}></IonIcon>
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
